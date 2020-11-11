import {
  call,
  put,
  takeLatest,
  select,
} from 'redux-saga/effects'
import {
  SubscriptionsActionTypes,
  getApisSuccess,
  getApisError,
} from './ducks'
import { ApisResponse } from './types'
import { API_URL } from 'constants/endpoints'
import request from 'util/request'
import { Store } from 'store/types'
import { authActions } from 'containers/Auth/ducks'

function * getApisSaga () {
  try {
    const getApisUrl = `${API_URL}/apis`
    const accessToken = yield select(
      (state: Store) => state.auth.authToken)
    const response: ApisResponse = yield call(request, {
      url: getApisUrl,
      method: 'GET',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-access-token': accessToken,
      },
    })

    yield put(getApisSuccess(response.rows))
  } catch (error) {
    // TODO: decide and implement error handling
    yield put(getApisError())
    yield put(authActions.handleSessionExpire())
  }
}

export function * rootSaga () {
  yield takeLatest(SubscriptionsActionTypes.GET_APIS, getApisSaga)
}

export default rootSaga
