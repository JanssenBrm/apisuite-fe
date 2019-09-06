const { afterEach, before, after, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const chance = require('../../../mocks/chance')

const config = require('../../../../src/config')
const Hapi = require('hapi')
const server = new Hapi.Server(config.get('server'))

const testPlugin = {
	register: (server) => {
		server.route([
			{
				method: 'GET',
				path: '/test/{organizationId}/info',
				options: {
					handler: async (request, h) => {

						return h.response({ msg: 'OK' }).code(200)
					},
					plugins: {
						'openbank-rbac': {
							roles: ['DEVELOPER', 'SALES'],
							mode: 'oneOf',
						},
					},
					auth: {
						strategy: 'test-rbac-strategy',
					},
				},
			},
		])
	},
	name: 'test-plugin-route',
}

server.auth.scheme('mock', (server, options) => {
	return {
		authenticate: (request, h) => {
			return h.authenticated({
				credentials: options,
			})  
		},
	}
})

server.auth.strategy('test-rbac-strategy', 'mock', 
	{ user: {id: 1}, 
		roles : [
			{ role: 'SALES', organizationId: 1 },
		],
	})

const plugins = [
	require('../../../../src/plugins/internal/rbac'),
	testPlugin,
]

const stubs = {}

describe('(UNIT) GET /users/me', async () => {

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

			try {
				resp = await server.inject({
					headers: {
						'authorization': `Bearer ${token}`,
					},
					method: 'GET',
					url: '/test/1/info',
				})

			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should return status code 200', () => {
			expect(resp.statusCode).to.be.equal(200)
		})
    
	})
})
