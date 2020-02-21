import { put, takeLatest } from 'redux-saga/effects'
import { deleteAppSubSuccess, addAppSubSuccess, DELETE_APP_SUB, ADD_APP_SUB } from './ducks'
import { DeleteAppSubAction, AddAppSubAction } from './types'

function * deleteAppSub (action: DeleteAppSubAction) {
  yield put(deleteAppSubSuccess(action.APIid, action.appNumber))
}

function * addAppSub (action: AddAppSubAction) {
  yield put(addAppSubSuccess(action.APIid, action.newAppNumber))
}

export function * rootSaga () {
  yield takeLatest(DELETE_APP_SUB, deleteAppSub)
  yield takeLatest(ADD_APP_SUB, addAppSub)
}

export default rootSaga
