/* global TEST_VARS */
const fs = require('fs')
const async = require('async')
const runner = require('./runner')
const slack = require('./slack')
const { join } = require('path')
const rimraf = require('rimraf')
const config = require('../config')
const smsListener = require('./utils/smsListener')

exports = module.exports = {}

const envs = []

/**
 * Run the scheduler
 * 
 * @returns {void}
 */
function run() {
	async.eachSeries(envs, (env, callback) => {
		// eslint-disable-next-line no-global-assign
		TEST_VARS = {}
		SMS_LISTENER = smsListener

		Object.keys(require.cache).forEach(( file ) => delete require.cache[file])

		const reportDir = 'reports/' + env.path + '/' + Math.floor(Date.now() / 1000)

		const task = runner.createTestExecutor({
			timeout: 10000,
			recursive: true,
			//quiet: true,
			//bail: true, For the moment this flag cant be used as it has an issue that will only be fixed in next mocha release
			reporter: 'mochawesome',
			reporterOptions: {
				reportFilename: 'results',
				reportDir,
				reportTitle: env.name,
				reportPageTitle: env.name,
				showFailed: true,
				showPassed: true,
			},
		})

		TEST_VARS.SERVERS = env.servers

		task.run(fails => {
			slack.report({
				fails,
				environment: env.name,
				reportUrl: config.get('publicHost') + '/tests/' + reportDir + '/results.html',
			}, (err) => {
				cleanOldReports(env.path)
				delete TEST_VARS.SERVERS
				SMS_LISTENER.removeListener()
				callback()
			})
		})
	},
	(err) => setTimeout(run, 86400000/config.get('testsRunTimes')))
}

/**
 * Remove old reports
 * 
 * @param {String} environmentPath The env path
 * @returns {void}
 */
function cleanOldReports(environmentPath) {

	// eslint-disable-next-line require-jsdoc
	const isDirectory = source => fs.lstatSync(source).isDirectory()
	// eslint-disable-next-line require-jsdoc
	const getDirectories = source => fs.readdirSync(source).map(name => join(source, name))
		.filter(isDirectory)
		.sort()
		.reverse()

	const dirs = getDirectories('reports/' + environmentPath)

	let exceeder = config.get('maxReportHistoryPerEnv') - dirs.length

	if (exceeder < 0) {
		for (let i = config.get('maxReportHistoryPerEnv'); i != config.get('maxReportHistoryPerEnv') + exceeder; --i) {
			rimraf.sync('./' + dirs[i])
		}
	}
}

exports.create = () => {
	for (let env in config.get('environments')) {
		const environment = config.get('environments')[env]

		if (environment.watcher) envs.push(config.get('environments')[env])
	}

	run()
}
