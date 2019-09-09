import request from 'util/request'
import getDefaultHeaders from 'util/getDefaultHeaders'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { API_URL } from 'constants/endpoints'
import {
  FETCH_RESOURCES,
  fetchResourcesSuccess,
  fetchResourcesError,
} from './ducks'
import qs from 'qs'

/**
 * Fetch apps saga worker
 * @param {Object} action
 */
function * fetchResourcesWorker (action) {
  const state = yield select()
  const { page, pageSize } = action
  const queryParams = qs.stringify({ page, pageSize }, { addQueryPrefix: true })
  const requestUrl = `${API_URL}/external-resources${queryParams}`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })

  const response = yield call(request, requestUrl, {
    method: 'GET',
    headers,
  })

  if (!response.err) {
    yield put(fetchResourcesSuccess(response.data))
  } else {
    yield put(fetchResourcesError(response.err))
  }
}

/**
 * Fetch apps saga
 */
export function * fetchResourcesSaga () {
  yield takeLatest(FETCH_RESOURCES, fetchResourcesWorker)
}

export default [fetchResourcesSaga]
