import { CREATE_APP } from './ducks'
import { takeLatest } from 'redux-saga/effects'
import { CreateAppAction } from './types'

export function * createApp (action: CreateAppAction) {
  console.log('This will create an App!')
}

function * rootSaga () {
  yield takeLatest(CREATE_APP, createApp)
}

export default rootSaga
