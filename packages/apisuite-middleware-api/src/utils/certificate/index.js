const forge = require('node-forge')
const logger = require('../logger')

/**
 * Decoded the base64 certificate into string
 * @param {String} base64Cert - The base 64 binary (certificate)
 * @returns {String} - The decoded certificate
 */
const base64ToCert = (base64Cert) => {
	const p12Der = forge.util.decode64(base64Cert)
	const p12Asn1 = forge.asn1.fromDer(p12Der)
	const cert = forge.pki.certificateFromAsn1(p12Asn1)
	return forge.pki.certificateToPem(cert)
}

/**
 * Get the parsed certificate as an object
 * @param {String} cert The certificate as a String
 * @returns {Object} The parsed certificate object
 */
const getParsedCertificate = (cert) => {
	return forge.pki.certificateFromPem(`${cert}`)
}

/**
 * Get the expiration date of the certificate
 * @param {String} cert The certificate as a String
 * @returns {Object} The parsed certificate object
 */
const getCertificateExpiration = (cert) => {
	return getParsedCertificate(cert).validity.notAfter
}

/**
 * Check if the certificate is valid
 * @param {String} cert - The certificate to validate
 * @returns {Boolean} - If it's valid or not
 */
const validateCertificate = (cert) => {
	let certificate = getParsedCertificate(cert)
	const currDate = new Date()

	if (certificate.validity.notAfter < currDate) {
		logger.error('The certificate has expired.')
		return false
	}

	return true
}

module.exports = {
	base64ToCert,
	getParsedCertificate,
	getCertificateExpiration,
	validateCertificate,
}
