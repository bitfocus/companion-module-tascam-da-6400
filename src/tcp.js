const { InstanceStatus, TCPHelper } = require('@companion-module/base')
const { msgDelay, EOM, keepAliveInterval } = require('./consts.js')

module.exports = {
	async addCmdtoQueue(cmd) {
		if (cmd !== undefined && cmd.length > 5) {
			await this.cmdQueue.push(cmd)
			return true
		}
		this.log('warn', `Invalid command: ${cmd}`)
		return false
	},

	async processCmdQueue() {
		if (this.cmdQueue.length > 0 && this.clearToTx) {
			//dont send command if still waiting for response from last command
			this.sendCommand(await this.cmdQueue.splice(0, 1))
			this.cmdTimer = setTimeout(() => {
				this.processCmdQueue()
			}, msgDelay)
			return true
		}
		// run at double speed while the queue is empty for better responsiveness
		this.cmdTimer = setTimeout(() => {
			this.processCmdQueue()
		}, msgDelay / 2)
		return false
	},

	async sendCommand(cmd) {
		if (cmd !== undefined) {
			if (this.socket !== undefined && this.socket.isConnected) {
				this.log('debug', `Sending Command: ${cmd}`)
				this.clearToTx = false
				this.socket.send(cmd + EOM)
				return true
			} else {
				this.log('warn', `Socket not connected, tried to send: ${cmd}`)
			}
		} else {
			this.log('warn', 'Command undefined')
		}
		return false
	},

	//queries made on initial connection.
	async queryOnConnect() {
		this.addCmdtoQueue(this.config.password)
		return true
	},

	keepAlive() {
		//request alive notifications
		//this.addCmdtoQueue()
		this.keepAliveTimer = setTimeout(() => {
			this.keepAlive()
		}, keepAliveInterval)
	},

	initTCP() {
		this.receiveBuffer = ''
		if (this.socket !== undefined) {
			this.socket.destroy()
			delete this.socket
		}
		if (this.config.host) {
			this.log('debug', 'Creating New Socket')

			this.updateStatus('Connecting to Secondary')
			this.socket = new TCPHelper(this.config.host, this.config.port)

			this.socket.on('status_change', (status, message) => {
				this.updateStatus(status, message)
			})
			this.socket.on('error', (err) => {
				this.log('error', `Network error: ${err.message}`)
				this.clearToTx = true
				clearTimeout(this.keepAliveTimer)
				if (this.config.redundant) {
					this.useSecondary = !this.useSecondary
					this.initTCP()
				}
			})
			this.socket.on('connect', () => {
				if (this.useSecondary) {
					this.log('info', `Connected on Secondary ${this.config.hostSec}`)
				} else {
					this.log('info', `Connected on Primary ${this.config.hostPri}`)
				}
				this.clearToTx = true
				this.queryOnConnect()
				this.keepAliveTimer = setTimeout(() => {
					this.keepAlive()
				}, keepAliveInterval)
			})
			this.socket.on('data', (chunk) => {
				this.clearToTx = true
				let i = 0,
					line = '',
					offset = 0
				this.receiveBuffer += chunk
				while ((i = this.receiveBuffer.indexOf(EOM, offset)) !== -1) {
					line = this.receiveBuffer.substr(offset, i - offset)
					offset = i + 1
					this.processCmd(line.toString())
				}
			})
		} else {
			this.updateStatus(InstanceStatus.BadConfig)
		}
	},
}
