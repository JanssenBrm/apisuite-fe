const Bookshelf = require('../utils/bookshelf')

Bookshelf.plugin('visibility')
Bookshelf.plugin('pagination')

var ModelBase = require('bookshelf-modelbase')(Bookshelf)

module.exports = ModelBase
