const { afterEach, before, after, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')

const config = require('../../../../src/config')
const Hapi = require('hapi')
const server = new Hapi.Server(config.get('server'))

const plugins = [
	require('bell'),
	require('hapi-auth-bearer-token'),
	require('../../../../src/plugins/internal/authStrategies'),
	require('../../../../src/plugins/user'),
]

const oauth2Srvc = require('../../../../src/services/oauth2')
const organizationsSrvc = require('../../../../src/services/organization')
const User = require('../../../../src/models/User')

const stubs = {}

describe.skip('(UNIT) GET /users/me', async () => {

	before(async () => {
		await server.register(plugins)
		await server.start()
	})

	after(async () => {
		await server.stop()
	})

	afterEach(async () => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	describe('Successful request', async () => {
		const token = chance.string({ length: 48 })
		let error, resp

		before(async () => {

			const user = new User({
				id: chance.integer({ min: 1, max: 10 }),
				email: chance.email(),
				full_name: chance.name(),
				phone_number: chance.phone(),
				created_at: new Date(),
				updated_at: new Date(),
			}).toJSON()

			stubs.validateBearerToken = stub(oauth2Srvc, 'validateBearerToken')
				.resolves({ user })

			stubs.listUserOrganizations = stub(organizationsSrvc, 'listUserOrganizations')
				.resolves({})

			try {
				resp = await server.inject({
					headers: {
						'authorization': `Bearer ${token}`,
					},
					method: 'GET',
					url: '/users/me',
				})

			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should validate the bearer token', () => {
			expect(stubs.validateBearerToken.calledWith(token)).to.equal(true)
		})

		it('Should return 200 OK', () => {
			expect(resp.statusCode).to.equal(200)
		})
	})
})
