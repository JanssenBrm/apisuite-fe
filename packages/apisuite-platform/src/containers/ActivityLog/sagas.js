import request from 'util/request'
import getDefaultHeaders from 'util/getDefaultHeaders'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { API_URL } from 'constants/endpoints'
import { FETCH_ACTIVITIES, fetchActivitiesSuccess, fetchActivitiesError, FETCH_KPIS, fetchKpisSuccess, fetchKpisError } from './ducks'
import qs from 'qs'

/**
 * Fetch activities saga worker
 * @param {Object} act
 */
function * fetchActivitiesWorker (act) {
  const { page = 1, pageSize = 50, category, from, to, action } = act.filters
  const state = yield select()
  const queryParams = qs.stringify({ page, pageSize, category, from, to, action }, { addQueryPrefix: true })
  const organizationId = state.auth.user.organizations[0].id
  const requestUrl = `${API_URL}/activity/${organizationId}${queryParams}`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })

  const response = yield call(request, requestUrl, {
    method: 'GET',
    headers
  })

  if (!response.err) {
    yield put(fetchActivitiesSuccess(response.data))
  } else {
    yield put(fetchActivitiesError(response.err))
  }
}

/**
 * Fetch activities saga
 */
export function * fetchActivitiesSaga () {
  yield takeLatest(FETCH_ACTIVITIES, fetchActivitiesWorker)
}

/**
 * Fetch kpis saga worker
 * @param {Object} action
 */
function * fetchKpisWorker (action) {
  const state = yield select()
  const organizationId = state.auth.user.organizations[0].id
  const requestUrl = `${API_URL}/activity/${organizationId}/kpi`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })

  const response = yield call(request, requestUrl, {
    method: 'GET',
    headers
  })

  if (!response.err) {
    yield put(fetchKpisSuccess(response.data))
  } else {
    yield put(fetchKpisError(response.err))
  }
}

/**
 * Fetch kpis saga
 */
export function * fetchKpisSaga () {
  yield takeLatest(FETCH_KPIS, fetchKpisWorker)
}

export default [fetchActivitiesSaga, fetchKpisSaga]
