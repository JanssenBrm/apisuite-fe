import {
  CREATE_APP,
  UPDATE_APP,
  DELETE_APP,
  GET_APP_DETAILS,
  getAppDetailsSuccess,
  getUserAppsSuccess,
  GET_USER_APPS,
  getUserApps,
  createAppError,
  updateAppError,
  deleteAppError,
  deleteAppSuccess,
  updateAppSuccess,
  createAppSuccess,
  addAppSubscriptionSuccess,
  addAppSubscriptionError,
  removeAppSubscriptionSuccess,
  removeAppSubscriptionError,
} from './ducks'
import { SubscriptionsActionTypes } from 'containers/Subscriptions/ducks'
import {
  AddAppSubscriptionAction,
  RemoveAppSubscriptionAction,
  Api,
} from 'containers/Subscriptions/types'
import {
  takeLatest,
  call,
  put,
  select,
} from 'redux-saga/effects'
import {
  CreateAppAction,
  UpdateAppAction,
  DeleteAppAction,
  GetUserAppsAction,
  GetAppDetails,
  AppData,
} from './types'
import {
  API_URL,
  SIGNUP_PORT,
} from 'constants/endpoints'
import request from 'util/request'
import { push } from 'connected-react-router'
import { Store } from 'store/types'
import qs from 'qs'
import { authActions } from 'containers/Auth/ducks'
import { openNotification } from 'containers/NotificationStack/ducks'

export function * createApp (action: CreateAppAction) {
  try {
    const data = {
      name: action.appData.name,
      description: action.appData.description,
      'redirect_url': action.appData.redirectUrl,
      logo: action.appData.logo,
      visibility: action.appData.visibility,
      subscriptions: action.appData.subscriptions,
      'pub_urls': action.appData.pubUrls,
    }

    const accessToken = yield select(
      (state: Store) => state.auth.authToken)
    const createAppUrl = `${API_URL}${SIGNUP_PORT}/app/create`

    yield call(request, {
      url: createAppUrl,
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-access-token': accessToken,
      },
      data: qs.stringify(data),
    })
    yield put(createAppSuccess())
    yield put(push('/dashboard/apps'))
  } catch (error) {
    yield put(createAppError())
    yield put(authActions.handleSessionExpire())
  }
}

export function * updateApp (action: UpdateAppAction) {
  try {
    const data = {
      name: action.appData.name,
      description: action.appData.description,
      'redirect_url': action.appData.redirectUrl,
      logo: action.appData.logo,
      visibility: action.appData.visibility,
      'pub_urls': action.appData.pubUrls,
    }
    const accessToken = yield select(
      (state: Store) => state.auth.authToken)
    const updateAppUrl = `${API_URL}${SIGNUP_PORT}/app/update/${action.appData.appId}`

    yield call(request, {
      url: updateAppUrl,
      method: 'PUT',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-access-token': accessToken,
      },
      data: qs.stringify(data),
    })
    yield put(updateAppSuccess({
      appId: action.appData.appId,
      name: action.appData.name,
      description: action.appData.description,
      redirectUrl: action.appData.redirectUrl,
      logo: action.appData.logo,
      orgId: action.appData.org_id,
      visibility: action.appData.visibility,
      subscriptions: action.appData.subscriptions,
      pubUrls: action.appData.pubUrls,
      enable: action.appData.enable,
      clientId: action.appData.clientId,
      clientSecret: action.appData.clientSecret,
    }))
  } catch (error) {
    yield put(updateAppError())
    yield put(authActions.handleSessionExpire())
  }
}

export function * getUsersApps (action: GetUserAppsAction) {
  try {
    const getUserAppsUrl = `${API_URL}${SIGNUP_PORT}/app/list/${action.userId}`
    const accessToken = yield select(
      (state: Store) => state.auth.authToken)
    const response = yield call(request, {
      url: getUserAppsUrl,
      method: 'GET',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-access-token': accessToken,
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
        subscriptions: userApp.subscriptions,
        pubUrls: userApp.pub_urls,
        enable: userApp.enable,
        createdAt: userApp.createdAt,
        updatedAt: userApp.updatedAt,
        clientId: userApp.clientId,
        clientSecret: userApp.clientSecret,
      }
    ))
    yield put(getUserAppsSuccess(userApps.sort((a: AppData, b: AppData) => a.appId - b.appId)))
  } catch (error) {
    console.log('Error fetching user apps')
    yield put(authActions.handleSessionExpire())
  }
}

export function * deleteApp (action: DeleteAppAction) {
  try {
    const deleteAppUrl = `${API_URL}${SIGNUP_PORT}/app/delete/${action.appId}`
    const accessToken = yield select(
      (state: Store) => state.auth.authToken)

    yield call(request, {
      url: deleteAppUrl,
      method: 'DELETE',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-access-token': accessToken,
      },
    })
    yield put(deleteAppSuccess())
    if (action.userId) {
      yield put(getUserApps(action.userId))
    }
    yield put(push('/dashboard/apps'))
  } catch (error) {
    /* TODO: Review the 'checkStatus' function in 'util/request.ts',
    as this Saga considers a response from the server whose status
    code is 204 (i.e., a 'No Content') as an error. */
    if (error.status === 204) {
      yield put(deleteAppSuccess())

      if (action.userId) {
        yield put(getUserApps(action.userId))
      }

      yield put(push('/dashboard/apps'))
    } else {
      yield put(deleteAppError())
      yield put(authActions.handleSessionExpire())
    }
  }
}

