const { afterEach, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')

const user2faService = require('../../../../src/services/user2fa')
const cryptoUtils = require('../../../../src/utils/crypto')
const config = require('../../../../src/config')

const stubs = {}

describe('(UNIT) services.userRegistration.generateQRCode', async () => {

	afterEach(() => {
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	it('Should generate QR Code from user email and secret', async () => {

		const email = 'user@cloudoki.com'
		const secret = cryptoUtils.encrypt(config.get('twoFactor').totp_encryption_key, 'I5LTGKSXIAYUKY3OMJIDAQTBEY7WOVJYJFCEC3BYHNSEUVZ4INNQ')
		const encoding = 'base32'
		const issuer = 'Appcenter'

		const sut = await user2faService.generateQRCode(email, secret, encoding, issuer)

		expect(sut).to.startsWith('data:image/png;base64')
	})
})
