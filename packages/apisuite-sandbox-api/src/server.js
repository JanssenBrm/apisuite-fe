'use strict'

const hapi = require('hapi')
const config = require('./config')

let options = config.get('server')

module.exports = new hapi.Server(options)
