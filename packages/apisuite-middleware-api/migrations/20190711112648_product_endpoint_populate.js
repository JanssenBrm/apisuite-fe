const apiDocsSrvc = require('../src/services/apiDocs')

exports.up = async function(knex) {

	const apidocs = await knex.select('id','swagger')
		.from('api_docs')

	apidocs.map(async api => {
		await apiDocsSrvc.parseSwagger(api.id, JSON.parse(api.swagger))
	})

	return knex.select('id').from('product_endpoint')
}

exports.down = function(knex) {
	return knex('product_endpoint').del() 
}
