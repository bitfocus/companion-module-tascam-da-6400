//const { Regex } = require('@companion-module/base')
const { SOM, cmd } = require('./consts.js')

module.exports = function (self) {
	self.setActionDefinitions({
		stop: {
			name: 'Stop',
			description: 'Stop',
			options: [],
			callback: async () => {
				self.addCmdtoQueue(SOM + cmd.stop)
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		play: {
			name: 'Play',
			description: 'Play',
			options: [],
			callback: async () => {
				self.addCmdtoQueue(SOM + cmd.play)
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		record: {
			name: 'Record',
			description: 'Record',
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
			description: 'Pause',
			options: [],
			callback: async () => {
				self.addCmdtoQueue(SOM + cmd.pause + '01')
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		search: {
			name: 'Search',
			description: 'Search',
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
			description: 'Skip',
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
			description: 'Repeat Mode',
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
			description: 'Remote/Local Select',
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
			description: 'Play Mode Select',
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
			description: 'Current Track Time',
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
				self.addCmdtoQueue(SOM + cmd.currentTrackTimeSense + options.mode)
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		markSet: {
			name: 'Mark Set',
			description: 'Mark Set',
			options: [],
			callback: async () => {
				self.addCmdtoQueue(SOM + cmd.markSet)
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		projectSkip: {
			name: 'Project Skip',
			description: 'Project Skip',
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
			description: 'Rebuild Project',
			options: [],
			callback: async () => {
				self.addCmdtoQueue(SOM + cmd.projectRebuild)
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		chaseSelect: {
			name: 'Chase Select',
			description: 'Chase Select',
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
			description: 'Timecode Restart',
			options: [],
			callback: async () => {
				self.addCmdtoQueue(SOM + cmd.tcRestart)
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		tcGeneratorModeSelect: {
			name: 'TC Generator Mode',
			description: 'TC Generator Mode',
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
			description: 'TC Frame Type',
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
			description: 'TC Output Mode',
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
			description: 'Clock Master Select',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: self.clockMasterSelect_mode,
					default: '25',
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
			description: 'Word Clock Out/Through/Term Select',
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
			description: 'Bit Length Select',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: self.bitLengthSelect_mode,
					default: '00',
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
			description: 'Pause Mode',
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
			description: 'Audio Over Marker',
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
			description: 'Time Interval Marker',
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
		syncUnlockMarker: {
			name: 'Sync Unlock Marker',
			description: 'Sync Unlock Marker',
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
			description: 'Select recording sample rate',
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
			description: 'File Name Select',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: self.fileNameSelect_mode,
					default: '480000',
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
			description: 'Aux Assign Key',
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
			description: 'Aux Assign Key Tally',
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
			description: 'Meter Peak Hold Time',
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
			description: 'Reset Peak Meters',
			options: [],
			callback: async () => {
				self.addCmdtoQueue(SOM + cmd.meterPeakClear)
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		digitalRefLevel: {
			name: 'Digital Reference Level',
			description: 'Digital Reference Level',
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
	})
}
