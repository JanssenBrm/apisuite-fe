
import { GET_TEST_USERS_ACTION } from './ducks'
import { takeLatest } from 'redux-saga/effects'

export function * getTestUsers () {
  console.log('Test data sagas!')
}

function * rootSaga () {
  yield takeLatest(GET_TEST_USERS_ACTION, getTestUsers)
}

export default rootSaga
