import { put, takeLatest } from 'redux-saga/effects'
// import request from 'util/request'
import { authActions, LOGIN } from './ducks'

// mock avatar
import avatarUrl from 'assets/goncalo-avatar.jpg'

function * loginWorker () {
  try {
    // TODO: Real login request goes here in the future
    yield put(authActions.loginSuccess({
      token: 'mock_token',
      user: { fName: 'Quentin', lName: 'Felice', avatar: avatarUrl },
    }))
  } catch (error) {
    yield put(authActions.loginError(error))
  }
}

function * rootSaga () {
  yield takeLatest(LOGIN, loginWorker)
}

export default rootSaga
