const config = require('../../../knexfile')['default']

const mockKnex = require('mock-knex')
let knex = require('knex')(config)

if (process.env.APISUITE_MIDDLEWARE_API_RUNNING_TESTS) {
	// mock knex when running tests
	mockKnex.mock(knex, 'knex@0.14.6')
}

/**
 * Knex query builder. Framework for building mysql queries
 * @module utils/knex
 */

/** Exposes knex */
module.exports = knex
