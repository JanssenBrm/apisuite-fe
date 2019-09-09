/**
 * @module Team/sagas
 */

import request from 'util/request'
import getDefaultHeaders from 'util/getDefaultHeaders'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { API_URL } from 'constants/endpoints'
import {
  FETCH_TEAM,
  fetchTeam,
  fetchTeamSuccess,
  fetchTeamError,
  SAVE_ROLE,
  saveRoleSuccess,
  saveRoleError,
  REMOVE_USER,
  removeUserSuccess,
  removeUserError,
  FETCH_INVITATIONS,
  fetchInvitationsSuccess,
  fetchInvitationsError,
  CREATE_INVITATION,
  createInvitationSuccess,
  createInvitationError,
  DELETE_INVITATION,
  deleteInvitationSuccess,
  deleteInvitationError,
  GET_INVITATION,
  getInvitationSuccess,
  getInvitationError,
  ACCEPT_INVITATION,
  acceptInvitationSuccess,
  acceptInvitationError,
  POSTPONE_INVITATION,
  postponeInvitationSuccess,
  postponeInvitationError,
} from './ducks'
import { showNotification } from 'containers/NotificationManager/ducks'
import { push } from 'connected-react-router'

/**
 * Fetch Team saga worker
 * @param {Object} action
 */
function * fetchTeamWorker (action) {
  const state = yield select()
  const organizationId = state.auth.user.organizations[0].id
  const requestUrl = `${API_URL}/team/${organizationId}`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })

  const response = yield call(request, requestUrl, {
    method: 'GET',
    headers,
  })

  if (!response.err) {
    yield put(fetchTeamSuccess(response.data))
  } else {
    yield put(fetchTeamError(response.err))
  }
}

/**
 * Fetch Team saga
 */
export function * fetchTeamSaga () {
  yield takeLatest(FETCH_TEAM, fetchTeamWorker)
}

/**
 * Save role saga worker
 * @param {Object} action
 */
function * saveRoleWorker (action) {
  const state = yield select()
  const organizationId = state.auth.user.organizations[0].id
  const requestUrl = `${API_URL}/rbac/${organizationId}/user/${action.userId}`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })
  const body = JSON.stringify({
    oldRoleId: action.oldRoleId,
    newRoleId: action.newRoleId,
  })
  const response = yield call(request, requestUrl, {
    method: 'PUT',
    headers,
    body,
  })

  if (!response.err) {
    yield put(saveRoleSuccess(response.data))
    yield put(showNotification('success', 'role.update.success'))
  } else {
    yield put(saveRoleError(response.err))
    yield put(showNotification('error', 'role.update.error'))
  }
  yield put(fetchTeam())
}

/**
 * Save user role saga
 */
export function * saveRoleSaga () {
  yield takeLatest(SAVE_ROLE, saveRoleWorker)
}

/**
 * Remove user from team saga worker
 * @param {Object} action
 */
function * removeUserWorker (action) {
  const state = yield select()
  const organizationId = state.auth.user.organizations[0].id
  const requestUrl = `${API_URL}/team/${organizationId}/user/${action.userId}`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })

  const response = yield call(request, requestUrl, {
    method: 'DELETE',
    headers,
  })

  if (!response.err) {
    yield put(removeUserSuccess(response.data))
    yield put(showNotification('success', 'user.remove.success'))
  } else {
    yield put(removeUserError(response.err))
    yield put(showNotification('error', 'user.remove.error'))
  }
  yield put(fetchTeam())
}

/**
 * Remove user from team saga
 */
export function * removeUserSaga () {
  yield takeLatest(REMOVE_USER, removeUserWorker)
}

/**
 * Fetch organization invitations saga worker
 * @param {Object} action
 * @param {data} action.data
 */
function * fetchInvitationsWorker () {
  const state = yield select()
  const organizationId = state.auth.user.organizations[0].id
  const requestUrl = `${API_URL}/organizations/${organizationId}/invitations`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })

  const response = yield call(request, requestUrl, {
    method: 'GET',
    headers,
  })

  if (!response.err) {
    yield put(fetchInvitationsSuccess(response.data))
  } else {
    yield put(fetchInvitationsError(response.err))
  }
}

/**
 * Fetch organization invitations saga
 */
export function * fetchInvitationsSaga () {
  yield takeLatest(FETCH_INVITATIONS, fetchInvitationsWorker)
}

