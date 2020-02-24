import request from 'util/requesting'
import { takeLatest, call, put } from 'redux-saga/effects'
import { SUPPORT_URL } from 'constants/endpoints'
import { INFORM, appStoreActionCreators } from './ducks'
import { AppStoreActionTypes } from './types'

function * inform ({ payload }: AppStoreActionTypes['inform']) {
  try {
    const headers = { 'Content-Type': 'application/json' }
    const body = JSON.stringify(payload)

    yield call(request, SUPPORT_URL as string, {
      method: 'POST',
      headers,
      body,
    })

    yield put(appStoreActionCreators.informSuccess())
  } catch (error) {
    if (error.status === 503) {
      yield put(appStoreActionCreators.informError({ message: 'Inform is currently unavailable please try again later.' }))
    } else {
      yield put(appStoreActionCreators.informError({ message: 'An unexpected error occurred please try again later.' }))
    }
  }
}

export function * rootSaga () {
  yield takeLatest(INFORM, inform)
}

export default rootSaga

