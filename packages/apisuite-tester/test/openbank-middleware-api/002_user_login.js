/* global describe before it testVars TEST_VARS */
let chai = require('chai')
let chaiHttp = require('chai-http')
const twilioClient = require('../../lib/twilio')
const async = require('async')
const config = require('../../config')

chai.should()
chai.use(chaiHttp)

describe('Openbank Middleware API - User Login', () => {

	describe('POST /oauth2/token', () => {

		it('it should create a new access token', (done) => {

			chai
				.request(TEST_VARS.SERVERS['openbank-middleware-api'])
				.post('/oauth2/token')
				.auth('cl0ud0k001', 'Sup3rs3cr3tP4SSw0rd')
				.set('Content-Type', 'application/x-www-form-urlencoded')
				.send({
					username: testVars.user.email,
					password: testVars.user.password,
					grant_type: 'password',
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

					res.body.should.have.property('two_factor_authentication')
					res.body.two_factor_authentication.should.be.true

					res.body.should.have.property('two_factor_authentication_method')
					res.body.two_factor_authentication_method.should.be.a('string')
					res.body.two_factor_authentication_method.should.equal('authorizationSms')

					testVars.tfatoken = res.body
					done()
				})
		})
	})

	describe('POST /oauth2/tfa', () => {

		let code

		before((done) => {
			SMS_LISTENER.getSMS((data) => {
				// we have the sms from the webhook
				code = data.sms
				SMS_LISTENER.removeListener()
				done()
			})
			// setTimeout(() => {
			// 	twilioClient.messages.list({
			// 		from: config.get('twilio').senderTestNumber,
			// 		to: config.get('twilio').receiverTestNumber,
			// 	}, (err, messages) => {
			// 		if (err) return done(err)
			// 		// Sort by creation date
			// 		async.sortBy(messages, (msg, cb) => cb(null, new Date(msg.dateCreated)), (err, result) => {
			// 			if (err) return done(err)

			// 			// Pick most recent one
			// 			code = result.pop().body
			// 			done()
			// 		})
			// 	})
			// }, 5000)
		})

		it('it should validate user 2fa', (done) => {
			chai
				.request(TEST_VARS.SERVERS['openbank-middleware-api'])
				.post('/oauth2/tfa')
				.set('Authorization', 'Bearer ' + testVars.tfatoken.access_token)
				.send({
					pass: code,
				})
				.end((err, res) => {
					if (err) return done(err)

					//console.log(res.body)
					res.should.have.status(200)
					res.body.should.be.a('object')

					res.body.should.have.property('token_type')
					res.body.token_type.should.be.a('string')
					res.body.token_type.should.equal('bearer')

					res.body.should.have.property('access_token')
					res.body.access_token.should.be.a('string')
					res.body.access_token.should.not.be.empty

					res.body.should.have.property('expires_in')
					res.body.expires_in.should.be.a('number')

					testVars.token = res.body
					done()
				})
		})
	})

	describe('GET /users/me', () => {
		it('user should be logged in', (done) => {

			chai
				.request(TEST_VARS.SERVERS['openbank-middleware-api'])
				.get('/users/me')
				.set('Authorization', 'Bearer ' + testVars.token.access_token)
				.end((err, res) => {
					if (err) return done(err)

					res.should.have.status(200)
					res.body.should.have.property('id')
					res.body.should.have.property('email')
					res.body.should.have.property('fullName')
					res.body.should.have.property('phone')
					testVars.me = res.body
					done()
				})
		})
	})

})
