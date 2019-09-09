/**
 * @module LandingPage/sagas
 */

import request from 'util/request'
import getDefaultHeaders from 'util/getDefaultHeaders'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { API_URL } from 'constants/endpoints'
import {
  FETCH_API_PRODUCTS,
  fetchApiProductsSuccess,
  fetchApiProductsError,
  GET_API_PRODUCT,
  getApiProductSuccess,
  getApiProductError,
} from './ducks'

/**
 * Fetch API Products saga worker
 * @param {Object} action
 */
function * fetchApiProductsWorker (action) {
  const state = yield select()
  const requestUrl = `${API_URL}/products`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })

  const response = yield call(request, requestUrl, {
    method: 'GET',
    headers,
  })

  if (!response.err) {
    yield put(fetchApiProductsSuccess(response.data))
  } else {
    yield put(fetchApiProductsError(response.err))
  }
}

/**
 * Fetch API Products saga
 */
export function * fetchApiProductsSaga () {
  yield takeLatest(FETCH_API_PRODUCTS, fetchApiProductsWorker)
}

/**
 * Get API Product saga worker
 * @param {Object} action
 */
function * getApiProductWorker (action) {
  const state = yield select()
  const requestUrl = `${API_URL}/products/${action.productId}`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })

  const response = yield call(request, requestUrl, {
    method: 'GET',
    headers,
  })

  if (!response.err) {
    yield put(getApiProductSuccess(response.data))
  } else {
    yield put(getApiProductError(response.err))
  }
}

/**
 * Get API Product saga
 */
export function * getApiProductSaga () {
  yield takeLatest(GET_API_PRODUCT, getApiProductWorker)
}

export default [fetchApiProductsSaga, getApiProductSaga]
