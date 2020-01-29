import { CREATE_APP, UPDATE_APP, GET_APP_DETAILS, getAppDetailsSuccess } from './ducks'
import { takeLatest, put } from 'redux-saga/effects'
import { CreateAppAction, UpdateAppAction } from './types'

export function * createApp (action: CreateAppAction) {
  console.log(action)
  console.log(action.appData)
}

export function * updateApp (action: UpdateAppAction) {
  console.log(action)
  console.log(action.appData)
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
  }))
}

function * rootSaga () {
  yield takeLatest(CREATE_APP, createApp)
  yield takeLatest(UPDATE_APP, updateApp)
  yield takeLatest(GET_APP_DETAILS, getAppDetails)
}

export default rootSaga
