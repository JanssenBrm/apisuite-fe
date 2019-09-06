const events = require('events')
const smsEventEmitter = new events.EventEmitter()
const smsListener = {}
const _event = 'sms_received'

smsListener.receiveSMS = (data) => {
  smsEventEmitter.emit(_event, data)
}

smsListener.getSMS = (callback) => {
  smsEventEmitter.addListener(_event, (data) => {
    callback(data)
  })
}

smsListener.removeListener = () => {
  const eventCount = events.EventEmitter.listenerCount(smsEventEmitter, _event)
  if (eventCount > 0) {
    smsEventEmitter.removeAllListeners(_event)
  }
}

module.exports = smsListener
