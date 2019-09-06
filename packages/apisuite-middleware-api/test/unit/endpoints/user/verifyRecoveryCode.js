const { afterEach, before, after, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('chance').Chance()

const config = require('../../../../src/config')
const Hapi = require('hapi')
const server = new Hapi.Server(config.get('server'))

const plugins = [
	require('bell'),
	require('hapi-auth-bearer-token'),
	require('../../../../src/plugins/userRegistration'),
	require('../../../../src/plugins/internal/authStrategies'),
	require('../../../../src/plugins/user'),
]

const user2faService = require('../../../../src/services/user2fa')

const stubs = {}

describe.skip('(UNIT) GET /users/me/recovery_codes/verify', async () => {

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

	describe('Successful response', async () => {
		const userID = chance.guid({ version: 4 })
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4YTQ1YzM3ZS05NjZmLTQ1YjYtOTFmMi0xM2I3YjcwNDYyZjQiLCJzdWIiOjEsImV4cCI6MTU0NDQ2Mjk5NywiaWF0IjoxNTM2NTcyOTk3fQ.aLQf41mkqkEXLV5iAt54htzsXKWIIgYWwH8e43MRVhtPkQmBt-BrVM2Xsgs4Nlk6Vq8gJKlQFxQVMuuqDUclRLs_38DnfwA5m67t5vDJx_e9nICyIaUMhtod5Le0pQFtxLv2pAdlKA726AlmimlUQwKN9vFrBuctflWU_mvDfkiv_9Aj41IHbLJJnEVOpMpR8fcglOv3FbRDiudGpCclG3VagwyPasz671-TViOUUv3kr0EgVawo66t9EAbrUxi46H5SI4VbnIVBCBfsUVCgrywefPwqNawj-KcNhjk57-X4iB__8HAdDi5x-Y2bFztRdKd3gs2_1Rgk5JrOFE1234',
		}
		const codesStub = [
			{
				id: 1,
				userID: userID,
				code: user2faService.formattedUUID(),
			},
		]

		let error, resp

		before(async () => {
			stubs.getUserRecoveryCodes = stub(user2faService, 'getUserRecoveryCodes')
				.resolves({})

			stubs.verifyRecoveryCode = stub(user2faService, 'verifyRecoveryCode')
				.resolves(undefined)

			try {
				resp = await server.inject({
					method: 'POST',
					url: '/users/me/recovery_codes/verify',
					headers,
					payload: {
						code: codesStub[0].code,
					},
				})
			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it.skip('Should return 200 OK', () => {
			expect(resp.statusCode).to.equal(200)
		})
	})


	describe('Code invalid', async () => {
		let error, resp

		before(async () => {

			stubs.generateUserRecoveryCodes = stub(user2faService, 'generateUserRecoveryCodes')
				.resolves({})

			stubs.verifyRecoveryCode = stub(user2faService, 'verifyRecoveryCode')
				.resolves({})

			try {
				resp = await server.inject({
					method: 'POST',
					url: '/users/me/recovery_codes/verify',
					payload: {
						code: 'code-stub-invalid',
					},
				})

			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should return 401 Unauthorized', () => {
			expect(resp.statusCode).to.equal(401)
		})
	})
})
