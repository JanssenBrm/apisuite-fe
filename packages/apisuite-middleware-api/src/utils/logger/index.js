const bunyan = require('bunyan')

const config = require('../../config')

const bunyanConfig = config.get('logger')

/**
 * Logger module that uses bunyan npm pacage as logger
 * @module utils/logger
 */

/** Provides a logger for the API */
exports = module.exports = bunyan.createLogger(bunyanConfig)
