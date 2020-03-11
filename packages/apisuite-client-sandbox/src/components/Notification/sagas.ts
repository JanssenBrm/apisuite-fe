import { takeLatest, put } from 'redux-saga/effects'
import { INFORM_SUCCESS } from 'components/InformDialog/ducks'
import { closeNotification } from './ducks'

export function * notificationsListener () {
  yield put(closeNotification())
}

function * rootSaga () {
  yield takeLatest(INFORM_SUCCESS, notificationsListener)
}

export default rootSaga