export function * getAppDetails (action: GetAppDetails) {
  const getUserAppsUrl = `${API_URL}${SIGNUP_PORT}/app/list/${action.userId}`
  const accessToken = yield select(
    (state: Store) => state.auth.authToken)

  const response = yield call(request, {
    url: getUserAppsUrl,
    method: 'GET',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'x-access-token': accessToken,
    },
  })

  // TODO change request when BE allows to fetch a specific app
  const userApps = response.map((userApp: any) => (
    {
      appId: userApp.id,
      name: userApp.name,
      description: userApp.description,
      redirectUrl: userApp.redirect_url,
      logo: userApp.logo,
      userId: userApp.userId,
      subscriptions: userApp.subscriptions,
      pubUrls: userApp.pub_urls,
      enable: userApp.enable,
      createdAt: userApp.createdAt,
      updatedAt: userApp.updatedAt,
      clientId: userApp.clientId,
      clientSecret: userApp.clientSecret,
    }
  ))

  const appIndx = userApps.findIndex((app: AppData) => app.appId === action.appId)
  yield put(getAppDetailsSuccess(userApps[appIndx]))
}

export function * addAppSubscriptionSaga (action: AddAppSubscriptionAction) {
  const addAppSubscriptionUrl = `${API_URL}/app/${action.appId}/subscribe`
  const apis: Api[] = yield select((store: Store) => store.subscriptions.apis)
  const userApps: AppData[] = yield select((store: Store) => store.applications.userApps)
  const appInfo: AppData[] = userApps.filter(app => app.appId === action.appId)
  const appSubscriptions = appInfo[0].subscriptions.map((sub: Api) => sub.id)
  const accessToken = yield select(
    (state: Store) => state.auth.authToken)

  for (const apiIndx in apis) {
    if (apis[apiIndx].name === action.apiName) appSubscriptions.push(apis[apiIndx].id)
  }

  const data = {
    subscriptions: [...new Set(appSubscriptions)],
  }

  try {
    // TODO: add response type
    const response = yield call(request, {
      url: addAppSubscriptionUrl,
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'x-access-token': accessToken,
      },
      data: JSON.stringify(data),
    })

    const updatedApp = {
      appId: response.id,
      name: response.name,
      description: response.description,
      redirectUrl: response.redirect_url,
      logo: response.logo,
      orgId: response.org_id,
      subscriptions: response.subscriptions,
      pubUrls: response.pub_urls,
      visibility: response.visibility,
      enable: response.enable,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
      clientId: response.clientId,
      clientSecret: response.clientSecret,
    }

    const appIndx = userApps.map((app: AppData) => app.appId).indexOf(action.appId)
    yield put(addAppSubscriptionSuccess(updatedApp, appIndx))
  } catch (error) {
    console.log('Error adding subscription', error)
    yield put(openNotification('error', 'Error subscribing.', 3000))
    yield put(addAppSubscriptionError())
    yield put(authActions.handleSessionExpire())
  }
}

export function * removeAppSubscriptionSaga (action: RemoveAppSubscriptionAction) {
  const addAppSubscriptionUrl = `${API_URL}/app/${action.appId}/subscribe`
  const apis: Api[] = yield select((store: Store) => store.subscriptions.apis)
  const userApps: AppData[] = yield select((store: Store) => store.applications.userApps)
  const appInfo: AppData[] = userApps.filter(app => app.appId === action.appId)
  const appSubscriptions = appInfo[0].subscriptions.map((sub: Api) => sub.id)
  const subscriptionsToRemove = apis.filter((api: Api) => api.name === action.apiName).map((api: Api) => api.id)
  const accessToken = yield select(
    (state: Store) => state.auth.authToken)

  const data = {
    subscriptions: appSubscriptions.filter(apiId => !subscriptionsToRemove.includes(apiId)),
  }

  try {
    // TODO: add response type
    const response = yield call(request, {
      url: addAppSubscriptionUrl,
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'x-access-token': accessToken,
      },
      data: JSON.stringify(data),
    })

    const updatedApp = {
      appId: response.id,
      name: response.name,
      description: response.description,
      redirectUrl: response.redirect_url,
      logo: response.logo,
      orgId: response.org_id,
      subscriptions: response.subscriptions,
      pubUrls: response.pub_urls,
      visibility: response.visibility,
      enable: response.enable,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
      clientId: response.clientId,
      clientSecret: response.clientSecret,
    }

    const appIndx = userApps.map((app: AppData) => app.appId).indexOf(action.appId)
    yield put(removeAppSubscriptionSuccess(updatedApp, appIndx))
  } catch (error) {
    console.log('Error removing subscription')
    yield put(openNotification('error', 'Error removing subscription.', 3000))
    yield put(removeAppSubscriptionError())
    yield put(authActions.handleSessionExpire())
  }
}

function * rootSaga () {
  yield takeLatest(CREATE_APP, createApp)
  yield takeLatest(UPDATE_APP, updateApp)
  yield takeLatest(DELETE_APP, deleteApp)
  yield takeLatest(GET_APP_DETAILS, getAppDetails)
  yield takeLatest(GET_USER_APPS, getUsersApps)
  yield takeLatest(SubscriptionsActionTypes.ADD_APP_SUBSCRIPTION, addAppSubscriptionSaga)
  yield takeLatest(SubscriptionsActionTypes.REMOVE_APP_SUBSCRIPTION, removeAppSubscriptionSaga)
}

export default rootSaga
