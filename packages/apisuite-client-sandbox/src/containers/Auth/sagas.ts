import { put, call, takeLatest } from 'redux-saga/effects'
import request from 'util/request'
import { authActions, LOGIN } from './ducks'
import { API_URL, LOGIN_PORT } from 'constants/endpoints'
import qs from 'qs'

// mock avatar
import requireImage from 'util/requireImage'
import { AnyAction } from 'redux'

function * loginWorker (action: AnyAction) {
  try {
    const credentialsUrl = `${API_URL}${LOGIN_PORT}/auth/apisuite`
    const responseCred = yield call(request, credentialsUrl, {
      method: 'GET',
    })

    const challenge = JSON.parse(responseCred).challenge
    const loginUrl = `${API_URL}/auth/login`

    const data = {
      challenge: challenge,
      email: action.payload.email,
      password: action.payload.password,
    }

    yield call(request, loginUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify(data),
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
