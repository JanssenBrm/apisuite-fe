/* global describe before it testVars TEST_VARS */

const chai = require('chai')
const chaiHttp = require('chai-http')
const chance = require('../../lib/utils/chance')
const twilioClient = require('../../lib/twilio')
const gmail = require('../../lib/gmail')
const url = require('url')
const async = require('async')
const config = require('../../config')

chai.should()
chai.use(chaiHttp)

describe('Openbank Middleware API - User Registration', () => {
	// eslint-disable-next-line no-global-assign
	testVars = {}

	describe('POST /users_registration/user_details', () => {

		before((done) => {
			twilioClient.messages.list({
				from: config.get('twilio').senderTestNumber,
				to: config.get('twilio').receiverTestNumber,
			}, (err, messages) => {
				if (err) return done(err)

				async.each(messages, (msg, cb) => msg.remove(cb), done)
			})
		})

		it('it should register the user details', (done) => {

			testVars.user = {
				email: 'openbank.tester+' + chance.string({ pool: '01234566789', length: 20 }) +'@gmail.com',
				fullName: chance.name(),
				phoneNumber: config.get('twilio').receiverTestNumber,
			}

			chai
				.request(TEST_VARS.SERVERS['openbank-middleware-api'])
				.post('/users_registration/user_details')
				.send(testVars.user)
				.end((err, res) => {
					if (err) return done(err)

					res.should.have.status(200)
					res.body.should.be.a('object')
					res.body.should.have.property('token')
					res.body.token.should.be.a('string')
					res.body.token.should.not.be.empty
					res.body.should.have.property('expiresAt')
					res.body.expiresAt.should.be.a('number')
					res.body.expiresAt.should.be.above(Date.now())

					testVars.registrationToken = res.body
					done()
				})
		})
	})

	describe('POST /users_registration/organization_details', () => {
		it('it should register the user organization details', (done) => {

			testVars.organization = {
				name: chance.company(),
				vat: chance.string({ min: 10, max: 20, pool: '1234567890' }),
				website: chance.url(),
				role: chance.profession(),
			}

			chai
				.request(TEST_VARS.SERVERS['openbank-middleware-api'])
				.post('/users_registration/organization_details')
				.set('Authorization', 'Bearer ' + testVars.registrationToken.token)
				.send(testVars.organization)
				.end((err, res) => {
					if (err) return done(err)

					res.should.have.status(204)
					done()
				})
		})
	})

	describe('POST /users_registration/sms_code', () => {

		it('it should send an sms with the 2fa activation code', (done) => {
			chai
				.request(TEST_VARS.SERVERS['openbank-middleware-api'])
				.post('/users_registration/sms_code')
				.set('Authorization', 'Bearer ' + testVars.registrationToken.token)
				.end((err, res) => {
					if (err) return done(err)

					res.should.have.status(200)
					done()
				})
		})
	})

	describe('POST /users_registration/security_details', () => {

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
			// 			if (!result || result.length === 0) return done(new Error('SMS not received (1)'))
						
			// 			// Pick most recent one
			// 			const lastMessage = result.pop()

			// 			if (!lastMessage || !lastMessage.body)
			// 				return done(new Error('SMS not received (2)'))
						
			// 			code = lastMessage.body
			// 			done()
			// 		})
			// 	})
			// }, 5000)
		})

		it('it should add the security details to user registration', (done) => {
			testVars.user.password = `${chance.string({ length: 8 })}.${chance.string({ length: 2, pool: '0123456789' })}.${chance.string({ length: 2, pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' })}`

			chai
				.request(TEST_VARS.SERVERS['openbank-middleware-api'])
				.post('/users_registration/security_details')
				.set('Authorization', 'Bearer ' + testVars.registrationToken.token)
				.send({
					password: testVars.user.password,
					method: 'authorizationSms',
					confirmationCode: code,
				})
				.end((err, res) => {
					if (err) return done(err)

					res.should.have.status(200)
					res.body.should.be.a('object')

					res.body.should.have.property('user')
					res.body.user.should.be.a('object')
					res.body.user.should.not.be.empty

					res.body.should.have.property('codes')
					res.body.codes.should.be.a('array')
					done()
				})
		})

		it('it should send an activation email to user', (done) => {
			setTimeout(() => {
				gmail.getLastMessage((err, email) => {
					if (err) return done(err)
					
					// eslint-disable-next-line no-useless-escape
					const activationLink = email.match(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm)
					const parsedUrl = url.parse(activationLink[1])
					chai.expect(activationLink[1]).to.not.be.empty

					testVars.activationUrl = parsedUrl
					done()
				})
			}, 12000)
		}).timeout(20000)
	})

	describe('GET /users/confirmation_ticket', () => {
		it('it should activate the user', done => {
			//console.log(testVars.activationUrl.protocol + '//' + testVars.activationUrl.host + testVars.activationUrl.path)
			chai
				.request(testVars.activationUrl.protocol + '//' + testVars.activationUrl.host)
				.get(testVars.activationUrl.path)
				.end((err, res) => {
					if (err) return done(err)

					res.should.have.status(200)
					done()
				})
		})
	})
})
