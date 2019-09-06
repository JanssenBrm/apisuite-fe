// todo : rewrite - TEMPORARY implementation for upload to sentia via script

const log = require('../../utils/logger')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const fs = require('fs')
const crypto = require('crypto')
const writeFile = util.promisify(fs.writeFile)
const deleteFile = util.promisify(fs.unlink)

exports = module.exports = {}


/**
 * Run the script to send the cert file to the Sentia
 * @param {String} tempCert - The path to the certiticate
 * @returns {void}
 */
const runSentiaScript = async (tempCert) => {
	try {
		const { stdout, stderr } = await exec('bash import-serial.sh $WAF_IP $WAF_PORT $WAF_USER $WAF_PWD ' + tempCert + ' $WAF_LB_SERVICE')

		log.info(`stdout: ${stdout}`)
		log.error(`stderr: ${stderr}`)

	} catch (err) {
		log.error('runSentiaScript:', err)
		throw err
	}
}

/**
 * Save the certificate and run the script to send the cert file to the Sentia
 * @param {String} cert - The enconded certiticate
 * @returns {void}
 */
exports.sendCertToSentia = async (cert) => {
	let uid = crypto.randomBytes(32).toString('hex')
	let tempCert = '/tmp/cert-' + uid + '.tmp'
	try {
		await writeFile(tempCert, cert)
		await runSentiaScript(tempCert)
		await deleteFile(tempCert)
	} catch(err) {
		log.error('sendCertToSentia:', err)
		throw err
	}
}

/*

 calls to implement :

 // Validations:
 // Check if all arguments are filled
 // Check if WAF endpoint is reachable
 // Check if certificate exists
 // Check if certificate has a serial

 // Get the login token
 curl -X POST "http://${ARG_IP}:${ARG_PORT}/restapi/v3/login" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"password\": \"${ARG_PASSWORD}\", \"username\": \"${ARG_USERNAME}\" }"

 // Get the existing allow/deny clients entries
 curl -X GET "http://${ARG_IP}:${ARG_PORT}/restapi/v3/services/${ARG_LB_SERVICE}/allow-deny-clients" -H 'Accept: application/json' -H 'Content-Type: application/json' -u "${TOKEN}:"

 // logout
 curl -X DELETE http://${ARG_IP}:${ARG_PORT}/restapi/v3/logout -H 'Accept: application/json' -H 'Content-Type: application/json' -u "${TOKEN}:
 */
