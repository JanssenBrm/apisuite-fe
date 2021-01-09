import { useTranslation } from 'react-i18next'

import { call, put, select, takeLatest } from 'redux-saga/effects'

import { openNotification } from 'containers/NotificationStack/ducks'

import {
  updatePasswordRequestErrorAction,
  updatePasswordRequestSuccessAction,
  UPDATE_PASSWORD_REQUEST,
} from './ducks'

import { API_URL } from 'constants/endpoints'
import { config } from 'constants/global'

import { Store } from 'store/types'

import { UpdatePasswordRequestAction } from './types'

import request from 'util/request'

const [t] = useTranslation()

export function * updatePasswordRequestSaga (action: UpdatePasswordRequestAction) {
  try {
    const updatePasswordRequestURL = `${API_URL}/users/password`

    const updatePasswordRequestData = {
      'old_password': action.payload.oldPassword,
      'new_password': action.payload.newPassword,
    }

    console.log('updatePasswordRequestData', updatePasswordRequestData)

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
    yield put(openNotification('success', t('profileTab.securitySubTab.successNotification', { config }), 3000))
  } catch (error) {
    yield put(updatePasswordRequestErrorAction())
    yield put(openNotification('error', t('profileTab.securitySubTab.errorNotification', { config }), 3000))
  }
}

function * rootSaga () {
  yield takeLatest(UPDATE_PASSWORD_REQUEST, updatePasswordRequestSaga)
}

export default rootSaga
