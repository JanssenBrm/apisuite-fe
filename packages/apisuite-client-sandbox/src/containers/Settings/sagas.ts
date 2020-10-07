import { GET_SETTINGS, getSettingsSuccess } from './ducks'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { API_URL, SIGNUP_PORT } from 'constants/endpoints'
import request from 'util/request'
import { Store } from 'store/types'

export function * getSettings () {
  try {
    const getSettingsUrl = `${API_URL}${SIGNUP_PORT}/settings`
    const accessToken = yield select(
      (state: Store) => state.auth.authToken,
    )

    const response = yield call(request, {
      url: getSettingsUrl,
      method: 'GET',
      headers: {
        'x-access-token': accessToken,
      },
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
