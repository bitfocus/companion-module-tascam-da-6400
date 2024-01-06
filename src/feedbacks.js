const { combineRgb } = require('@companion-module/base')
const { SOM, cmd, sense, respParam } = require('./consts.js')

module.exports = async function (self) {
	self.setFeedbackDefinitions({
		mechaStatus: {
			name: 'Mecha Status',
			type: 'boolean',
			label: 'Mecha Status',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'status',
					type: 'dropdown',
					label: 'Status',
					choices: self.mechaStatus_feedback,
					default: respParam.mechaStatusReturn.noMedia,
				},
			],
			callback: ({ options }) => {
				return options.status == self.recorder.mechaStatus
			},
		},
		error: {
			name: 'Error State',
			type: 'boolean',
			label: 'Error State',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'error',
					type: 'dropdown',
					label: 'Error',
					choices: self.errorSense_feedback,
					default: respParam.errorSenseReturn.noError,
				},
			],
			callback: ({ options }) => {
				return options.error == self.recorder.error
			},
		},
		caution: {
			name: 'Caution State',
			type: 'boolean',
			label: 'Caution State',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'caution',
					type: 'dropdown',
					label: 'Caution',
					choices: self.cautionSense_feedback,
					default: respParam.cautionSenseReturn.noCaution,
				},
			],
			callback: ({ options }) => {
				return options.caution == self.recorder.caution
			},
		},
		psu: {
			name: 'PSU State',
			type: 'boolean',
			label: 'PSU State',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'psu',
					type: 'dropdown',
					label: 'PSU',
					choices: self.psuError_feedback,
					default: respParam.psuErrorReturn.error,
				},
			],
			callback: ({ options }) => {
				return options.psu == self.recorder.psuError
			},
		},
		repeatMode: {
			name: 'Repeat Mode',
			type: 'boolean',
			label: 'Repeat Mode',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Mode',
					choices: self.repeat_feedback,
					default: respParam.repeatModeSelectReturn.off,
				},
			],
			callback: ({ options }) => {
				return options.mode == self.recorder.repeatMode
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.repeatModeSelect + sense)
			},
		},
		remoteLocal: {
			name: 'Remote/Local Mode',
			type: 'boolean',
			label: 'Remote/Local Mode',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Mode',
					choices: self.remoteLocal_feedback,
					default: respParam.remoteLocalSelectReturn.local,
				},
			],
			callback: ({ options }) => {
				return options.mode == self.recorder.remoteLocal
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.remoteLocalModeSelect + sense)
			},
		},
		keyboardType: {
			name: 'Keyboard Type',
			type: 'boolean',
			label: 'Keyboard Type',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Mode',
					choices: self.keyboardType_feedback,
					default: respParam.keyboardTypeReturn.english,
				},
			],
			callback: ({ options }) => {
				return options.mode == self.recorder.keyboardType
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.keyboardTypeSense)
			},
		},
		chaseMode: {
			name: 'Chase Mode',
			type: 'boolean',
			label: 'Chase Mode',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Mode',
					choices: self.chase_feedback,
					default: respParam.chaseReturn.off,
				},
			],
			callback: ({ options }) => {
				return options.mode == self.recorder.chaseMode
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.chaseSelect + sense)
			},
		},
		tcGeneratorMode: {
			name: 'TC Generator Mode',
			type: 'boolean',
			label: 'Timecode Generator Mode',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Mode',
					choices: self.tcGenerator_feedback,
					default: respParam.tcGeneratorModeReturn.freeRun,
				},
			],
			callback: ({ options }) => {
				return options.mode == self.recorder.tcGeneratorMode
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.tcGeneratorModeSelect + sense)
			},
		},
		tcFrameType: {
			name: 'TC Frame Type',
			type: 'boolean',
			label: 'Timecode Frame Type',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Mode',
					choices: self.tcFrameType_feedback,
					default: respParam.tcFrameTypeReturn[25],
				},
			],
			callback: ({ options }) => {
				return options.mode == self.recorder.tcFrameType
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.tcFrameTypeSelect + sense)
			},
		},
		tcOutputMode: {
			name: 'TC Output Mode',
			type: 'boolean',
			label: 'Timecode Output Mode',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Mode',
					choices: self.tcOutput_feedback,
					default: respParam.tcOutputModeReturn.generator,
				},
			],
			callback: ({ options }) => {
				return options.mode == self.recorder.tcOutputMode
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.tcOutputModeSelect + sense)
			},
		},
		clockMaster: {
			name: 'Clock Master',
			type: 'boolean',
			label: 'Clock Master',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Mode',
					choices: self.clockMaster_feedback,
					default: respParam.clockMasterReturn.internal,
				},
			],
			callback: ({ options }) => {
				return options.mode == self.recorder.clockMaster
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.clockMasterSelect + sense)
			},
		},
		wordThru: {
			name: 'Word Through',
			type: 'boolean',
			label: 'Word Through / Terminiation',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Mode',
					choices: self.wordThru_feedback,
					default: respParam.wordThruReturn.wordOutTermOff,
				},
			],
			callback: ({ options }) => {
				return options.mode == self.recorder.wordThru
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.wordThruSelect + sense)
			},
		},
		bitLength: {
			name: 'Bit Length',
			type: 'boolean',
			label: 'Bit Length',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Mode',
					choices: self.bitLength_feedback,
					default: respParam.bitLengthReturn[24],
				},
			],
			callback: ({ options }) => {
				return options.mode == self.recorder.bitLength
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.bitLengthSelect + sense)
			},
		},
		pauseMode: {
			name: 'Pause Mode',
			type: 'boolean',
			label: 'Pause Mode',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Mode',
					choices: self.pause_feedback,
					default: respParam.pauseModeReturn.noSplit,
				},
			],
			callback: ({ options }) => {
				return options.mode == self.recorder.pauseMode
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.pauseModeSelect + sense)
			},
		},
		playMode: {
			name: 'Play Mode',
			type: 'boolean',
			label: 'Play Mode',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Mode',
					choices: self.play_mode,
					default: respParam.playModeReturn.allTake,
				},
			],
			callback: ({ options }) => {
				return options.mode == self.recorder.playMode
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.playModeSense)
			},
		},
		audioOverMarker: {
			name: 'Audio Over Marker',
			type: 'boolean',
			label: 'Audio Over Marker',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Mode',
					choices: self.audioOverMarker_feedback,
					default: respParam.audioOverMarkerReturn.off,
				},
			],
			callback: ({ options }) => {
				return options.mode == self.recorder.audioOverMarker
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.audioOverMarkerSelect + sense)
			},
		},
		timeIntervalMarker: {
			name: 'Time Interval Marker',
			type: 'boolean',
			label: 'Time Interval Marker',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Mode',
					choices: self.timeInternalMarker_feedback,
					default: respParam.timeIntervalMarkerReturn.off,
				},
			],
			callback: ({ options }) => {
				return options.mode == self.recorder.timeIntervalMarker
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.timeInternalMarkerSelect + sense)
			},
		},
		syncUnlockMarker: {
			name: 'Sync Unlock Marker',
			type: 'boolean',
			label: 'Sync Unlock Marker',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Mode',
					choices: self.syncUnlockMarker_feedback,
					default: respParam.syncUnlockMarkerReturn.off,
				},
			],
			callback: ({ options }) => {
				return options.mode == self.recorder.syncUnlockMarker
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.syncUnlockMarkerSelect + sense)
			},
		},
		recFs: {
			name: 'Rec FS',
			type: 'boolean',
			label: 'Record Sample Rate',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Mode',
					choices: self.recFs_feedback,
					default: respParam.recFsReturn[48],
				},
			],
			callback: ({ options }) => {
				return options.mode == self.recorder.recFs
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.recFsSelect + sense)
			},
		},
		fileName: {
			name: 'File Name',
			type: 'boolean',
			label: 'File Name',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Mode',
					choices: self.fileName_feedback,
					default: respParam.fileNameReturn.dateTime,
				},
			],
			callback: ({ options }) => {
				return options.mode == self.recorder.fileName
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.fileNameSelect + sense)
			},
		},
		meterPeakTime: {
			name: 'Meter Peak Time',
			type: 'boolean',
			label: 'Meter Peak Time',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Mode',
					choices: self.meterPeakHoldTime_feedback,
					default: respParam.meterPeakTimeReturn.inf,
				},
			],
			callback: ({ options }) => {
				return options.mode == self.recorder.meterPeakTime
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.meterPeakHoldTimePreset + sense)
			},
		},
		digitalReferenceLevel: {
			name: 'Digital Reference Level',
			type: 'boolean',
			label: 'Digital Reference Level',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Mode',
					choices: self.digitalReferenceLevel_feedback,
					default: respParam.digitalReferenceLevelReturn[18],
				},
			],
			callback: ({ options }) => {
				return options.mode == self.recorder.digitalReferenceLevel
			},
			subscribe: async () => {
				self.addCmdtoQueue(SOM + cmd.digitalReferenceLevelPreset + sense)
			},
		},
	})
}
