const { Regex } = require('@companion-module/base')
const { SOM, sense, cmd, respParam, unknown } = require('./consts.js')
const padding = '0000'

module.exports = function (self) {
	self.setActionDefinitions({
		stop: {
			name: 'Stop',
			description: 'This stops the controlled device.',
			options: [],
			callback: async () => {
				self.addCmdtoQueue(SOM + cmd.stop)
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		play: {
			name: 'Play',
			description: 'This starts controlled device playback.',
			options: [],
			callback: async () => {
				self.addCmdtoQueue(SOM + cmd.play)
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		record: {
			name: 'Record',
			description: 'This puts the controlled device into recording or recording standby status.',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: self.record_mode,
					default: respParam.recordModeSelect.record,
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.record + options.mode)
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		pause: {
			name: 'Pause',
			description: 'This pauses playback of the controlled device.',
			options: [],
			callback: async () => {
				self.addCmdtoQueue(SOM + cmd.pause + respParam.pauseSelect.pause)
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		search: {
			name: 'Search',
			description: 'This starts search playback on the controlled device.',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: self.search_mode,
					default: respParam.searchModeSelect.forwardNormal,
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.search + options.mode)
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		skip: {
			name: 'Skip',
			description: 'This skips on the controlled device.',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: self.skip_mode,
					default: respParam.skipModeSelect.trackSkipNext,
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.skip + options.mode)
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		repeatMode: {
			name: 'Repeat Mode',
			description: 'This sets the repeat mode of the controlled device.',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: self.repeat_mode,
					default: respParam.repeatModeSelectReturn.off,
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.repeatModeSelect + options.mode)
			},
			learn: async (action) => {
				const mode =
					self.recorder.repeatMode == unknown ? respParam.repeatModeSelectReturn.off : self.recorder.repeatMode
				return {
					...action.options,
					mode: mode,
				}
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.repeatModeSelect + sense)
			},
		},
		remoteLocalMode: {
			name: 'Remote/Local Select',
			description: 'Set whether operations using the controlled device itself are enabled or disabled.',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: self.remoteLocal_mode,
					default: respParam.remoteLocalSelectReturn.remote,
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.remoteLocalModeSelect + options.mode)
			},
			learn: async (action) => {
				const mode =
					self.recorder.remoteLocal == unknown ? respParam.remoteLocalSelectReturn.remote : self.recorder.remoteLocal
				return {
					...action.options,
					mode: mode,
				}
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.remoteLocalModeSelect + sense)
			},
		},
		playMode: {
			name: 'Play Mode Select',
			description: 'This sets the play mode of the controlled device.',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: self.play_mode,
					default: respParam.playModeReturn.allTake,
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.playModeSelect + options.mode)
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		currentTrackTime: {
			name: 'Current Track Time',
			description:
				'This requests that time information about the current take (or take being recorded) be returned. (Hour, minute, second, frame)',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: self.currentTrackTime_sense,
					default: respParam.currentTrackTimeSelect.elapsedTime,
				},
			],
			callback: async ({ options }) => {
				self.recorder.track.currentTrackTimeSense = options.mode
				self.addCmdtoQueue(SOM + cmd.currentTrackTimeSense + options.mode)
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		markSet: {
			name: 'Mark - Set',
			description: 'This sets a mark on the controlled device.',
			options: [],
			callback: async () => {
				self.addCmdtoQueue(SOM + cmd.markSet)
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		projectSkip: {
			name: 'Project Skip',
			description: 'This changes the project.',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: self.ProjectSkip_mode,
					default: respParam.projectSkipModeSelect.projectNext,
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.projectSkip + options.mode)
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		rebuildProject: {
			name: 'Rebuild Project',
			description: 'This rebuilds the current project/session.',
			options: [],
			callback: async () => {
				self.addCmdtoQueue(SOM + cmd.projectRebuild)
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		chaseSelect: {
			name: 'Chase Select',
			description: 'This turns the chase mode of the controlled device on/off.',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: self.chase_mode,
					default: respParam.chaseReturn.off,
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.chaseSelect + options.mode)
			},
			learn: async (action) => {
				const mode = self.recorder.chaseMode == unknown ? respParam.chaseReturn.off : self.recorder.chaseReturn
				return {
					...action.options,
					mode: mode,
				}
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.chaseSelect + sense)
			},
		},
		tcRestart: {
			name: 'TC Restart',
			description: 'This restarts the controlled device TC GENERATOR from the START TIME.',
			options: [],
			callback: async () => {
				self.addCmdtoQueue(SOM + cmd.tcRestart)
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		tcGeneratorModeSelect: {
			name: 'TC Generator Mode',
			description: 'This sets the TC GENERATOR mode of the controlled device.',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: self.tcGeneratorSelect_mode,
					default: respParam.tcGeneratorModeReturn.freeRun,
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.tcGeneratorModeSelect + options.mode)
			},
			learn: async (action) => {
				const mode =
					self.recorder.tcGeneratorMode == unknown
						? respParam.tcGeneratorModeReturn.freeRun
						: self.recorder.tcGeneratorMode
				return {
					...action.options,
					mode: mode,
				}
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.tcGeneratorModeSelect + sense)
			},
		},
		tcFrameTypeSelect: {
			name: 'TC Frame Type',
			description: 'This sets the TC FRAME TYPE of the controlled device.',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: self.tcFrameTypeSelect_mode,
					default: respParam.tcFrameTypeReturn[25],
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.tcFrameTypeSelect + options.mode)
			},
			learn: async (action) => {
				const mode = self.recorder.tcFrameType == unknown ? respParam.tcFrameTypeReturn[25] : self.recorder.tcFrameType
				return {
					...action.options,
					mode: mode,
				}
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.tcFrameTypeSelect + sense)
			},
		},
		tcOutputModeSelect: {
			name: 'TC Output Mode',
			description: 'This sets the TC mode output by the TC output connector of the controlled device.',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: self.tcOutputSelect_mode,
					default: respParam.tcOutputModeReturn.generator,
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.tcOutputModeSelect + options.mode)
			},
			learn: async (action) => {
				const mode =
					self.recorder.tcOutputMode == unknown ? respParam.tcOutputModeReturn.generator : self.recorder.tcOutputMode
				return {
					...action.options,
					mode: mode,
				}
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.tcOutputModeSelect + sense)
			},
		},
		clockMasterSelect: {
			name: 'Clock Master Select',
			description: 'Set the master clock of the controlled device.',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: self.clockMasterSelect_mode,
					default: respParam.clockMasterReturn.internal,
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.tcOutputModeSelect + options.mode)
			},
			learn: async (action) => {
				const mode =
					self.recorder.clockMaster == unknown ? respParam.clockMasterReturn.internal : self.recorder.clockMaster
				return {
					...action.options,
					mode: mode,
				}
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.tcOutputModeSelect + sense)
			},
		},
		wordThruSelect: {
			name: 'Word Thru Select',
			description: 'This sets the WORD/VIDEO SETUP of the controlled device.',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: self.wordThruSelect_mode,
					default: respParam.wordThruReturn.wordOutTermOn,
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.wordThruSelect + options.mode)
			},
			learn: async (action) => {
				const mode = self.recorder.wordThru == unknown ? respParam.wordThruReturn.wordOutTermOn : self.recorder.wordThru
				return {
					...action.options,
					mode: mode,
				}
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.wordThruSelect + sense)
			},
		},
		bitLengthSelect: {
			name: 'Bit Length Select',
			description: 'This sets the bit length used by the controlled device.',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: self.bitLengthSelect_mode,
					default: respParam.bitLengthReturn[24],
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.bitLengthSelect + options.mode)
			},
			learn: async (action) => {
				const mode = self.recorder.bitLength == unknown ? respParam.bitLengthReturn[24] : self.recorder.bitLength
				return {
					...action.options,
					mode: mode,
				}
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.bitLengthSelect + sense)
			},
		},
		pauseModeSelect: {
			name: 'Pause Mode',
			description: 'This sets the PAUSE mode of the controlled device.',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: self.pause_mode,
					default: respParam.pauseModeReturn.split,
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.pauseModeSelect + options.mode)
			},
			learn: async (action) => {
				const mode = self.recorder.pauseMode == unknown ? respParam.pauseModeReturn.split : self.recorder.pauseMode
				return {
					...action.options,
					mode: mode,
				}
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.pauseModeSelect + sense)
			},
		},
		audioOverMarker: {
			name: 'Audio Over Marker',
			description: 'This sets the AUDIO OVER MARKER of the controlled device.',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: self.audioOverMarketSelect_mode,
					default: respParam.audioOverMarkerReturn.off,
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.audioOverMarketSelect + options.mode)
			},
			learn: async (action) => {
				const mode =
					self.recorder.audioOverMarker == unknown ? respParam.audioOverMarkerReturn.off : self.recorder.audioOverMarker
				return {
					...action.options,
					mode: mode,
				}
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.audioOverMarketSelect + sense)
			},
		},
		timeIntervalMarker: {
			name: 'Time Interval Marker',
			description: 'This sets the TIME INTERVAL MARKER of the controlled device.',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: self.timeInternalMarkerSelect_mode,
					default: respParam.timeIntervalMarkerReturn.off,
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.timeInternalMarkerSelect + options.mode)
			},
			learn: async (action) => {
				const mode =
					self.recorder.timeIntervalMarker == unknown
						? respParam.timeIntervalMarkerReturn.off
						: self.recorder.timeIntervalMarker
				return {
					...action.options,
					mode: mode,
				}
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.timeInternalMarkerSelect + sense)
			},
		},
		timeIntervalMarkerTimePreset: {
			name: 'Timer Interval Marker Time',
			description: 'This sets the TIME INTERVAL MARKER TIME of the controlled device',
			options: [
				{
					type: 'textinput',
					id: 'interval',
					label: 'Time Interval (minutes)',
					default: '0060',
					regex: Regex.SOMETHING, //'/^[0-9]{4}/g',
					useVariables: true,
					tooltip: 'Must be a four digit integer',
				},
			],
			callback: async ({ options }) => {
				let interval = await self.parseVariablesInString(options.interval)
				if (interval.length != 4 || isNaN(interval)) {
					self.log('warn', `varible passed must be a 4 digit integer: ${interval}`)
					return undefined
				}
				self.addCmdtoQueue(
					SOM + cmd.timeIntervalMarkerTimePreset + interval[2] + interval[3] + interval[0] + interval[1]
				)
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		syncUnlockMarker: {
			name: 'Sync Unlock Marker',
			description: 'This sets the SYNC UNLOCK MARKER of the controlled device.',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: self.syncUnlockMarkerSelect_mode,
					default: respParam.syncUnlockMarkerReturn.off,
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.syncUnlockMarkerSelect + options.mode)
			},
			learn: async (action) => {
				const mode =
					self.recorder.syncUnlockMarker == unknown
						? respParam.syncUnlockMarkerReturn.off
						: self.recorder.syncUnlockMarker
				return {
					...action.options,
					mode: mode,
				}
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.syncUnlockMarkerSelect + sense)
			},
		},
		recFsSelect: {
			name: 'REC FS Select',
			description: 'This sets the REC FS used by the controlled device.',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: self.recFsSelect_mode,
					default: respParam.recFsReturn[48],
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.recFsSelect + options.mode)
			},
			learn: async (action) => {
				const mode = self.recorder.recFs == unknown ? respParam.recFsReturn[48] : self.recorder.recFs
				return {
					...action.options,
					mode: mode,
				}
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.recFsSelect + sense)
			},
		},
		fileNameSelect: {
			name: 'File Name Select',
			description: 'This sets the FILE NAME used by the controlled device.',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: self.fileNameSelect_mode,
					default: respParam.fileNameReturn.dateTime,
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.fileNameSelect + options.mode)
			},
			learn: async (action) => {
				const mode = self.recorder.fileName == unknown ? respParam.fileNameReturn.dateTime : self.recorder.fileName
				return {
					...action.options,
					mode: mode,
				}
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.fileNameSelect + sense)
			},
		},
		mediaFormat: {
			name: 'Media Format',
			description: 'Media Format',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: self.mediaFormat_mode,
					default: respParam.mediaFormatMode.fullFormatSSD,
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.mediaFormat + options.mode)
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		auxAssignKeySelect: {
			name: 'Aux Assign Key',
			description: 'This sets the AUX KEY ASSIGN of the controlled device.',
			options: [
				{
					type: 'dropdown',
					id: 'key',
					label: 'Key',
					choices: self.auxAssignKeySelect_auxKey,
					default: respParam.auxAssignKeyReturn.key[1],
				},
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Function',
					choices: self.auxAssignKeySelect_function,
					default: respParam.auxAssignKeyReturn.mode.playPause,
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.auxAssignKeySelect + options.key + options.mode)
			},
			//learn: async () => {},
			subscribe: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.auxAssignKeySelect + options.key + sense)
			},
		},
		auxAssignKeyTally: {
			name: 'Aux Assign Key Tally',
			description: 'This sets the AUX TALLY ASSIGN of the controlled device.',
			options: [
				{
					type: 'dropdown',
					id: 'key',
					label: 'Key',
					choices: self.auxAssignKeyTallySelect_auxKey,
					default: respParam.auxAssignTallyReturn.tally[1],
				},
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Function',
					choices: self.auxAssignKeyTallySelect_function,
					default: respParam.auxAssignTallyReturn.mode.stop,
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.auxAssignKeyTallySelect + options.key + options.mode)
			},
			//learn: async () => {},
			subscribe: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.auxAssignKeyTallySelect + options.key + sense)
			},
		},
		meterPeakHoldTime: {
			name: 'Meter Peak Hold Time',
			description: 'This sets the METER PEAK HOLD TIME used by the controlled device.',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: self.meterPeakHoldTimePreset_mode,
					default: respParam.meterPeakTimeReturn[0],
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.meterPeakHoldTimePreset + options.mode)
			},
			learn: async (action) => {
				const mode =
					self.recorder.meterPeakTime == unknown ? respParam.meterPeakTimeReturn[0] : self.recorder.meterPeakTime
				return {
					...action.options,
					mode: mode,
				}
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.meterPeakHoldTimePreset + sense)
			},
		},
		meterPeakClear: {
			name: 'Meter Peak Clear',
			description: 'Clear meter peak holds on the controlled device.',
			options: [],
			callback: async () => {
				self.addCmdtoQueue(SOM + cmd.meterPeakClear)
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		digitalRefLevel: {
			name: 'Digital Reference Level',
			description: 'This sets the DIGITAL REFERENCE LEVEL used by the controlled device.',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: self.digitalReferenceLevelPreset_mode,
					default: respParam.digitalReferenceLevelReturn[18],
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.digitalReferenceLevelPreset + options.mode)
			},
			learn: async (action) => {
				const mode =
					self.recorder.digitalReferenceLevel == unknown
						? respParam.digitalReferenceLevelReturn[18]
						: self.recorder.digitalReferenceLevel
				return {
					...action.options,
					mode: mode,
				}
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.digitalReferenceLevelPreset + sense)
			},
		},
		directMarkSkipPrest: {
			name: 'Mark - Direct Skip Preset',
			description: 'Specify a mark number to skip to it.',
			options: [
				{
					type: 'textinput',
					id: 'mark',
					label: 'Mark',
					default: '0001',
					regex: Regex.SOMETHING, //'/^[0-9]{4}/g',
					useVariables: true,
					tooltip: 'Must be a one to four digit integer',
				},
			],
			callback: async ({ options }) => {
				let mark = parseInt(await self.parseVariablesInString(options.mark))
				if (isNaN(mark)) {
					self.log('warn', `varible passed must be a number: ${mark}`)
					return undefined
				}
				mark = (padding + mark).substr(-4)
				self.addCmdtoQueue(SOM + cmd.markDirectSkipPreset + mark[2] + mark[3] + mark[0] + mark[1])
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		markDelete: {
			name: 'Mark - Delete',
			description: 'Delete a mark on the controlled device.',
			options: [
				{
					type: 'textinput',
					id: 'mark',
					label: 'Mark',
					default: '0001',
					regex: Regex.SOMETHING, ///^[0-9]{4}/g',
					useVariables: true,
					tooltip: 'Must be a one to four digit integer',
				},
			],
			callback: async ({ options }) => {
				let mark = parseInt(await self.parseVariablesInString(options.mark))
				if (isNaN(mark)) {
					self.log('warn', `varible passed must be a number: ${mark}`)
					return undefined
				}
				mark = (padding + mark).substr(-4)
				self.addCmdtoQueue(SOM + cmd.markDelete + mark[2] + mark[3] + mark[0] + mark[1])
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		takeErase: {
			name: 'Take Erase',
			description: 'Erase a specified take in the current project on the controlled unit.',
			options: [
				{
					type: 'textinput',
					id: 'take',
					label: 'Take',
					default: '0001',
					regex: Regex.SOMETHING, ///^[0-9]{4}/g',
					useVariables: true,
					tooltip: 'Must be a one to four digit integer',
				},
			],
			callback: async ({ options }) => {
				let take = parseInt(await self.parseVariablesInString(options.take))
				if (isNaN(take)) {
					self.log('warn', `varible passed must be a number: ${take}`)
					return undefined
				}
				take = (padding + take).substr(-4)
				self.addCmdtoQueue(SOM + cmd.takeErase + take[2] + take[3] + take[0] + take[1])
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		directTrackSearchPreset: {
			name: 'Direct Track Search Preset',
			description: 'Specify a take number to search for it directly.',
			options: [
				{
					type: 'textinput',
					id: 'take',
					label: 'Take',
					default: '0001',
					regex: Regex.SOMETHING, ///^[0-9]{4}/g',
					useVariables: true,
					tooltip: 'Must be a one to four digit integer',
				},
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode after search',
					choices: self.directTrackSearchPreset_mode,
					default: respParam.directTrackSearchPresetMode.stop,
				},
			],
			callback: async ({ options }) => {
				let take = parseInt(await self.parseVariablesInString(options.take))
				if (isNaN(take)) {
					self.log('warn', `varible passed must be a number: ${take}`)
					return undefined
				}
				take = (padding + take).substr(-4)
				self.addCmdtoQueue(SOM + cmd.takeErase + take[2] + take[3] + take[0] + take[1] + options.mode)
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		projectSelect: {
			name: 'Project - Select',
			description: 'Specify the project number to change the current project.',
			options: [
				{
					type: 'textinput',
					id: 'project',
					label: 'Project',
					default: '0001',
					regex: Regex.SOMETHING, ///^[0-9]{4}/g',
					useVariables: true,
					tooltip: 'Must be a one to four digit integer',
				},
			],
			callback: async ({ options }) => {
				let project = parseInt(await self.parseVariablesInString(options.project))
				if (isNaN(project)) {
					self.log('warn', `varible passed must be a number: ${project}`)
					return undefined
				}
				project = (padding + project).substr(-4)
				self.addCmdtoQueue(SOM + cmd.projectSelect + project[2] + project[3] + project[0] + project[1])
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		projectDelete: {
			name: 'Project - Delete',
			description: 'This deletes a project.',
			options: [
				{
					type: 'textinput',
					id: 'project',
					label: 'Project',
					default: '0001',
					regex: Regex.SOMETHING, ///^[0-9]{4}/g',
					useVariables: true,
					tooltip: 'Must be a one to four digit integer',
				},
			],
			callback: async ({ options }) => {
				let project = parseInt(await self.parseVariablesInString(options.project))
				if (isNaN(project)) {
					self.log('warn', `varible passed must be a number: ${project}`)
					return undefined
				}
				project = (padding + project).substr(-4)
				self.addCmdtoQueue(SOM + cmd.projectSelect + '0000' + project[2] + project[3] + project[0] + project[1])
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		recordFunction: {
			name: 'Record Function',
			description: 'This turns the record function of the controlled device on/off.',
			options: [
				{
					id: 'all',
					type: 'checkbox',
					label: 'All Tracks',
					default: false,
				},
				{
					id: 'on',
					type: 'checkbox',
					label: 'On / Off',
					default: false,
					isVisible: (options) => {
						return options.all
					},
				},
				{
					type: 'multidropdown',
					id: 'track',
					label: 'Tracks',
					choices: self.recordFunctionSelect_tracks,
					minSelection: 0,
					maxSelection: 64,
					tooltip: 'Select track to arm record function. Unselected tracks are disarmed.',
					isVisible: (options) => {
						return options.all === false
					},
				},
			],
			callback: ({ options }) => {
				let tracks = options.track
				let msg = SOM + cmd.recordFunctionSelect
				if (options.all) {
					msg += options.on ? '00001' : '00000'
				} else {
					msg += '0100'
					for (let i = 1; i <= 64; i++) {
						msg += tracks.includes(i) ? '1' : '0'
					}
				}
				self.addCmdtoQueue(msg)
			},
			//learn: async () => {},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.recordFunctionSelect + sense)
			},
		},
	})
}
