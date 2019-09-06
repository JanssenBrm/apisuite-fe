const express = require('express')
const app = express()

// Routes
const testsHandlers = require('./routes/tests')

// Routes handlers
app.use('/tests', testsHandlers)

module.exports = app
