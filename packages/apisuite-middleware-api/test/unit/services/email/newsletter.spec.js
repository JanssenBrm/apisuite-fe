const {afterEach, beforeEach, describe, it} = exports.lab = require('lab').script()
const {expect} = require('code')
const sinon = require('sinon')

const mailerUtil = require('../../../../src/services/email/util')
const emailService = require('../../../../src/services/email')

describe('Newsletter Registration', () => {

	let sandbox

	beforeEach(() => {
		sandbox = sinon.createSandbox()
	})

	afterEach(() => {
		sandbox.restore()
	})

	describe('Send the newsletter', async () => {

		it('Should has sendNewsletter function', async () => {
			expect(emailService.sendNewsletter).to.exist()
		})

		it('Should send the email success', async () => {
			sandbox.stub(mailerUtil, 'send').callsFake(() => {
			})
			const postPayload = {email: 'toto@gmail.com'}
			let error
			try {
				await emailService.sendNewsletter(postPayload)
			} catch (err) {
				error = err
			}
			expect(error).to.be.undefined()
		})

		it('Should send the email error', async () => {
			const mailerUtilSpy = sandbox.stub(mailerUtil, 'send').rejects()
			const postPayload = {}
			let error
			try {
				await emailService.sendNewsletter(postPayload)
			} catch (err) {
				error = err
			}
			sinon.assert.calledOnce(mailerUtilSpy)
			expect(error).to.exist()
		})

	})

})
