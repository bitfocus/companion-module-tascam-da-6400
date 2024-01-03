const { combineRgb } = require('@companion-module/base')

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
					default: '00',
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
					default: '0-00',
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
					default: '0-00',
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
					default: '0701',
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
					default: '0701',
				},
			],
			callback: ({ options }) => {
				return options.mode == self.recorder.repeatMode
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
					default: '0701',
				},
			],
			callback: ({ options }) => {
				return options.mode == self.recorder.remoteLocal
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
					default: '0701',
				},
			],
			callback: ({ options }) => {
				return options.mode == self.recorder.remoteLocal
			},
		},
	})
}
