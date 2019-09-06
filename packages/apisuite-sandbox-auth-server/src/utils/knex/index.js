const config = require('../../../knexfile')['default']

const knex = require('knex')(config)

/**
 * Knex query builder. Framework for building mysql queries
 * @module utils/knex
 */

/** Exposes knex */
module.exports = knex
