/* global describe it testVars TEST_VARS */
let chai = require('chai')
let chaiHttp = require('chai-http')
const chance = require('../../lib/utils/chance')

chai.should()
chai.use(chaiHttp)

describe('Openbank Middleware API - Organization Sandbox Apps', () => {

	describe('POST /organizations/{org_id}/sandbox-apps', () => {

		it('it should create a sandbox app', (done) => {
			const app = {
				name: chance.word(),
				description: chance.sentence(),
			}

			chai
				.request(TEST_VARS.SERVERS['openbank-middleware-api'])
				.post('/organizations/' + testVars.me.organizations[0].id + '/sandbox-apps')
				.set('Authorization', 'Bearer ' + testVars.token.access_token)
				.send(app)
				.end((err, res) => {
					if (err) return done(err)

					res.should.have.status(201)

					res.body.should.be.a('object')
					res.body.should.have.property('id')
					res.body.should.have.property('clientId')
					res.body.should.have.property('ownerId')
					res.body.ownerId.should.equal(testVars.me.id)
					res.body.should.have.property('organizationId')
					res.body.organizationId.should.equal(testVars.me.organizations[0].id)
					res.body.should.have.property('clientSecret')
					res.body.should.have.property('redirectURLs')
					res.body.should.have.property('grants')
					res.body.should.have.property('createdAt')
					res.body.should.have.property('updatedAt')
					testVars.app = res.body
					done()
				})
		})
	})

	describe('GET /organizations/{org_id}/sandbox-apps', () => {

		it('it should list the organization sandbox apps', (done) => {

			chai
				.request(TEST_VARS.SERVERS['openbank-middleware-api'])
				.get('/organizations/' + testVars.me.organizations[0].id + '/sandbox-apps')
				.set('Authorization', 'Bearer ' + testVars.token.access_token)
				.end((err, res) => {
					if (err) return done(err)

					res.should.have.status(200)
					res.body.should.be.a('array')
					done()
				})
		})
	})

	describe('GET /organizations/{org_id}/sandbox-apps/{app_id}', () => {

		it('it should retrieve the created sandbox app', (done) => {

			chai
				.request(TEST_VARS.SERVERS['openbank-middleware-api'])
				.get('/organizations/' + testVars.me.organizations[0].id + '/sandbox-apps/' + testVars.app.id)
				.set('Authorization', 'Bearer ' + testVars.token.access_token)
				.end((err, res) => {
					if (err) return done(err)

					res.should.have.status(200)
					res.body.should.be.a('object')

					res.body.should.have.property('id')
					res.body.id.should.equal(testVars.app.id)
					res.body.should.have.property('clientId')
					res.body.should.have.property('ownerId')
					res.body.ownerId.should.equal(testVars.me.id)
					res.body.should.have.property('organizationId')
					res.body.organizationId.should.equal(testVars.me.organizations[0].id)
					res.body.should.have.property('clientSecret')
					res.body.should.have.property('redirectURLs')
					res.body.should.have.property('grants')
					res.body.should.have.property('createdAt')
					res.body.should.have.property('updatedAt')
					done()
				})
		})
	})

	describe('DELETE /organizations/{org_id}/sandbox-apps/{app_id}', () => {

		it('it should delete the sandbox app', (done) => {

			chai
				.request(TEST_VARS.SERVERS['openbank-middleware-api'])
				.delete('/organizations/' + testVars.me.organizations[0].id + '/sandbox-apps/' + testVars.app.id)
				.set('Authorization', 'Bearer ' + testVars.token.access_token)
				.end((err, res) => {
					if (err) return done(err)

					res.should.have.status(204)
					done()
				})
		})
	})

})
