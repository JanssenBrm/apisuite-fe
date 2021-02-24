import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects'
import {
  SubscriptionsActionTypes,
  getAPIsSuccess,
  getAPIsError,
} from './ducks'
import { ApisResponse } from './types'
import { API_URL } from 'constants/endpoints'
import request from 'util/request'
import { authActions } from 'containers/Auth/ducks'

function * getAPIsSaga () {
  try {
    const getAPIsUrl = `${API_URL}/apis`
    const response: ApisResponse = yield call(request, {
      url: getAPIsUrl,
      method: 'GET',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
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
