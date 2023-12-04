const { resp, SOM } = require('./consts.js')

module.exports = {
	async processCmd(chunk) {
		let reply = chunk.toString()
		this.log('debug', `response recieved: ${reply}`)
		//let varList = []
		switch (reply) {
			case resp.password:
				this.addCmdtoQueue(this.config.password)
				return true
			case resp.loginSuccess:
				this.updateStatus('ok', 'Logged in')
				return true
		}
		while (reply[0] != SOM && reply.length > 0) {
			reply = reply.slice(1)
		}
		if (reply.length == 0) {
			return false
		}
		let response = reply.substr(1, 2)
		let venderCmd = reply.substr(1, 6)
		let param = []
		switch (response) {
			case resp.keepAlive:
				break
			case resp.infoReturn:
				break
			case resp.repeatModeSelectReturn:
				break
			case resp.playModeReturn:
				break
			case resp.mechaStatusReturn:
				param[0] = reply.substr(3, 2)
				this.recoder.mechaStatus = param[0] === undefined ? this.recoder.mechaStatus : param[0]
				this.updateFeedbacks('mechaStatus')
				break
			case resp.trackNoStatusReturn:
				break
			case resp.trackCurrentInfoReturn:
				break
			case resp.trackCurrentTimeReturn:
				break
			case resp.titleReturn:
				break
			case resp.totalTrackNoTotalTimeReturn:
				break
			case resp.keyboardTypeReturn:
				break
			case resp.errorSenseRequest:
				break
			case resp.cautionSenseRequest:
				break
			case resp.illegalStatus:
				break
			case resp.changeStatus:
				break
			case resp.errorSenseReturn:
				break
			case resp.cautionSenseReturn:
				break
			case resp.venderCommandReturn:
				switch (venderCmd) {
					case resp.projectCreateReturn:
						break
					case resp.projectRebuildAck:
						break
					case resp.projectDeleteAck:
						break
					case resp.projectNoReturn:
						break
					case resp.projectNameReturn:
						break
					case resp.projectTotalNoReturn:
						break
					case resp.markNoReturn:
						break
					case resp.markTimeReturn:
						break
					case resp.markNameReturn:
						break
					case resp.markTotalNoReturn:
						break
					case resp.chaseReturn:
						break
					case resp.tcStartTimeReturn:
						break
					case resp.tcUserBitsReturn:
						break
					case resp.tcGeneratorModeReturn:
						break
					case resp.tcFrameTypeReturn:
						break
					case resp.tcOutputModeReturn:
						break
					case resp.clockMasterReturn:
						break
					case resp.wordThruReturn:
						break
					case resp.recordFunctionReturn:
						break
					case resp.inputMonitorFunctionReturn:
						break
					case resp.bitLengthReturn:
						break
					case resp.maxFileSizeReturn:
						break
					case resp.pauseModeReturn:
						break
					case resp.timeIntervalMarkerTimeReturn:
						break
					case resp.audioMarkerReturn:
						break
					case resp.timeIntervalMarkerReturn:
						break
					case resp.syncUnlockMarkerReturn:
						break
					case resp.recFsReturn:
						break
					case resp.userWordReturn:
						break
					case resp.fileNameReturn:
						break
					case resp.mediaRemainReturn:
						break
					case resp.mediaFormatAck:
						break
					case resp.auxAssignKeyReturn:
						break
					case resp.auxAssignTallyReturn:
						break
					case resp.inputRoutingReturn:
						break
					case resp.outputRoutingReturn:
						break
					case resp.meterPeakTimeReturn:
						break
					case resp.digitalReferenceLevelReturn:
						break
					case resp.takeRenameAck:
						break
					case resp.takeEraseAck:
						break
					case resp.takeCopyAck:
						break
					default:
				}
				break
			default:
				this.log('warn', `Unexpected response from unit: ${reply}`)
		}
	},
}
