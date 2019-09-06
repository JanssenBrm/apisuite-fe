const pino = require('pino')
const config = require('../../../config')

const pinoConfig = config.get('pino')

/**
 * Logger module that uses pino npm package as logger
 * @module utils/logger
 */
module.exports = pino(pinoConfig.config)
