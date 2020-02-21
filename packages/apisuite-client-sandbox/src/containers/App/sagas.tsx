import requestInform from 'util/request'
import { takeLatest, call, put } from 'redux-saga/effects'
import { SUPPORT_URL } from 'constants/endpoints'
import { INFORM, appStoreActionCreators } from './ducks'
import { AppStoreActionTypes } from './types'

function * inform ({ payload }: AppStoreActionTypes['inform']) {
  try {
    const headers = { 'Content-Type': 'application/json' }
    const body = JSON.stringify(payload)

    console.log(payload)
    yield call(requestInform, {
      url: SUPPORT_URL,
      method: 'POST',
      headers,
      data: body,
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
