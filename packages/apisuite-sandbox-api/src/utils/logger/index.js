const pino = require('pino')
const config = require('../../config')

/**
 * Logger module
 * @module utils/logger
 */

module.exports = pino(config.get('pino'))
