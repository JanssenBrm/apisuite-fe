const fs = require('fs')
const path = require('path')
const uuid = require('uuid/v4')
const jwt = require('jsonwebtoken')
const config = require('../../config')

/** Private certificate used for signing JSON WebTokens */
const privateKey = fs.readFileSync(path.join(__dirname, 'certs/private_key.pem'))

/** Public certificate used for verification */
const publicKey = fs.readFileSync(path.join(__dirname, 'certs/certificate.pem'))

// sign with RSA SHA256
exports.createToken = (options) => {
	let expOpt = options.exp || 3600
	const sub = options.sub || ''
	const exp = Math.floor(Date.now() / 1000) + expOpt

	const token = jwt.sign(
		{
			jti: options.jti || uuid(),
			sub,
			exp,
		},
		{
			key: privateKey,
			passphrase: config.get('oauth2').passphrase,
		},
		{
			algorithm: 'RS256',
		})

	return { token, expires: exp }
}

exports.verifyToken = (token) => jwt.verify(token, publicKey)

exports.decode = (token) => jwt.decode(token)
