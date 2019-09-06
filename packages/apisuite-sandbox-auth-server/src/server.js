const hapi = require('hapi')
const config = require('../config')

module.exports = new hapi.Server(config.get('server'))
