import cookie from 'js-cookie'
import { takeEvery, race, take, put } from 'redux-saga/effects'
import { TOKEN_KEY, openLoginModal } from '../Auth/ducks'
import { showNotification } from 'containers/NotificationManager/ducks'

const actionSuffixes = ['SUCCESS', 'ERROR']

function monitorableAction (action) {
  return !actionSuffixes.every(suffix => action.type.split('_').includes(suffix))
}

function identifyAction (action) {
  const splitAction = action.type.split('_')
  const isRequestAction = !actionSuffixes.every(suffix => splitAction.includes(suffix))
  return isRequestAction ? action.type : splitAction.slice(0, -1).join('_')
}

function getSuccessType (action) {
  return `${identifyAction(action)}_SUCCESS`
}

function getFailType (action) {
  return `${identifyAction(action)}_ERROR`
}

function * monitor (monitoredAction) {
  const { fail } = yield race({
    success: take(getSuccessType(monitoredAction)),
    fail: take(getFailType(monitoredAction)),
  })

  if (fail && fail.error && fail.error.status === 401 && fail.type !== 'Auth/LOGIN_USER_ERROR') {
    cookie.remove(TOKEN_KEY, { path: '/' })
    yield put(showNotification('error', 'monitor.auth.error'))
    yield put(openLoginModal(true))
  }
}

export default function * () {
  yield takeEvery(monitorableAction, monitor)
}
