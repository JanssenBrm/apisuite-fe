const config = require('../../config')
const request = require('request')

exports = module.exports = {}

exports.report = (opts, callback) => {
	if(!config.get('reporters').slack.send) {
		return callback()
	}

	request.post({
		url: config.get('reporters').slack.hook,
		json: true,
		body: {
			attachments: [{
				fallback: (opts.fails > 0) ? 'Failing tests' : 'Tests were successful',
				pretext: 'Tests report',
				title: opts.environment,
				title_link: opts.reportUrl,
				text:(opts.fails > 0) ? 'Some tests were unsucessfull!' : 'All tests ran successfully',
				color: (opts.fails > 0) ? '#ff0000' : '#008000',
			}],
		},
	}, callback)
}
