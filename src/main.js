const { InstanceBase, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades.js')
const UpdateActions = require('./actions.js')
const UpdateFeedbacks = require('./feedbacks.js')
const UpdateVariableDefinitions = require('./variables.js')
const config = require('./config.js')
const choices = require('./choices.js')
const util = require('./util.js')
const tcp = require('./tcp.js')
const processCmd = require('./processcmd.js')
const { EndSession, msgDelay } = require('./consts.js')

class TASCAM_DA_6400 extends InstanceBase {
	constructor(internal) {
		super(internal)
		Object.assign(this, { ...config, ...util, ...tcp, ...processCmd, ...choices })
		this.keepAliveTimer = {}
		this.cmdTimer = {}
		this.cmdQueue = []
		this.clearToTx = true
	}
	async init(config) {
		this.updateStatus('Starting')
		this.config = config
		this.useSecondary = false
		this.cmdTimer = setTimeout(() => {
			this.processCmdQueue()
		}, msgDelay)
		this.initTCP()
		this.initVariables()
		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions
		this.updateVariableValues()
	}
	// When module gets deleted
	async destroy() {
		this.log('debug', `destroy. ID: ${this.id}`)
		clearTimeout(this.keepAliveTimer)
		clearTimeout(this.cmdTimer)
		this.keepAliveTimer = null
		this.cmdTimer = null
		if (this.socket) {
			await this.sendCommand(EndSession)
			this.socket.destroy()
		} else {
			this.updateStatus(InstanceStatus.Disconnected)
		}
	}

	updateVariableValues() {
		let varList = []
		this.setVariableValues(varList)
	}

	initVariables() {}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}
}

runEntrypoint(TASCAM_DA_6400, UpgradeScripts)
