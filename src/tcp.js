const { InstanceStatus, TCPHelper } = require('@companion-module/base')
const { msgDelay, cmd, SOM, EOM, EndSession, keepAliveInterval, cmdOnLogin } = require('./consts.js')

module.exports = {
	addCmdtoQueue(msg) {
		if (msg !== undefined && msg.length > 0) {
			this.cmdQueue.push(msg)
			return true
		}
		this.log('warn', `Invalid command: ${msg}`)
		return false
	},

	processCmdQueue() {
		if (this.cmdQueue.length > 0 && this.recorder.loggedIn) {
			this.sendCommand(this.cmdQueue.splice(0, 1))
		}
		this.cmdTimer = setTimeout(() => {
			this.processCmdQueue()
		}, msgDelay)
	},

	sendCommand(msg) {
		if (msg !== undefined) {
			if (this.socket !== undefined && this.socket.isConnected) {
				//this.log('debug', `Sending Command: ${msg}`)
				this.socket.send(msg + EOM)
				return true
			} else {
				this.log('warn', `Socket not connected, tried to send: ${msg}`)
			}
		} else {
			this.log('warn', 'Command undefined')
		}
		return false
	},

	//queries made on initial connection.
	async queryOnConnect() {
		this.sendCommand('  ')
		if (this.config.password == '') {
			this.updateStatus('ok', '')
			this.recorder.loggedIn = true
			for (let i = 0; i < cmdOnLogin.length; i++) {
				this.addCmdtoQueue(SOM + cmdOnLogin[i])
			}
			this.startKeepAlive()
		}
	},

	keepAlive() {
		//track timer requests
		this.addCmdtoQueue(SOM + cmd.currentTrackTimeSense + this.recorder.track.currentTrackTimeSense)
		this.keepAliveTimer = setTimeout(() => {
			this.keepAlive()
		}, keepAliveInterval)
	},

	startKeepAlive() {
		this.keepAliveTimer = setTimeout(() => {
			this.keepAlive()
		}, keepAliveInterval)
	},

	initTCP() {
		this.receiveBuffer = ''
		if (this.socket !== undefined) {
			this.sendCommand(EndSession)
			this.socket.destroy()
			delete this.socket
		}
		if (this.config.host) {
			this.log('debug', 'Creating New Socket')

			this.updateStatus(`Connecting to DA-6400: ${this.config.host}:${this.config.port}`)
			this.socket = new TCPHelper(this.config.host, this.config.port)

			this.socket.on('status_change', (status, message) => {
				this.updateStatus(status, message)
			})
			this.socket.on('error', (err) => {
				this.log('error', `Network error: ${err.message}`)
				this.recorder.loggedIn = false
				clearTimeout(this.keepAliveTimer)
			})
			this.socket.on('connect', () => {
				this.log('info', `Connected to ${this.config.host}:${this.config.port}`)
				this.recorder.loggedIn = false
				this.queryOnConnect()
			})
			this.socket.on('data', (chunk) => {
				let i = 0,
					line = '',
					offset = 0
				this.receiveBuffer += chunk
				while ((i = this.receiveBuffer.indexOf(EOM, offset)) !== -1) {
					line = this.receiveBuffer.substr(offset, i - offset)
					offset = i + 2
					this.processCmd(line.toString())
				}
				this.receiveBuffer = this.receiveBuffer.substr(offset)
			})
		} else {
			this.updateStatus(InstanceStatus.BadConfig)
		}
	},
}
