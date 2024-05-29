const { Regex } = require('@companion-module/base')
const { InstanceStatus } = require('@companion-module/base')

module.exports = {
	async configUpdated(config) {
		this.config = config
		this.updateStatus(InstanceStatus.Connecting)
		this.initTCP()
		this.initVariables()
		this.updateActions()
		this.updateFeedbacks()
		this.updateVariableDefinitions()
		this.updatePresetsDefinitions()
	},
	// Return config fields for web config
	getConfigFields() {
		return [
			{
				type: 'textinput',
				id: 'host',
				label: 'Host',
				width: 12,
				regex: Regex.HOSTNAME,
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'Port',
				width: 6,
				regex: Regex.PORT,
				default: 23,
				tooltip: 'Port is not configurable on unit, only change in advanced configurations',
			},
			{
				type: 'textinput',
				id: 'password',
				label: 'Password',
				width: 6,
				default: 'DA-6400',
				regex: '/^.{0,10}$/',
				tooltip: 'Password may be up to 10 characters in length',
			},
		]
	},
}
