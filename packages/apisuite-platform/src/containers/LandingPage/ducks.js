/**
 * @module LandingPage/ducks
 */

import update from 'immutability-helper'

/**
 * Constants
 */
export const FETCH_API_PRODUCTS = 'LandingPage/FETCH_API_PRODUCTS'
export const FETCH_API_PRODUCTS_SUCCESS = 'LandingPage/FETCH_API_PRODUCTS_SUCCESS'
export const FETCH_API_PRODUCTS_ERROR = 'LandingPage/FETCH_API_PRODUCTS_ERROR'
export const GET_API_PRODUCT = 'LandingPage/GET_API_PRODUCT'
export const GET_API_PRODUCT_SUCCESS = 'LandingPage/GET_API_PRODUCT_SUCCESS'
export const GET_API_PRODUCT_ERROR = 'LandingPage/GET_API_PRODUCT_ERROR'

/**
 * API Products state
 * @typedef {Object} state
 * @prop {array} [products] - API Products data
 * @prop {array} [brands] - API Products data
 */
const initialState = {
  brands: [],
  products: [],
  product: {},
  ui: {
    loading: false
  }
}

/**
 * Reducer
 * @param {state} [state=initialState] - API Products state or initial state
 * @param {object} action - the action type and payload
 */
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_API_PRODUCTS:
    case GET_API_PRODUCT:
      return update(state, {
        ui: {
          loading: {$set: true}
        }
      })
    case FETCH_API_PRODUCTS_SUCCESS:
      return update(state, {
        products: {$set: action.data.products},
        brands: {$set: action.data.brands},
        ui: {
          loading: {$set: false}
        }
      })
    case FETCH_API_PRODUCTS_ERROR:
      return update(state, {
        products: {$set: []},
        brands: {$set: []},
        ui: {
          loading: {$set: false}
        }
      })
    case GET_API_PRODUCT_SUCCESS:
      return update(state, {
        product: {$set: action.data},
        ui: {
          loading: {$set: false}
        }
      })
    case GET_API_PRODUCT_ERROR:
      return update(state, {
        product: {$set: {}},
        ui: {
          loading: {$set: false}
        }
      })
    default:
      return state
  }
}

/**
 * Fetch API Products action creator
 */
export function fetchApiProducts () {
  return {type: FETCH_API_PRODUCTS}
}

/**
 * Fetch API Products success
 * @param {Object} data - data received from the successful call
 */
export function fetchApiProductsSuccess (data) {
  return {type: FETCH_API_PRODUCTS_SUCCESS, data}
}

/**
 * Fetch API Products error
 */
export function fetchApiProductsError (error) {
  return {type: FETCH_API_PRODUCTS_ERROR, error}
}

/**
 * Get API Product action creator
 */
export function getApiProduct (productId) {
  return {type: GET_API_PRODUCT, productId}
}

/**
 * Get API Product success
 * @param {Object} data - data received from the successful call
 */
export function getApiProductSuccess (data) {
  return {type: GET_API_PRODUCT_SUCCESS, data}
}

/**
 * Get API Product error
 */
export function getApiProductError (error) {
  return {type: GET_API_PRODUCT_ERROR, error}
}
