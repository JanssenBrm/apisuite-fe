const crypto = require('crypto')

const IV_LEN = 16
const NONCE_LEN = 5

/**
 * 
 * @param {String} key				- The 256bits (32 characters) key to encrypt the totp_secret. 
 * @param {String} text 			- The decrypted totp_secret
 * @returns {String}				- Returns the encrypted totp_secret
 */
exports.encrypt = (key, text) => {

	if (!key) throw new Error('key is mandatory')
	if (!text) throw new Error('text is mandatory')

	
	if(typeof key !== 'string') throw new Error('key should be a string')
	if(typeof text !== 'string') throw new Error('text should be a string')

	let nonce = crypto.randomBytes(NONCE_LEN)
	let iv = Buffer.alloc(IV_LEN)
	
	nonce.copy(iv)

	let cipher = crypto.createCipheriv('aes-256-ctr', key, iv)
	
	let enc = cipher.update(text.toString())

	let message = Buffer.concat([nonce, enc, cipher.final()])

	return message.toString('base64')

}

/**
 * 
 * @param {String} key				- The 256bits (32 characters) key to decrypt the totp_secret. 
 * @param {String} text 			- The encrypted totp_secret
 * @returns {String}				- Returns the decrypted totp_secret
 */
exports.decrypt = (key, text) => {
	
	if (!key) throw new Error('key is mandatory')
	if (!text) throw new Error('text is mandatory')

	
	if(typeof key !== 'string') throw new Error('key should be a string')
	if(typeof text !== 'string') throw new Error('text should be a string')

	let msg = Buffer.from(text, 'base64')
	let iv = Buffer.alloc(IV_LEN)
	
	msg.copy(iv,0,0, NONCE_LEN)
	
	let enc = msg.slice(NONCE_LEN)
	let decipher = crypto.createDecipheriv('aes-256-ctr', key, iv)
	let dec = decipher.update(enc)

	try {
		dec = Buffer.concat([dec, decipher.final()])
		const retval = dec.toString()
		return retval
	} catch (err) {
		throw err
	}
}
