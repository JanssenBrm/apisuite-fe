import { put, takeLatest } from 'redux-saga/effects'
import { AnyAction } from 'redux'
import { deleteAppSubSuccess, addAppSubSuccess, DELETE_APP_SUB, ADD_APP_SUB } from './ducks'

function * deleteAppSub (action: AnyAction) {
  yield put(deleteAppSubSuccess(action.APIid, action.appNumber))
}

function * addAppSub (action: AnyAction) {
  yield put(addAppSubSuccess(action.APIid, action.newAppNumber))
}

export function * rootSaga () {
  yield takeLatest(DELETE_APP_SUB, deleteAppSub)
  yield takeLatest(ADD_APP_SUB, addAppSub)
}

export default rootSaga
