module.exports = async function (self) {
	let varList = [
		{ variableId: 'trackNo', name: 'Track Number' },
		{ variableId: 'error', name: 'Error Status' },
		{ variableId: 'caution', name: 'Caution Status' },
	]
	self.setVariableDefinitions(varList)
}
