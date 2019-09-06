/* global describe it testVars TEST_VARS */
const chai = require('chai')
const chaiHttp = require('chai-http')
const chance = require('../../lib/utils/chance')

chai.should()
chai.use(chaiHttp)

describe('Openbank Middleware API - User Organizations', () => {

	describe('GET /organizations', () => {
		it('it should return a 200 OK if we get the user organizations', (done) => {
			chai
				.request(TEST_VARS.SERVERS['openbank-middleware-api'])
				.get('/organizations')
				.set('Authorization', 'Bearer ' + testVars.token.access_token)
				.end((err, res) => {
					if (err) return done(err)

					res.should.have.status(200)
					res.body.should.be.a('array')
					res.body.every((org) => org.should.be.a('object')
						&& org.should.have.property('id')
						&& org.id.should.be.a('number'))

					testVars.organizations = res.body
					done()
				})
		})
	})

	describe('PUT /organizations/{id}', () => {
		it('it should return a 200 OK if the organization was updated properly', (done) => {
			testVars.organization = {
				id: chance.pickone(testVars.organizations).id,
				name: chance.company(),
				vat: chance.string({ min: 10, max: 20, pool: '1234567890' }),
				description: chance.sentence(),
				policyUrl: chance.url({ path: 'policy' }),
				logoUrl: chance.url({extensions: ['gif', 'jpg', 'png']}),
			}

			chai.request(TEST_VARS.SERVERS['openbank-middleware-api'])
				.put(`/organizations/${testVars.organization.id}`)
				.set('Authorization', 'Bearer ' + testVars.token.access_token)
				.send({
					name: testVars.organization.name,
					vat: testVars.organization.vat,
					description: testVars.organization.description,
					policyUrl: testVars.organization.policyUrl,
					logoUrl: testVars.organization.logoUrl,
				})
				.end((err, res) => {
					if (err) return done(err)

					res.should.have.status(200)

					res.body.should.be.a('object')
					res.body.should.have.property('id')
					res.body.id.should.equal(testVars.organization.id)
					res.body.should.have.property('name')
					res.body.name.should.equal(testVars.organization.name)
					res.body.should.have.property('vat')
					res.body.vat.should.equal(testVars.organization.vat)
					res.body.should.have.property('description')
					res.body.description.should.equal(testVars.organization.description)
					res.body.should.have.property('policyUrl')
					res.body.policyUrl.should.equal(testVars.organization.policyUrl)
					res.body.should.have.property('logoUrl')
					res.body.logoUrl.should.equal(testVars.organization.logoUrl)
					res.body.should.have.property('state')
					res.body.state.should.be.a('string')
					res.body.state.should.not.be.empty
					
					done()
				})
		})
	})

	describe('GET /organizations/{orgId}/products', () => {
		it('it should return a 200 OK if we get the list of organization product subscriptions', (done) => {
			chai.request(TEST_VARS.SERVERS['openbank-middleware-api'])
				.get(`/organizations/${testVars.organization.id}/products`)
				.set('Authorization', 'Bearer ' + testVars.token.access_token)
				.end((err, res) => {
					if (err) return done(err)

					res.should.have.status(200)
					res.body.should.be.a('object')
					res.body.should.have.property('products')
					res.body.products.should.be.a('array')
					res.body.products.every((prod) => prod.should.be.a('object')
						&& prod.should.have.property('id')
						&& prod.id.should.be.a('number'))
					res.body.should.have.property('brands')
					res.body.brands.should.be.a('array')
					res.body.brands.every((brand) => brand.should.be.a('object')
						&& brand.should.have.property('id')
						&& brand.id.should.be.a('number'))

					testVars.userProducts = res.body.products
					done()
				})
		})
	})

	describe('GET /products', () => {
		it('it should return a 200 OK if we get the list of products', (done) => {
			chai.request(TEST_VARS.SERVERS['openbank-middleware-api'])
				.get('/products')
				.query({page: 1, pageSize: 20})
				.end((err, res) => {
					if (err) return done(err)

					res.should.have.status(200)
					res.body.should.be.a('object')
					res.body.should.have.property('products')
					res.body.products.should.be.a('array')
					res.body.products.every((prod) => prod.should.be.a('object')
						&& prod.should.have.property('id')
						&& prod.id.should.be.a('number'))
					res.body.should.have.property('brands')
					res.body.brands.should.be.a('array')
					res.body.brands.every((brand) => brand.should.be.a('object')
						&& brand.should.have.property('id')
						&& brand.id.should.be.a('number'))

					testVars.products = res.body.products
					done()
				})
		})
	})

	describe('POST /organizations/{orgId}/products', () => {
		it('it should return a 200 OK if we create a organization subscription', (done) => {
			const prodIds = testVars.products.map((prod) => prod.id)
			const productIds = chance.pickset(prodIds, chance.integer({ min: 1, max: prodIds.length }))

			chai.request(TEST_VARS.SERVERS['openbank-middleware-api'])
				.post(`/organizations/${testVars.organization.id}/products`)
				.set('Authorization', 'Bearer ' + testVars.token.access_token)
				.send({ productIds })
				.end((err, res) => {
					if (err) return done(err)

					res.should.have.status(201)
					res.body.should.be.a('object')
					res.body.should.have.property('products')
					res.body.products.should.be.a('array')
					res.body.products.every((prod) => prod.should.be.a('object')
						&& prod.should.have.property('id')
						&& prod.id.should.be.a('number'))

					testVars.products = res.body
					done()
				})
		})
	})

	// TODO may need a sandbox to have the data needed for this to run so this need admin first
	// describe('GET /organizations/{organizationId}/testdata', () => {
	// 	it('it should return a 200 OK if we get the list of PSUs', (done) => {
	// 		chai.request(TEST_VARS.SERVERS['openbank-middleware-api'])
	// 			.get(`/organizations/${testVars.organization.id}/testdata`)
	// 			.set('Authorization', 'Bearer ' + testVars.token.access_token)
	// 			.end((err, res) => {
	//		 		if (err) return done(err)
	// 				res.should.have.status(200)
	// 				console.log(res.body, typeof res.body)
	// 				done()
	// 			})
	// 	})
	// })

})
