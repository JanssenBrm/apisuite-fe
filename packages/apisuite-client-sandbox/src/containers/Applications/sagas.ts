import { CREATE_APP, UPDATE_APP, DELETE_APP, GET_APP_DETAILS, getAppDetailsSuccess } from './ducks'
import { takeLatest, call, put } from 'redux-saga/effects'
import { CreateAppAction, UpdateAppAction, DeleteAppAction } from './types'
import { API_URL, SIGNUP_PORT } from 'constants/endpoints'
import request from 'util/request'
import qs from 'qs'

export function * createApp (action: CreateAppAction) {
  try {
    const data = {
      name: action.appData.name,
      description: action.appData.description,
      'redirect_url': action.appData.redirectUrl,
      logo: action.appData.logo,
      // TODO: get user_id and sandbox_id after BE changes
      'user_id': '1',
      'sandbox_id': '1',
      'pub_urls': [action.appData.pubUrls],
    }

    const createAppUrl = `${API_URL}${SIGNUP_PORT}/app/create`
    yield call(request, {
      url: createAppUrl,
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify(data),
    })
  } catch (error) {
    console.log('Error creating App')
  }
}

export function * updateApp (action: UpdateAppAction) {
  try {
    const data = {
      name: action.appData.name,
      description: action.appData.description,
      'redirect_url': action.appData.redirectUrl,
      logo: action.appData.logo,
      // TODO: get user_id, sandbox_id, id after BE changes
      'user_id': '1',
      'sandbox_id': '1',
      'pub_urls': [action.appData.pubUrls],
    }

    const updateAppUrl = `${API_URL}${SIGNUP_PORT}/app/update/${action.appId}`
    yield call(request, {
      url: updateAppUrl,
      method: 'PUT',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify(data),
    })
  } catch (error) {
    console.log('Error updating App')
  }
}

export function * deleteApp (action: DeleteAppAction) {
  try {
    const deleteAppUrl = `${API_URL}${SIGNUP_PORT}/app/delete/${action.appId}`
    yield call(request, {
      url: deleteAppUrl,
      method: 'DELETE',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    })
  } catch (error) {
    console.log('Error deleting App')
  }
}

export function * getAppDetails () {
  // TODO fetch app data
  yield put(getAppDetailsSuccess({
    name: 'My Application Name',
    description: 'Application description',
    redirectUrl: 'redirectUrl',
    logo: 'logo',
    userId: '111',
    sandboxId: '999',
    pubUrls: '',
  }))
}

function * rootSaga () {
  yield takeLatest(CREATE_APP, createApp)
  yield takeLatest(UPDATE_APP, updateApp)
  yield takeLatest(DELETE_APP, deleteApp)
  yield takeLatest(GET_APP_DETAILS, getAppDetails)
}

export default rootSaga
