const convict = require('convict')

// Define a schema
const schema = require('./schema')
const config = convict(schema)

// Perform validation
config.validate({ allowed: 'warn' })

module.exports = config
