const { InstanceBase, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades.js')
const UpdateActions = require('./actions.js')
const UpdateFeedbacks = require('./feedbacks.js')
const UpdateVariableDefinitions = require('./variables.js')
const UpdatePresetsDefinitions = require('./presets')
const config = require('./config.js')
const choices = require('./choices.js')
const tcp = require('./tcp.js')
const processCmd = require('./processcmd.js')
const { EndSession, respParam, unknown } = require('./consts.js')

class TASCAM_DA_6400 extends InstanceBase {
	constructor(internal) {
		super(internal)
		Object.assign(this, { ...config, ...tcp, ...processCmd, ...choices })
		this.cmdQueue = []
	}
	async init(config) {
		this.updateStatus('Starting')
		this.config = config
		this.initVariables()
		this.startTimeOut()
		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions
		this.updateVariableValues()
		this.updatePresetsDefinitions()
		this.initTCP()
	}
	// When module gets deleted
	async destroy() {
		this.log('debug', `destroy. ID: ${this.id}`)
		this.stopKeepAlive()
		this.stopCmdQueue()
		this.stopTimeOut()
		if (this.socket) {
			this.sendCommand(EndSession)
			this.socket.destroy()
		}
		this.updateStatus(InstanceStatus.Disconnected)
	}

	updateVariableValues() {
		let varList = []
		varList['trackNo'] = unknown
		varList['trackTime'] = unknown
		varList['trackTimeHours'] = unknown
		varList['trackTimeMinutes'] = unknown
		varList['trackTimeSeconds'] = unknown
		varList['trackTimeFrames'] = unknown
		varList['error'] = unknown
		varList['caution'] = unknown
		this.setVariableValues(varList)
	}

	initVariables() {
		this.recorder = {
			mechaStatus: unknown,
			clock: {
				year: unknown,
				month: unknown,
				day: unknown,
				hour: unknown,
				minute: unknown,
				second: unknown,
			},
			repeatMode: unknown,
			remoteLocal: unknown,
			keyboardType: unknown,
			playMode: unknown,
			error: unknown,
			caution: unknown,
			psuError: false,
			track: {
				number: unknown,
				time: unknown,
				currentTrackTimeSense: respParam.currentTrackTimeSelect.elapsedTime,
			},
			chaseMode: unknown,
			tcGeneratorMode: unknown,
			tcFrameType: unknown,
			tcOutputMode: unknown,
			clockMaster: unknown,
			wordThru: unknown,
			bitLength: unknown,
			pauseMode: unknown,
			audioOverMarker: unknown,
			timeIntervalMarker: unknown,
			syncUnlockMarker: unknown,
			recFs: unknown,
			fileName: unknown,
			meterPeakTime: unknown,
			digitalReferenceLevel: unknown,
		}
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}

	updatePresetsDefinitions() {
		UpdatePresetsDefinitions(this)
	}
}

runEntrypoint(TASCAM_DA_6400, UpgradeScripts)
