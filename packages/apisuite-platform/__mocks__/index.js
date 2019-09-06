const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('__mocks__/db.json')
const middlewares = jsonServer.defaults()
const bodyParser = require('body-parser')

server.use(middlewares)
server.use(bodyParser.json())
server.post('/newsletter/subscribe', (req, res) => {
  const email = req.body.email
  if (email === 'error@gmail.com') {
    res.status(500).jsonp({
      error: 'subscription error'
    })
  } else {
    res.status(201).jsonp({ok: `the email address ${email} has been subscribed successfully!`})
  }
})

server.post('/users_registration/user_details', (req, res) => {
  res.jsonp(
    {
      'id': 0,
      'email': 'test@ob.com',
      'firstname': 'test',
      'lastname': 'test',
      'token': 'abc.123.xxx'
    }
  )
})

server.post('/users_registration/sms_code', (req, res) => {
  res.jsonp(
    {
      message: 'sms sent successfully'
    }
  )
})

server.post('/users_registration/security_details', (req, res) => {
  res.jsonp(
    {
      message: 'ok'
    }
  )
})

server.post('/oauth2/token', (req, res) => {
  res.jsonp(
    {
      'access_token': 'e2627d49-0bd2-4c8e-93b4-48474d687f76',
      'token_type': 'bearer',
      'two_factor_authentication': false
    }
  )
})

server.get('/users/me', (req, res) => {
  res.jsonp(
    {
      'id': 50,
      'email': 'test@ob.com',
      'fullName': 'test test',
      'avatar': '',
      'bio': '',
      'phone': '+32488206060',
      'activated': true,
      'github': false,
      'created': '2019-02-22T10:50:27.000Z',
      'updated': '2019-02-22T10:55:56.000Z',
      'twoFA': true,
      'twoFAMethod': 'authorizationSms',
      'organizations': [{
        'id': 52,
        'name': null,
        'vat': null,
        'website': null,
        'description': null,
        'logoUrl': null,
        'policyUrl': null,
        'state': 'NON_TRUSTED',
        'createdAt': 'Fri Feb 22 2019 10:50:26 GMT+0000 (UTC)',
        'updatedAt': 'Fri Feb 22 2019 10:50:26 GMT+0000 (UTC)'
      }],
      'scopes': []
    }
  )
})

server.get('/users/me/recovery_codes', (req, res) => {
  res.jsonp(
    [{
      'id': 59,
      'name': 'Open Bank Demo App',
      'description': null,
      'publicURL': '',
      'clientId': '06135266-17a3-4719-86af-e1243b32b413',
      'ownerId': 50,
      'organizationId': 52,
      'iconURL': null,
      'clientSecret': '597111f005925c8a4a9ceef874e4eda387a68c25b764e5620ba13c7053818b2339ecd79380d00a0b2816a7d9c05d4031',
      'redirectURLs': ['http://127.0.0.1:8090/landing'],
      'grants': ['authorization_code', 'client_credentials'],
      'createdAt': '2019-02-25T09:49:02.000Z',
      'updatedAt': '2019-02-25T09:49:02.000Z',
      'container': '734d27ad-0eba-4a42-8a1f-70dc2576b9b6'
    }]
  )
})

server.get('/users/me/sandbox-apps', (req, res) => {
  res.jsonp(
    {'codes': ['ljZyK-Q6QoO', 'scsZI-zNtRk', 'oPAMx-lJfya', '6K91V-fOvtA', 'yuN4I-DykL1', 'LNlVc-AYEbg', 'rMf5c-ZLhwt', 'WA5Gh-I3bEe', 'Avo45-uA9dZ', 'Mwy4d-9fl9p', 'yavHE-9m4Cd', 'jPPgJ-hQPh0', 'wp5Hf-3TsoI', 'cFMUW-AF3XE', 'QNEVi-gEewO', '6EoBd-WGJYx', 'NYxNw-8yKAX', '3WPFE-YGAK8', '0nSjG-Ng5Le', '52tBs-xTweM']}
  )
})

server.post('/oauth2/tfa', (req, res) => {
  res.jsonp(
    {
      'access_token': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkMzNmNjhiZC01OWE3LTQ0NzQtYTJjZC0zZjYzZTYzNzI3YTEiLCJzdWIiOjUwLCJleHAiOjE1NTIzMTE4MTAsImlhdCI6MTU1MjMwODIxMH0.MyHF_Td4j9vvzPFKQUkn-I_9nwkyf4JNe0EUryuRkWLOo-mGFM9JUUjrxu-Hn7LraBSEZh8F-wDbBmkB8w1PAzaO44uGOk_EtAn8wj4duQN6fyET_54Lp2XsMT4xLAhSPmGnF6EMw3FkWqNrh-VuTJg1Ysg0oE55PbWdlQyVr8hp_65kewpo8s1M4HSsy5JZwTuKzhj0BenppIN1roKwveinXUNqkKgpXlR88lcL9B3hravo7RvknBR4y_OzLrqgu3SMm07p4A1MqQNIt76IDD3ThR8IJ0Bzg6axa5MyGjhbtsbgmzmAX7s2XuTn7adD1JppYDC7wCVe0cQ31xLSww',
      'expires_in': 1552311810,
      'token_type': 'bearer'
    }
  )
})

router.render = (req, res) => {
  if (req.method === 'POST' && req.url === '/newToken') {
    res.jsonp({
      ...res.locals.data,
      accessToken: 'azertgnewrokznqedskdnsqkdn'
    })
    return
  }
  if (req.method === 'POST' && req.url === '/newClientDetails') {
    res.jsonp({
      ...res.locals.data,
      clientId: 'blalkvldsjflsjfksdj',
      accessToken: 'slmdqsldksaldksldklk'
    })
    return
  }
  res.jsonp(res.locals.data)
}

server.use(router)
server.listen(9004, () => {
  console.log('JSON Server is running')
})

module.exports = {
  jsonServer,
  server,
  router
}
