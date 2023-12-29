const { Regex } = require('@companion-module/base')
const { SOM, cmd } = require('./consts.js')

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
					default: '00',
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
				self.addCmdtoQueue(SOM + cmd.pause + '01')
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
					default: '00',
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
					default: '00',
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
					default: '00',
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.repeatModeSelect + options.mode)
			},
			//learn: async () => {},
			//subscribe: async () => {},
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
					default: '00',
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.remoteLocalModeSelect + options.mode)
			},
			//learn: async () => {},
			//subscribe: async () => {},
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
					default: '00',
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
					default: '10',
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
					default: '10',
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
					default: '00',
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.chaseSelect + options.mode)
			},
			//learn: async () => {},
			//subscribe: async () => {},
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
					default: '00',
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.tcGeneratorModeSelect + options.mode)
			},
			//learn: async () => {},
			//subscribe: async () => {},
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
					default: '25',
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.tcFrameTypeSelect + options.mode)
			},
			//learn: async () => {},
			//subscribe: async () => {},
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
					default: '25',
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.tcOutputModeSelect + options.mode)
			},
			//learn: async () => {},
			//subscribe: async () => {},
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
					default: '00',
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.tcOutputModeSelect + options.mode)
			},
			//learn: async () => {},
			//subscribe: async () => {},
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
					default: '00',
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.wordThruSelect + options.mode)
			},
			//learn: async () => {},
			//subscribe: async () => {},
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
					default: '24',
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.bitLengthSelect + options.mode)
			},
			//learn: async () => {},
			//subscribe: async () => {},
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
					default: '00',
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.pauseModeSelect + options.mode)
			},
			//learn: async () => {},
			//subscribe: async () => {},
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
					default: '00',
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.audioOverMarketSelect + options.mode)
			},
			//learn: async () => {},
			//subscribe: async () => {},
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
					default: '00',
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.timeInternalMarkerSelect + options.mode)
			},
			//learn: async () => {},
			//subscribe: async () => {},
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
					default: '00',
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.syncUnlockMarkerSelect + options.mode)
			},
			//learn: async () => {},
			//subscribe: async () => {},
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
					default: '480000',
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.recFsSelect + options.mode)
			},
			//learn: async () => {},
			//subscribe: async () => {},
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
					default: '00',
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.fileNameSelect + options.mode)
			},
			//learn: async () => {},
			//subscribe: async () => {},
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
					default: '0100',
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
					default: '01',
				},
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Function',
					choices: self.auxAssignKeySelect_function,
					default: '00',
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.auxAssignKeySelect + options.key + options.mode)
			},
			//learn: async () => {},
			//subscribe: async () => {},
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
					default: '01',
				},
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Function',
					choices: self.auxAssignKeyTallySelect_function,
					default: '00',
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.auxAssignKeyTallySelect + options.key + options.mode)
			},
			//learn: async () => {},
			//subscribe: async () => {},
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
					default: '00',
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.meterPeakHoldTimePreset + options.mode)
			},
			//learn: async () => {},
			//subscribe: async () => {},
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
					default: '18',
				},
			],
			callback: async ({ options }) => {
				self.addCmdtoQueue(SOM + cmd.digitalReferenceLevelPreset + options.mode)
			},
			//learn: async () => {},
			//subscribe: async () => {},
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
					tooltip: 'Must be a four digit integer',
				},
			],
			callback: async ({ options }) => {
				let mark = await self.parseVariablesInString(options.mark)
				if (mark.length != 4 || isNaN(mark)) {
					self.log('warn', `varible passed must be a 4 digit integer: ${mark}`)
					return undefined
				}
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
					tooltip: 'Must be a four digit integer',
				},
			],
			callback: async ({ options }) => {
				let mark = await self.parseVariablesInString(options.mark)
				if (mark.length != 4 || isNaN(mark)) {
					self.log('warn', `varible passed must be a 4 digit integer: ${mark}`)
					return undefined
				}
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
					tooltip: 'Must be a four digit integer',
				},
			],
			callback: async ({ options }) => {
				let take = await self.parseVariablesInString(options.take)
				if (take.length != 4 || isNaN(take)) {
					self.log('warn', `varible passed must be a 4 digit integer: ${take}`)
					return undefined
				}
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
					tooltip: 'Must be a four digit integer',
				},
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode after search',
					choices: self.directTrackSearchPreset_mode,
					default: '10',
				},
			],
			callback: async ({ options }) => {
				let take = await self.parseVariablesInString(options.take)
				if (take.length != 4 || isNaN(take)) {
					self.log('warn', `varible passed must be a 4 digit integer: ${take}`)
					return undefined
				}
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
					tooltip: 'Must be a four digit integer',
				},
			],
			callback: async ({ options }) => {
				let project = await self.parseVariablesInString(options.project)
				if (project.length != 4 || isNaN(project)) {
					self.log('warn', `varible passed must be a 4 digit integer: ${project}`)
					return undefined
				}
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
					tooltip: 'Must be a four digit integer',
				},
			],
			callback: async ({ options }) => {
				let project = await self.parseVariablesInString(options.project)
				if (project.length != 4 || isNaN(project)) {
					self.log('warn', `varible passed must be a 4 digit integer: ${project}`)
					return undefined
				}
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
			//subscribe: async () => {},
		},
	})
}
