import { CREATE_APP, UPDATE_APP, DELETE_APP, GET_APP_DETAILS, getAppDetailsSuccess, getUserAppsSuccess, GET_USER_APPS, getUserApps, createAppError, updateAppError, deleteAppError, deleteAppSuccess, updateAppSuccess, createAppSuccess } from './ducks'
import { takeLatest, call, put } from 'redux-saga/effects'
import { CreateAppAction, UpdateAppAction, DeleteAppAction, GetUserAppsAction, GetAppDetails, AppData } from './types'
import { API_URL, SIGNUP_PORT } from 'constants/endpoints'
import request from 'util/request'
import { push } from 'connected-react-router'
import qs from 'qs'

export function * createApp (action: CreateAppAction) {
  try {
    const data = {
      name: action.appData.name,
      description: action.appData.description,
      'redirect_url': action.appData.redirectUrl,
      logo: action.appData.logo,
      'user_id': action.appData.userId,
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
    yield put(createAppSuccess())
    yield put(push('/dashboard/apps'))
  } catch (error) {
    yield put(createAppError())
  }
}

export function * updateApp (action: UpdateAppAction) {
  try {
    const data = {
      name: action.appData.name,
      description: action.appData.description,
      'redirect_url': action.appData.redirectUrl,
      logo: action.appData.logo,
      'user_id': action.appData.userId,
      'sandbox_id': '1',
      'pub_urls': [action.appData.pubUrls],
    }

    const updateAppUrl = `${API_URL}${SIGNUP_PORT}/app/update/${action.appData.appId}`
    yield call(request, {
      url: updateAppUrl,
      method: 'PUT',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify(data),
    })
    yield put(updateAppSuccess({
      appId: action.appData.appId,
      name: action.appData.description,
      description: action.appData.description,
      redirectUrl: action.appData.redirectUrl,
      logo: action.appData.logo,
      userId: action.appData.userId,
      sandboxId: '1',
      pubUrls: action.appData.pubUrls,
      enable: action.appData.enable,
    }))
  } catch (error) {
    yield put(updateAppError())
  }
}

export function * getUsersApps (action: GetUserAppsAction) {
  try {
    const getUserAppsUrl = `${API_URL}${SIGNUP_PORT}/app/list/${action.userId}`

    const response = yield call(request, {
      url: getUserAppsUrl,
      method: 'GET',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    })

    const userApps = response.map((userApp: any) => (
      {
        appId: userApp.id,
        name: userApp.name,
        description: userApp.description,
        redirectUrl: userApp.redirect_url,
        logo: userApp.logo,
        userId: userApp.userId,
        sandboxId: userApp.sandboxId,
        pubUrls: '',
        enable: userApp.enable,
      }
    ))
    yield put(getUserAppsSuccess(userApps.sort((a: AppData, b: AppData) => a.appId - b.appId)))
  } catch (error) {
    console.log('Error fecthing user apps')
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
    yield put(deleteAppSuccess())
    if (action.userId) {
      yield put(getUserApps(action.userId))
    }
    yield put(push('/dashboard/apps'))
  } catch (error) {
    yield put(deleteAppError())
  }
}

export function * getAppDetails (action: GetAppDetails) {
  const getUserAppsUrl = `${API_URL}${SIGNUP_PORT}/app/list/${action.userId}`

  const response = yield call(request, {
    url: getUserAppsUrl,
    method: 'GET',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  })

  const userApps = response.map((userApp: any) => (
    {
      appId: userApp.id,
      name: userApp.name,
      description: userApp.description,
      redirectUrl: userApp.redirect_url,
      logo: userApp.logo,
      userId: userApp.userId,
      sandboxId: userApp.sandboxId,
      pubUrls: '',
    }
  ))

  const appIndx = userApps.findIndex((app: AppData) => app.appId === action.appId)
  yield put(getAppDetailsSuccess(userApps[appIndx]))
}

function * rootSaga () {
  yield takeLatest(CREATE_APP, createApp)
  yield takeLatest(UPDATE_APP, updateApp)
  yield takeLatest(DELETE_APP, deleteApp)
  yield takeLatest(GET_APP_DETAILS, getAppDetails)
  yield takeLatest(GET_USER_APPS, getUsersApps)
}

export default rootSaga
