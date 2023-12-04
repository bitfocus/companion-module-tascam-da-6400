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
		repeat_mode: {
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
		remoteLocal_mode: {
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
		play_mode: {
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
		mark_set: {
			name: 'Mark Set',
			description: 'Mark Set',
			options: [],
			callback: async () => {
				self.addCmdtoQueue(SOM + cmd.markSet + '01')
			},
			//learn: async () => {},
			//subscribe: async () => {},
		},
	})
}
