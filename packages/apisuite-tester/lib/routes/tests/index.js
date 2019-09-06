const express = require('express')
const routes = express()
const serveIndex = require('serve-index')
const bodyParser = require('body-parser')
const Joi = require('joi')
const smsListener = require('../../utils/smsListener')

// define the validation schema
const schema = Joi.object().keys({
  // the sms with the code generated 6 numbers
  msg: Joi.string().regex(/^\d{6}$/).required(),
  from: Joi.string().required(),
  time: Joi.string().required(),
  uuid: Joi.string().required(),
})

const router = express.Router()

router.post('/sms', function(req, res){
  const data = req.body
  Joi.validate(data, schema, (err) => {
    if (err) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid request data',
        data: data
      })
    } else {
      let smsData = {
        sms: data.msg
      }
      smsListener.receiveSMS(smsData)
      res.sendStatus(200)
    }
  })
})

routes.use(bodyParser.json())
routes.use('/reports', express.static('reports'), serveIndex('reports'))
routes.use('/', router)

module.exports = routes
