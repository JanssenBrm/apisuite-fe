/* global describe it testVars TEST_VARS */
const chai = require('chai')
const chaiHttp = require('chai-http')
const chance = require('../../lib/utils/chance')

chai.should()

chai.use(chaiHttp)

describe('Openbank Middleware API - User Recovery Codes', () => {

	describe('POST /users/me/recovery_codes', () => {
		let code
		before((done) => {
			SMS_LISTENER.getSMS((data) => {
				// we have the sms from the webhook
				code = data.sms
				SMS_LISTENER.removeListener()
				done()
			})
			chai.request(TEST_VARS.SERVERS['openbank-middleware-api'])
				.get('/users/me/sms_code')
				.set('Authorization', 'Bearer ' + testVars.token.access_token)
				.end((err) => {
					if (err) return done(err)
				})
		})

		it('it should return a 200 OK if we get the codes', (done) => {
			chai.request(TEST_VARS.SERVERS['openbank-middleware-api'])
				.post('/users/me/recovery_codes')
				.set('Authorization', 'Bearer ' + testVars.token.access_token)
				.send({
					pass: code,
				})
				.end((err, res) => {
					if (err) return done(err)

					res.should.have.status(200)
					res.body.should.be.a('object').that.have.property('codes')
					res.body.codes.should.be.a('array')
					res.body.codes.every((c) => c.should.be.a('string'))

					testVars.recoveryCodes = res.body
					done()
				})
		})
	})

	describe('POST /users/me/recovery_codes/verify', () => {
		it('it should return a 200 OK if the code validates', (done) => {
			chai.request(TEST_VARS.SERVERS['openbank-middleware-api'])
				.post('/users/me/recovery_codes/verify')
				.set('Authorization', 'Bearer ' + testVars.tfatoken.access_token)
				.send({
					code: chance.pickone(testVars.recoveryCodes.codes),
				})
				.end((err, res) => {
					if (err) return done(err)

					res.should.have.status(200)
					res.body.should.be.a('object')
					
					res.body.should.have.property('token_type')
					res.body.token_type.should.be.a('string')
					res.body.token_type.should.equal('bearer')

					res.body.should.have.property('access_token')
					res.body.access_token.should.be.a('string')
					res.body.access_token.should.not.be.empty

					testVars.token = res.body

					done()
				})
		})
	})

})
