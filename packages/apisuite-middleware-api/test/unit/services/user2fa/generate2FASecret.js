const { describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')

const user2faService = require('../../../../src/services/user2fa')

describe('(UNIT) services.user2fa.generate2FASecret', async () => {

	it('Should generate 2FA Secret', async () => {
		const sut = await user2faService.generate2FASecret('base32')
		expect(sut.length).to.be.greaterThan(0)
	})
})
