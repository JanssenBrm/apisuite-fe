const knex = require('../knex')
const Bookshelf = require('bookshelf')(knex)

Bookshelf.plugin('virtuals')

module.exports = Bookshelf
