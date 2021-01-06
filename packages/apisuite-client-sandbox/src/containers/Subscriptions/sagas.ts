import {
  call,
  put,
  takeLatest,
  select,
} from 'redux-saga/effects'
import {
  SubscriptionsActionTypes,
  getAPIsSuccess,
  getAPIsError,
} from './ducks'
import { ApisResponse } from './types'
import { API_URL } from 'constants/endpoints'
import request from 'util/request'
import { Store } from 'store/types'
import { authActions } from 'containers/Auth/ducks'

function * getAPIsSaga () {
  try {
    const getAPIsUrl = `${API_URL}/apis`
    const accessToken = yield select(
      (state: Store) => state.auth.authToken)
    const response: ApisResponse = yield call(request, {
      url: getAPIsUrl,
      method: 'GET',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-access-token': accessToken,
      },
    })

    yield put(getAPIsSuccess(response.rows))
  } catch (error) {
    // TODO: decide and implement error handling
    yield put(getAPIsError())
    yield put(authActions.handleSessionExpire())
  }
}

export function * rootSaga () {
  yield takeLatest(SubscriptionsActionTypes.GET_APIS, getAPIsSaga)
}

export default rootSaga
