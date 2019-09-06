const server = require('./lib/server')
const scheduler = require('./lib/scheduler')
const config = require('./config')

// Start server and create a time schedule for the tests per environment
server.listen(config.get('server').port, () => scheduler.create())
