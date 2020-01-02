import { put, call, takeLatest } from 'redux-saga/effects'
import request from 'util/request'
import { authActions, LOGIN } from './ducks'
import { AuthPayloads } from './types'
import { API_URL } from 'constants/endpoints'

// mock avatar
import requireImage from 'util/requireImage'

function * loginWorker (payload: AuthPayloads['login']) {
  try {
    const credentialsUrl = `${API_URL}/auth/apisuite`
    const responseCred = yield call(request, credentialsUrl, {
      method: 'GET',
    })

    const csrfRe = /_csrf"\svalue="([^"]*)"/
    const challengeRe = /"challenge"\svalue="([^"]*)"/
    const csrf = responseCred.match(csrfRe)[1]
    const challenge = responseCred.match(challengeRe)[1]

    console.log(csrf)
    console.log(challenge)

    const loginUrl = `${API_URL}/auth/login`
    const formData = new FormData()
    formData.append('_csrf', csrf)
    formData.append('challenge', challenge)
    formData.append('email', payload.email)
    formData.append('password', payload.password)

    yield call(request, loginUrl, {
      method: 'POST',
      body: formData,
    })

    yield put(authActions.loginSuccess({
      token: 'mock_token',
      user: { fName: 'Quentin', lName: 'Felice', avatar: requireImage('goncalo-avatar.jpg') },
    }))
  } catch (error) {
    yield put(authActions.loginError(error))
  }
}

function * rootSaga () {
  yield takeLatest(LOGIN, loginWorker)
}

export default rootSaga
