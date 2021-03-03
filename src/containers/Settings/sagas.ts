import { call, put, takeLatest } from 'redux-saga/effects'

import { GET_SETTINGS, getSettingsSuccess } from './ducks'

import { API_URL } from 'constants/endpoints'

import request from 'util/request'

export function * getSettings () {
  try {
    const getSettingsUrl = `${API_URL}/settings`
    const getOwnerDetailsUrl = `${API_URL}/owner`

    const settingsRequestResponse = yield call(request, {
      url: getSettingsUrl,
      method: 'GET',
    })

    const ownerDetailsRequestResponse = yield call(request, {
      url: getOwnerDetailsUrl,
      method: 'GET',
    })

    const newSettings = {
      ...settingsRequestResponse,
      logoURL: ownerDetailsRequestResponse.logo,
    }

    yield put(getSettingsSuccess(newSettings))
  } catch {
    console.log('Error getting settings')
  }
}

function * rootSaga () {
  yield takeLatest(GET_SETTINGS, getSettings)
}

export default rootSaga
