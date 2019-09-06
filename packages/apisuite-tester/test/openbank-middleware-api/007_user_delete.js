
/* global describe it testVars TEST_VARS */
let chai = require('chai')
let chaiHttp = require('chai-http')

chai.should()
chai.use(chaiHttp)

describe('Openbank Middleware API - Delete user', () => {

	describe('DELETE /users/me', () => {

		it('it should delete the user', (done) => {

			chai
				.request(TEST_VARS.SERVERS['openbank-middleware-api'])
				.delete('/users/me')
				.set('Authorization', 'Bearer ' + testVars.token.access_token)
				.end((err, res) => {
					if (err) return done(err)

					res.should.have.status(204)
					done()
				})
		})
	})

})
