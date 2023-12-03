//const {} = require('./consts.js')

module.exports = {
	record_mode: [
		{ id: '00', label: 'Record' },
		{ id: '01', label: 'Record Pause' },
		{ id: '02', label: 'Take Split' },
	],
	search_mode: [
		{ id: '00', label: 'Forward - Normal' },
		{ id: '01', label: 'Reverse - Normal' },
		{ id: '10', label: 'Forward - High' },
		{ id: '11', label: 'Reverse - High' },
	],
	skip_mode: [
		{ id: '00', label: 'Track Skip Next' },
		{ id: '01', label: 'Track Skip Previous' },
		{ id: '20', label: 'Mark Skip Next' },
		{ id: '21', label: 'Mark Skip Previous' },
	],
}
