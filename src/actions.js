//const { Regex } = require('@companion-module/base')
const { SOM, cmd } = require('./consts.js')

module.exports = function (self) {
	self.setActionDefinitions({
		stop: {
			name: 'Stop',
			description: '',
			options: [],
			callback: async () => {
				self.addCmdtoQueue(SOM + cmd.stop)
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		play: {
			name: 'Play',
			description: '',
			options: [],
			callback: async () => {
				self.addCmdtoQueue(SOM + cmd.play)
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		record: {
			name: 'Record',
			description: '',
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
				self.addCmdtoQueue(SOM + cmd.play + options.mode)
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		pause: {
			name: 'Pause',
			description: '',
			options: [],
			callback: async () => {
				self.addCmdtoQueue(SOM + cmd.pause + '01')
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
		search: {
			name: 'Search',
			description: '',
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
			description: '',
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
	})
}
