const twilio = require('twilio')
const config = require('../../../config')

const twilioClient = new twilio(config.get('twilio').accountSid, config.get('twilio').authToken)

module.exports = twilioClient