/**
 * Create organization invitation saga worker
 * @param {Object} action
 * @param {data} action.data
 */
function * createInvitationWorker (action) {
  const state = yield select()
  const requestUrl = `${API_URL}/organizations/${action.organizationId}/invitations`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })
  const body = JSON.stringify(action.data)

  const response = yield call(request, requestUrl, {
    method: 'POST',
    headers,
    body,
  })

  if (!response.err) {
    yield put(createInvitationSuccess(response.data))
    yield put(showNotification('success', 'team.invitation.create.success'))
  } else {
    yield put(createInvitationError(response.err))
    yield put(showNotification('error', 'team.invitation.create.error'))
  }
}

/**
 * Create organization invitation saga
 */
export function * createInvitationSaga () {
  yield takeLatest(CREATE_INVITATION, createInvitationWorker)
}

/**
 * Delete invitation saga worker
 * @param {Object} action
 * @param {data} action.invId
 */
function * deleteInvitationWorker (action) {
  const state = yield select()
  const requestUrl = `${API_URL}/organizations/${action.organizationId}/invitations/${action.invId}`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })

  const response = yield call(request, requestUrl, {
    method: 'DELETE',
    headers,
  })

  if (!response.err) {
    const data = { ...response.data, invId: action.invId }
    yield put(deleteInvitationSuccess(data))
    yield put(showNotification('success', 'team.invitation.delete.success'))
  } else {
    yield put(deleteInvitationError(response.err))
    yield put(showNotification('error', 'team.invitation.delete.error'))
  }
}

/**
 * Delete invitation saga
 */
export function * deleteInvitationSaga () {
  yield takeLatest(DELETE_INVITATION, deleteInvitationWorker)
}

/**
 * Get invitation saga worker
 * @param {Object} action
 * @param {data} action.data
 */
function * getInvitationWorker (action) {
  const state = yield select()
  const requestUrl = `${API_URL}/invitations/${action.invId}`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })

  const response = yield call(request, requestUrl, {
    method: 'GET',
    headers,
  })

  if (!response.err) {
    yield put(getInvitationSuccess(response.data))
  } else {
    yield put(getInvitationError(response.err))
  }
}

/**
 * Get invitation saga
 */
export function * getInvitationSaga () {
  yield takeLatest(GET_INVITATION, getInvitationWorker)
}

/**
 * Accept organization invitation saga worker
 * @param {Object} action
 * @param {data} action.data
 */
function * acceptInvitationWorker (action) {
  const state = yield select()
  const requestUrl = `${API_URL}/invitations/${action.invId}/accept`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })
  const body = JSON.stringify(action.data)

  const response = yield call(request, requestUrl, {
    method: 'POST',
    headers,
    body,
  })

  if (!response.err) {
    yield put(acceptInvitationSuccess(response.data))
    yield put(showNotification('success', 'team.invitation.accept.success'))
    yield put(push('/'))
  } else {
    yield put(acceptInvitationError(response.err))
    yield put(showNotification('error', 'team.invitation.accept.error'))
  }
}

/**
 * Accept organization invitation saga
 */
export function * acceptInvitationSaga () {
  yield takeLatest(ACCEPT_INVITATION, acceptInvitationWorker)
}

/**
 * Postpone organization invitation saga worker
 * @param {Object} action
 * @param {data} action.data
 */
function * postponeInvitationWorker (action) {
  const state = yield select()
  const requestUrl = `${API_URL}/invitations/${action.invId}/postpone`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })

  const response = yield call(request, requestUrl, {
    method: 'POST',
    headers,
  })

  if (!response.err) {
    yield put(postponeInvitationSuccess(response.data))
    yield put(showNotification('success', 'team.invitation.postpone.success'))
    yield put(push('/'))
  } else {
    yield put(postponeInvitationError(response.err))
    yield put(showNotification('error', 'team.invitation.postpone.error'))
  }
}

/**
 * Postpone organization invitation saga
 */
export function * postponeInvitationSaga () {
  yield takeLatest(POSTPONE_INVITATION, postponeInvitationWorker)
}

export default [
  fetchTeamSaga,
  saveRoleSaga,
  removeUserSaga,
  fetchInvitationsSaga,
  createInvitationSaga,
  deleteInvitationSaga,
  getInvitationSaga,
  acceptInvitationSaga,
  postponeInvitationSaga,
]
