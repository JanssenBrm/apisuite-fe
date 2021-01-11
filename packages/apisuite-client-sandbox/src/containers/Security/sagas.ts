import { call, put, select, takeLatest } from 'redux-saga/effects'

import { openNotification } from 'containers/NotificationStack/ducks'

import {
  updatePasswordRequestErrorAction,
  updatePasswordRequestSuccessAction,
  UPDATE_PASSWORD_REQUEST,
} from './ducks'

import { API_URL } from 'constants/endpoints'

import { Store } from 'store/types'

import { UpdatePasswordRequestAction } from './types'

import request from 'util/request'

export function * updatePasswordRequestSaga (action: UpdatePasswordRequestAction) {
  try {
    const updatePasswordRequestURL = `${API_URL}/users/password`

    const updatePasswordRequestData = {
      'old_password': action.payload.oldPassword,
      'new_password': action.payload.newPassword,
    }

    const authToken = yield select((state: Store) => state.auth.authToken)

    yield call(request, {
      url: updatePasswordRequestURL,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': authToken,
      },
      data: JSON.stringify(updatePasswordRequestData),
    })

    yield put(updatePasswordRequestSuccessAction())
    yield put(openNotification('success', 'Your password was updated successfully!', 3000))
  } catch (error) {
    yield put(updatePasswordRequestErrorAction())
    yield put(openNotification('error', `Could not update your password. Please try again. ${error.message}`, 3000))
  }
}

function * rootSaga () {
  yield takeLatest(UPDATE_PASSWORD_REQUEST, updatePasswordRequestSaga)
}

export default rootSaga
