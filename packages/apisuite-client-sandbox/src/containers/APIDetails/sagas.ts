import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects'
import {
  GET_API_VERSION,
  getApiVersionSuccess,
  getApiVersionError,
} from './ducks'
import { GetAPIVersionAction } from './types'
import { API_URL } from 'constants/endpoints'
import request from 'util/request'
import { authActions } from 'containers/Auth/ducks'
import { Api, APIVersion } from 'containers/Subscriptions/types'

const emptyVersion: APIVersion = {
  id: 0,
  apiId: 0,
  title: '',
  version: '',
  spec: null,
  live: false,
  deprecated: false,
  createdAt: '',
  updatedAt: '',
}

function * getAPIVersionSaga (
  action: GetAPIVersionAction,
) {
  try {
    const getAPIVersionUrl = `${API_URL}/apis/${action.payload.apiId}`

    const response: Api = yield call(request, {
      url: getAPIVersionUrl,
      method: 'GET',
    })

    const version: APIVersion = response.apiVersions.find((v) => {
      return v.id === Number(action.payload.versionId)
    }) || emptyVersion

    yield put(getApiVersionSuccess(version))
  } catch (error) {
    yield put(getApiVersionError(error))
    yield put(authActions.handleSessionExpire())
  }
}

export function * rootSaga () {
  yield takeLatest(GET_API_VERSION, getAPIVersionSaga)
}

export default rootSaga
