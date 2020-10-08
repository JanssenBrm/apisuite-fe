import { GET_SETTINGS, getSettingsSuccess } from './ducks'
import { takeLatest, call, put } from 'redux-saga/effects'
import { API_URL, SIGNUP_PORT } from 'constants/endpoints'
import request from 'util/request'

export function * getSettings () {
  try {
    const getSettingsUrl = `${API_URL}${SIGNUP_PORT}/settings`
    const response = yield call(request, {
      url: getSettingsUrl,
      method: 'GET',
    })

    yield put(getSettingsSuccess(response))
  } catch {
    console.log('Error getting settings')
  }
}

function * rootSaga () {
  yield takeLatest(GET_SETTINGS, getSettings)
}

export default rootSaga
