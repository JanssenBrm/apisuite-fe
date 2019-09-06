const Mocha = require('mocha')
const fs = require('fs')
const path = require('path')

exports = module.exports = {}

/**
 * Create the test executor
 * 
 * @param {string} options The Mocha options
 * @returns {Object} Test executor
 */
exports.createTestExecutor = (options) => {
	let testExecutor = new Mocha(options)

	// Get all .js paths and add each file to the mocha instance.
	getTestPaths(testDir).forEach((file) => testExecutor.addFile(path.join(file)))

	return testExecutor
}

const testDir = 'test'

/**
 * Get the list of test files paths.
 * 
 * @param {string} dir The directory to get the test paths from
 * @param {Array} fileList The list of files found
 * @returns {Array} List of test files paths
 */
function getTestPaths(dir, fileList) {
	var files = fs.readdirSync(dir)
	fileList = fileList || []

	files.forEach((file) => {
		if (fs.statSync(path.join(dir, file)).isDirectory()) {
			fileList = getTestPaths(path.join(dir, file), fileList)

		} else {
			fileList.push(path.join(dir, file))
		}
	})

	return fileList.filter((file) => path.extname(file) === '.js')
}

