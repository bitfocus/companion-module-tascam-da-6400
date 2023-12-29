module.exports = async function (self) {
	let varList = [
		{ variableId: 'trackNo', name: 'Track Number' },
		{ variableId: 'trackTime', name: 'Track Time' },
		{ variableId: 'trackTimeHours', name: 'Track Time: Hours' },
		{ variableId: 'trackTimeMinutes', name: 'Track Time: Minutes' },
		{ variableId: 'trackTimeSeconds', name: 'Track Time: Seconds' },
		{ variableId: 'trackTimeFrames', name: 'Track Time: Frames' },
		{ variableId: 'error', name: 'Error Status' },
		{ variableId: 'caution', name: 'Caution Status' },
	]
	self.setVariableDefinitions(varList)
}
