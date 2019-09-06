/* global describe it TEST_VARS */

let chai = require('chai')
let chaiHttp = require('chai-http')

chai.use(chaiHttp)

describe('Openbank Middleware API - Health', () => {

	describe('GET /healthcheck', () => {
		it('it should return a 200 OK if server is accessible and able to query db', (done) => {
			chai.request(TEST_VARS.SERVERS['openbank-middleware-api'])
				.get('/healthcheck')
				.end((err, res) => {
					if (err) return done(err)

					res.should.have.status(200)
					res.body.should.have.property('status')
					res.body.status.should.equal('OK')
					done()
				})
		})
	})

})
