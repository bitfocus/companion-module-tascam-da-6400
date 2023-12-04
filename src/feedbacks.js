const { combineRgb } = require('@companion-module/base')

module.exports = async function (self) {
	self.setFeedbackDefinitions({
		mechaStatus: {
			name: 'Status',
			type: 'boolean',
			label: 'Status',
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
				return options.status == this.recoder.mechaStatus ? true : false
			},
		},
	})
}
