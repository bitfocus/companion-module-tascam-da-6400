const { resp, respParam, cmd, SOM, cmdOnLogin } = require('./consts.js')

module.exports = {
	async processCmd(chunk) {
		let reply = chunk.toString()
		//this.log('debug', `response recieved: ${reply}`)
		switch (reply) {
			case resp.password:
				this.sendCommand(this.config.password)
				return true
			case resp.loginSuccess:
				this.updateStatus('ok', 'Logged in')
				this.log('info', 'OK: Logged In')
				this.stopTimeOut()
				this.startCmdQueue()
				for (let i = 0; i < cmdOnLogin.length; i++) {
					this.addCmdtoQueue(SOM + cmdOnLogin[i])
				}
				this.startKeepAlive()
				return true
			case resp.loginFail:
				this.log('error', 'Password is incorrect')
				this.stopCmdQueue()
				this.stopKeepAlive()
				this.startTimeOut()
				return false
		}
		while (reply[0] != SOM && reply.length > 0) {
			reply = reply.slice(1)
		}
		if (reply.length == 0) {
			return false
		}
		let response = reply.substr(1, 2)
		let venderCmd = response == resp.venderCommandReturn ? reply.substr(1, 6) : null
		let param = []
		let varList = []
		switch (response) {
			case resp.keepAlive:
				this.log('debug', `keepAlive msg recieved`)
				break
			case resp.infoReturn:
				this.log('info', `Firmware Version: ${reply.substr(3, 2)}.${reply.substr(5, 2)}`)
				break
			case resp.clockDataReturn:
				break
			case resp.repeatModeSelectReturn:
				param[0] = reply.substr(3, 2)
				this.recorder.repeatMode = param[0] === undefined ? this.recorder.repeatMode : param[0]
				this.checkFeedbacks('repeatMode')
				break
			case resp.remoteLocalModeReturn:
				param[0] = reply.substr(3, 2)
				this.recorder.remoteLocal = param[0] === undefined ? this.recorder.remoteLocal : param[0]
				this.checkFeedbacks('remoteLocal')
				break
			case resp.playModeReturn:
				param[0] = reply.substr(3, 2)
				this.recorder.playMode = param[0] === undefined ? this.recorder.playMode : param[0]
				this.checkFeedbacks('playMode')
				break
			case resp.mechaStatusReturn:
				param[0] = reply.substr(3, 2)
				this.recorder.mechaStatus = param[0] === undefined ? this.recorder.mechaStatus : param[0]
				this.checkFeedbacks('mechaStatus')
				break
			case resp.trackNoStatusReturn:
				param[0] = parseInt(reply[7] + reply[8] + reply[5] + reply[6])
				this.recorder.track.number = isNaN(param[0]) ? this.recorder.track.number : param[0]
				varList['trackNo'] = this.recorder.track.number
				this.setVariableValues(varList)
				break
			case resp.trackCurrentInfoReturn:
				param[0] = parseInt(reply[5] + reply[6] + reply[3] + reply[4])
				this.recorder.track.time = `${reply[7]}${reply[8]}:${reply[9]}${reply[10]}:${reply[11]}${reply[12]}:${reply[13]}${reply[14]}`
				this.recorder.track.number = isNaN(param[0]) ? this.recorder.track.number : param[0]
				varList['trackNo'] = this.recorder.track.number
				varList['trackTime'] = this.recorder.track.time
				varList['trackTimeHours'] = parseInt(`${reply[7]}${reply[8]}`)
				varList['trackTimeMinutes'] = parseInt(`${reply[9]}${reply[10]}`)
				varList['trackTimeSeconds'] = parseInt(`${reply[11]}${reply[12]}`)
				varList['trackTimeFrames'] = parseInt(`${reply[13]}${reply[14]}`)
				this.setVariableValues(varList)
				break
			case resp.trackCurrentTimeReturn:
				this.recorder.track.time = `${reply[5]}${reply[6]}:${reply[7]}${reply[8]}:${reply[9]}${reply[10]}:${reply[11]}${reply[12]}`
				varList['trackTime'] = this.recorder.track.time
				varList['trackTimeHours'] = parseInt(`${reply[5]}${reply[6]}`)
				varList['trackTimeMinutes'] = parseInt(`${reply[7]}${reply[8]}`)
				varList['trackTimeSeconds'] = parseInt(`${reply[9]}${reply[10]}`)
				varList['trackTimeFrames'] = parseInt(`${reply[11]}${reply[12]}`)
				this.setVariableValues(varList)
				break
			case resp.titleReturn:
				break
			case resp.totalTrackNoTotalTimeReturn:
				break
			case resp.keyboardTypeReturn:
				param[0] = reply.substr(3, 2)
				this.recorder.keyboardType = param[0] === undefined ? this.recorder.keyboardType : param[0]
				this.checkFeedbacks('keyboardType')
				break
			case resp.errorSenseRequest:
				this.log('debug', `errorSenseRequest`)
				this.addCmdtoQueue(SOM + cmd.errorSense)
				break
			case resp.cautionSenseRequest:
				this.log('debug', `cautionSenseRequest`)
				this.addCmdtoQueue(SOM + cmd.cautionSense)
				break
			case resp.illegalStatus:
				this.log('warn', `Illegal Status: Invalid Command ${reply.substr(3)}`)
				break
			case resp.changeStatus:
				param[0] = reply.substr(3, 2)
				if (param[0] == respParam.changeStatus.mechaStatus) {
					//mecha status changed
					this.addCmdtoQueue(SOM + cmd.mechaStatusSense)
				} else if (param[0] == respParam.changeStatus.track) {
					//take number changed
					this.addCmdtoQueue(SOM + cmd.trackNumStatusSense)
				}
				break
			case resp.errorSenseReturn:
				param[0] = reply[6] + '-' + reply[3] + reply[4]
				switch (param[0]) {
					case respParam.errorSenseReturn.noError:
						this.log('info', `errorSenseReturn: No Error`)
						varList['error'] = 'No Error'
						break
					case respParam.errorSenseReturn.recError:
						this.log('warn', `errorSenseReturn: Record Error`)
						varList['error'] = 'Record Error'
						break
					case respParam.errorSenseReturn.deviceError:
						this.log('warn', `errorSenseReturn: Device Error`)
						varList['error'] = 'Device Error'
						break
					case respParam.errorSenseReturn.infoWriteError:
						this.log('warn', `errorSenseReturn: Infomation Write Error`)
						varList['error'] = 'Infomation Write Error'
						break
					case respParam.errorSenseReturn.otherError:
						this.log('warn', `errorSenseReturn: Other Error`)
						varList['error'] = 'Other Error'
						break
					default:
						//Shouldn't occur
						this.log('warn', `errorSenseReturn: Switch Default: ${param[0]}`)
						varList['error'] = 'Default Error'
				}
				this.recorder.error = param[0]
				this.checkFeedbacks('error')
				this.setVariableValues(varList)
				break
			case resp.cautionSenseReturn:
				param[0] = reply[6] + '-' + reply[3] + reply[4]
				switch (param[0]) {
					case respParam.cautionSenseReturn.noCaution:
						this.log('info', `cautionSenseReturn: No Caution`)
						varList['caution'] = 'No Caution'
						break
					case respParam.cautionSenseReturn.mediaError:
						this.log('warn', `cautionSenseReturn: Media Error`)
						varList['caution'] = 'Media Error'
						break
					case respParam.cautionSenseReturn.mediaFull:
						this.log('warn', `cautionSenseReturn: Media Full`)
						varList['caution'] = 'Media Full'
						break
					case respParam.cautionSenseReturn.takeFull:
						this.log('warn', `cautionSenseReturn: Take Full`)
						varList['caution'] = 'Take Full'
						break
					case respParam.cautionSenseReturn.digitalUnlock:
						this.log('warn', `cautionSenseReturn: Digital Unlock`)
						varList['caution'] = 'Digital Unlock'
						break
					case respParam.cautionSenseReturn.cantRec:
						this.log('warn', `cautionSenseReturn: Can't REC`)
						varList['caution'] = "Can't REC"
						break
					case respParam.cautionSenseReturn.writeProtected:
						this.log('warn', `cautionSenseReturn: Write Protected`)
						varList['caution'] = 'Write Protected'
						break
					case respParam.cautionSenseReturn.notExecute:
						this.log('warn', `cautionSenseReturn: Not Execute`)
						varList['caution'] = 'Not Execute'
						break
					case respParam.cautionSenseReturn.cantEdit:
						this.log('warn', `cautionSenseReturn: Can't Edit`)
						varList['caution'] = "Can't Edit"
						break
					case respParam.cautionSenseReturn.cantSelect:
						this.log('warn', `cautionSenseReturn: Can't Select`)
						varList['caution'] = "Can't Select"
						break
					case respParam.cautionSenseReturn.trackProtected:
						this.log('warn', `cautionSenseReturn: Track Protected`)
						varList['caution'] = 'Track Protected'
						break
					case respParam.cautionSenseReturn.nameFull:
						this.log('warn', `cautionSenseReturn: Name Full`)
						varList['caution'] = 'Name Full'
						break
					case respParam.cautionSenseReturn.playError:
						this.log('warn', `cautionSenseReturn: Play Error`)
						varList['caution'] = 'Play Error'
						break
					case respParam.cautionSenseReturn.otherCaution:
						this.log('warn', `cautionSenseReturn: Other Caution`)
						varList['caution'] = 'Other Caution'
						break
					default:
						//Shouldn't occur
						this.log('warn', `cautionSenseReturn: Switch Default: ${param[0]}`)
						varList['caution'] = 'Default Caution'
				}
				this.recorder.caution = param[0]
				this.checkFeedbacks('caution')
				this.setVariableValues(varList)
				break
			case resp.venderCommandReturn:
				switch (venderCmd) {
					case resp.projectCreateAck:
						param[0] = reply.substr(7, 2)
						switch (param[0]) {
							case respParam.createProjectACK.start:
								this.log('info', 'Create Project started')
								break
							case respParam.createProjectACK.endOK:
								this.log('info', 'Create Project completed successfully')
								break
							case respParam.createProjectACK.endNG:
								this.log('warn', 'Create Project did not complete or it failed')
								break
							default:
								this.log('warn', `unexpected parameter passed from createProjectAck: ${reply}`)
						}
						break
					case resp.projectRebuildAck:
						param[0] = reply.substr(7, 2)
						switch (param[0]) {
							case respParam.rebuildProjectACK.start:
								this.log('info', 'Project rebuild started')
								break
							case respParam.rebuildProjectACK.endOK:
								this.log('info', 'Project rebuild completed successfully')
								break
							case respParam.rebuildProjectACK.endNG:
								this.log('warn', 'Project rebuild did not complete or it failed')
								break
							default:
								this.log('warn', `unexpected parameter passed from projectRebuildAck: ${reply}`)
						}
						break
					case resp.projectDeleteAck:
						param[0] = reply.substr(7, 2)
						switch (param[0]) {
							case respParam.deleteProjectACK.start:
								this.log('info', 'Project delete started')
								break
							case respParam.deleteProjectACK.endOK:
								this.log('info', 'Project delete completed successfully')
								break
							case respParam.deleteProjectACK.endNG:
								this.log('warn', 'Project delete did not complete or it failed')
								break
							default:
								this.log('warn', `unexpected parameter passed from projectDeleteAck: ${reply}`)
						}
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
						param[0] = reply.substr(7, 2)
						this.recorder.chaseMode = param[0] === undefined ? this.recorder.chaseMode : param[0]
						this.checkFeedbacks('chaseMode')
						break
					case resp.tcStartTimeReturn:
						break
					case resp.tcUserBitsReturn:
						break
					case resp.tcGeneratorModeReturn:
						param[0] = reply.substr(7, 2)
						this.recorder.tcGeneratorMode = param[0] === undefined ? this.recorder.tcGeneratorMode : param[0]
						this.checkFeedbacks('tcGeneratorMode')
						break
					case resp.tcFrameTypeReturn:
						param[0] = reply.substr(7, 2)
						this.recorder.tcFrameType = param[0] === undefined ? this.recorder.tcFrameType : param[0]
						this.checkFeedbacks('tcFrameType')
						break
					case resp.tcOutputModeReturn:
						param[0] = reply.substr(7, 2)
						this.recorder.tcOutputMode = param[0] === undefined ? this.recorder.tcOutputMode : param[0]
						this.checkFeedbacks('tcOutputMode')
						break
					case resp.clockMasterReturn:
						param[0] = reply.substr(7, 2)
						this.recorder.clockMaster = param[0] === undefined ? this.recorder.clockMaster : param[0]
						this.checkFeedbacks('clockMaster')
						break
					case resp.wordThruReturn:
						param[0] = reply.substr(7, 2)
						this.recorder.wordThru = param[0] === undefined ? this.recorder.wordThru : param[0]
						this.checkFeedbacks('wordThru')
						break
					case resp.recordFunctionReturn:
						break
					case resp.inputMonitorFunctionReturn:
						break
					case resp.bitLengthReturn:
						param[0] = reply.substr(7, 2)
						this.recorder.bitLength = param[0] === undefined ? this.recorder.bitLength : param[0]
						this.checkFeedbacks('bitLength')
						break
					case resp.maxFileSizeReturn:
						break
					case resp.pauseModeReturn:
						param[0] = reply.substr(7, 2)
						this.recorder.pauseMode = param[0] === undefined ? this.recorder.pauseMode : param[0]
						this.checkFeedbacks('pauseMode')
						break
					case resp.timeIntervalMarkerTimeReturn:
						this.log('debug', `timeIntervalMarkerTimeReturn`)
						break
					case resp.audioMarkerReturn:
						param[0] = reply.substr(7, 2)
						this.recorder.audioOverMarker = param[0] === undefined ? this.recorder.audioOverMarker : param[0]
						this.checkFeedbacks('audioOverMarker')
						break
					case resp.timeIntervalMarkerReturn:
						param[0] = reply.substr(7, 2)
						this.recorder.timeIntervalMarker = param[0] === undefined ? this.recorder.timeIntervalMarker : param[0]
						this.checkFeedbacks('timeIntervalMarker')
						break
					case resp.syncUnlockMarkerReturn:
						param[0] = reply.substr(7, 2)
						this.recorder.syncUnlockMarker = param[0] === undefined ? this.recorder.syncUnlockMarker : param[0]
						this.checkFeedbacks('syncUnlockMarker')
						break
					case resp.recFsReturn:
						param[0] = reply.substr(7, 6)
						this.recorder.recFs = param[0] === undefined ? this.recorder.recFs : param[0]
						this.checkFeedbacks('recFs')
						break
					case resp.userWordReturn:
						break
					case resp.fileNameReturn:
						param[0] = reply.substr(7, 2)
						this.recorder.fileName = param[0] === undefined ? this.recorder.fileName : param[0]
						this.checkFeedbacks('fileName')
						break
					case resp.mediaRemainReturn:
						break
					case resp.mediaFormatAck:
						param[0] = reply.substr(7, 2)
						switch (param[0]) {
							case respParam.mediaFormatAck.start:
								this.log('info', 'Media format started')
								break
							case respParam.mediaFormatAck.endOK:
								this.log('info', 'Media format completed successfully')
								break
							case respParam.mediaFormatAck.endNG:
								this.log('warn', 'Media format did not complete or it failed')
								break
							default:
								this.log('warn', `unexpected parameter passed from mediaFormatAck: ${reply}`)
						}
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
						param[0] = reply.substr(7, 2)
						this.recorder.meterPeakTime = param[0] === undefined ? this.recorder.meterPeakTime : param[0]
						this.checkFeedbacks('meterPeakTime')
						break
					case resp.digitalReferenceLevelReturn:
						param[0] = reply.substr(7, 2)
						this.recorder.digitalReferenceLevel =
							param[0] === undefined ? this.recorder.digitalReferenceLevel : param[0]
						this.checkFeedbacks('digitalReferenceLevel')
						break
					case resp.takeRenameAck:
						param[0] = reply.substr(7, 2)
						switch (param[0]) {
							case respParam.takeRenameAck.start:
								this.log('info', 'Take rename started')
								break
							case respParam.takeRenameAck.endOK:
								this.log('info', 'Take rename completed successfully')
								break
							case respParam.takeRenameAck.endNG:
								this.log('warn', 'Take rename did not complete or it failed')
								break
							default:
								this.log('warn', `unexpected parameter passed from takeRenameAck: ${reply}`)
						}
						break
					case resp.takeEraseAck:
						param[0] = reply.substr(7, 2)
						switch (param[0]) {
							case respParam.takeEraseAck.start:
								this.log('info', 'Take erase started')
								break
							case respParam.takeEraseAck.endOK:
								this.log('info', 'Take erase completed successfully')
								break
							case respParam.takeEraseAck.endNG:
								this.log('warn', 'Take erase did not complete or it failed')
								break
							default:
								this.log('warn', `unexpected parameter passed from takeEraseAck: ${reply}`)
						}
						break
					case resp.takeCopyAck:
						param[0] = reply.substr(7, 2)
						switch (param[0]) {
							case respParam.takeCopyAck.start:
								this.log('info', 'Take copy started')
								break
							case respParam.takeCopyAck.endOK:
								this.log('info', 'Take copy completed successfully')
								break
							case respParam.takeCopyAck.endNG:
								this.log('warn', 'Take copy did not complete or it failed')
								break
							default:
								this.log('warn', `unexpected parameter passed from takeCopyAck: ${reply}`)
						}
						break
					case resp.psuError:
						this.recorder.psuError = reply.substr(7, 4)
						this.checkFeedbacks('psu')
						break
					default:
						this.log('debug', `unknown vender command: ${reply}`)
				}
				break
			default:
				this.log('warn', `Unexpected response from unit: ${reply}`)
		}
	},
}
