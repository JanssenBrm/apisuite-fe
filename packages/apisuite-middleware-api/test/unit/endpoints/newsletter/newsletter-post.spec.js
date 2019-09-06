const {afterEach, before, after, describe, it} = exports.lab = require('lab').script()
const {expect} = require('code')
const sinon = require('sinon')
const chance = require('../../../mocks/chance')

const config = require('../../../../src/config/index')
const Hapi = require('hapi')
const server = new Hapi.Server(config.get('server'))


const plugins = [
	require('../../../../src/plugins/newsletter/index'),
]
const emailService = require('../../../../src/services/email/index')

describe('(UNIT) POST /newsletter/subscribe', async () => {

	let sandbox

	before(async () => {
		await server.register(plugins)
		await server.start()
		sandbox = sinon.createSandbox()
		sandbox.stub(emailService, 'sendNewsletter').callsFake(() => {
		})

	})

	after(async () => {
		await server.stop()
	})

	afterEach(() => {
		sandbox.restore()
	})


	describe('Successful request', async () => {

		let error, resp

		before(async () => {

			try {
				resp = await server.inject({
					method: 'POST',
					payload: {email: chance.email()},
					url: '/newsletter/subscribe',
				})

			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should return 200 Ok', () => {
			expect(resp.statusCode).to.equal(200)
		})
	})

	describe('Email not present', async () => {

		let error, resp

		before(async () => {
			try {
				resp = await server.inject({
					method: 'POST',
					payload: {},
					url: '/newsletter/subscribe',
				})

			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should return 400 Bad Request', () => {
			expect(resp.statusCode).to.equal(400)
		})
	})

})
