import {
  takeLatest,
  put,
  call,
  select,
} from 'redux-saga/effects'
import request from 'util/request'
import {
  ProfileActionTypes,
  fetchTeamMembersActions,
  fetchRoleOptionsActions,
  inviteMemberActions,
  confirmInviteActions,
  changeRoleActions,
  getProfileActions,
  updateProfileActions,
  fetchOrgActions,
  updateOrgActions,
} from './ducks'
import { Store } from 'store/types'
import { API_URL } from 'constants/endpoints'
import {
  FetchTeamMembersResponse,
  FetchRoleOptionsResponse,
  InviteMemberResponse,
  GetProfileResponse,
  UpdateProfileResponse,
  ChangeRoleResponse,
  FetchOrgResponse,
  UpdateOrgResponse,
} from './types'
import { openNotification } from 'containers/NotificationStack/ducks'
import { authActions } from 'containers/Auth/ducks'

export function * fetchTeamMembersSaga () {
  try {
    const accessToken = yield select((state: Store) => state.auth.authToken)
    const response: FetchTeamMembersResponse[] = yield call(request, {
      url: `${API_URL}/organization/members/list`,
      method: 'GET',
      headers: { 'x-access-token': accessToken },
    })

    yield put(fetchTeamMembersActions.success(response))
  } catch (error) {
    yield put(fetchTeamMembersActions.error(error))
    yield put(authActions.handleSessionExpire())
  }
}

export function * fetchRoleOptionsSaga () {
  try {
    const accessToken = yield select((state: Store) => state.auth.authToken)
    const response: FetchRoleOptionsResponse = yield call(request, {
      url: `${API_URL}/role`,
      method: 'GET',
      headers: { 'x-access-token': accessToken },
    })

    yield put(fetchRoleOptionsActions.success(response))
  } catch (error) {
    yield put(fetchRoleOptionsActions.error(error))
    yield put(authActions.handleSessionExpire())
  }
}

export function * inviteMemberSaga (
  action: ReturnType<typeof inviteMemberActions.request>,
) {
  try {
    const accessToken = yield select((state: Store) => state.auth.authToken)
    const response: InviteMemberResponse = yield call(request, {
      url: `${API_URL}/users/invite`,
      method: 'POST',
      headers: {
        'x-access-token': accessToken,
        'content-type': 'application/json',
      },
      data: JSON.stringify(action.payload),
    })

    yield put(inviteMemberActions.success(response))
    yield put(openNotification('success', 'Member was invited successfully.', 3000))
  } catch (error) {
    yield put(inviteMemberActions.error(error.response.data.error || { error: 'Invitation failed.' }))
    yield put(openNotification('error', 'Error inviting member.', 3000))
    yield put(authActions.handleSessionExpire())
  }
}

export function * confirmInviteSaga (
  action: ReturnType<typeof confirmInviteActions.request>,
) {
  try {
    const accessToken = yield select((state: Store) => state.auth.authToken)
    const response: InviteMemberResponse = yield call(request, {
      url: `${API_URL}/users/invite/confirm`,
      method: 'POST',
      headers: {
        'x-access-token': accessToken,
        'content-type': 'application/json',
      },
      data: JSON.stringify(action.payload),
    })

    yield put(confirmInviteActions.success(response))
    yield put(openNotification('success', 'You were added to a team, go to your profile to check your new organization!', 5000))
  } catch (error) {
    yield put(confirmInviteActions.error(error))
  }
}

export function * changeRoleSaga (
  action: ReturnType<typeof changeRoleActions.request>,
) {
  try {
    const accessToken = yield select((state: Store) => state.auth.authToken)
    const response: ChangeRoleResponse = yield call(request, {
      url: `${API_URL}/organization/assign`,
      method: 'POST',
      headers: {
        'x-access-token': accessToken,
        'content-type': 'application/json',
      },
      data: JSON.stringify(action.payload),
    })

    yield put(changeRoleActions.success(response))
    yield put(fetchTeamMembersActions.request())
    yield put(openNotification('success', 'Role updaded successfully.', 3000))
  } catch (error) {
    yield put(changeRoleActions.error(error.response.data.error))
    yield put(openNotification('error', 'Failed to update role.', 3000))
    yield put(authActions.handleSessionExpire())
  }
}

export function * getProfileSaga () {
  try {
    const accessToken = yield select((state: Store) => state.auth.authToken)
    const response: GetProfileResponse = yield call(request, {
      url: `${API_URL}/users/profile`,
      method: 'GET',
      headers: {
        'x-access-token': accessToken,
        'content-type': 'application/json',
      },
    })

    yield put(getProfileActions.success(response))
  } catch (error) {
    yield put(getProfileActions.error(error))
    yield put(authActions.handleSessionExpire())
  }
}

export function * updateProfileSaga (
  action: ReturnType<typeof updateProfileActions.request>,
) {
  try {
    const accessToken = yield select((state: Store) => state.auth.authToken)
    const response: UpdateProfileResponse = yield call(request, {
      url: `${API_URL}/users/profile/update`,
      method: 'PUT',
      headers: {
        'x-access-token': accessToken,
        'content-type': 'application/json',
      },
      data: JSON.stringify(action.payload),
    })

    yield put(updateProfileActions.success(response))
    yield put(getProfileActions.request())
  } catch (error) {
    yield put(updateProfileActions.error(error.response.data.error))
    yield put(authActions.handleSessionExpire())
  }
}

export function * fetchOrgSaga (
  action: ReturnType<typeof fetchOrgActions.request>,
) {
  try {
    const accessToken = yield select((state: Store) => state.auth.authToken)
    let orgId
    if (!action.payload.org_id) {
      yield call(getProfileSaga)
      orgId = yield select((state: Store) => state.profile.profile.current_org.id)
    }
    const response: FetchOrgResponse = yield call(request, {
      url: `${API_URL}/organization/${action.payload.org_id !== '' ? action.payload.org_id : orgId}`,
      method: 'GET',
      headers: {
        'x-access-token': accessToken,
        'content-type': 'application/json',
      },
    })

    yield put(fetchOrgActions.success(response))
  } catch (error) {
    yield put(fetchOrgActions.error(error))
    yield put(authActions.handleSessionExpire())
  }
}

export function * updateOrgSaga (
  action: ReturnType<typeof updateOrgActions.request>,
) {
  try {
    const accessToken = yield select((state: Store) => state.auth.authToken)
    const response: UpdateOrgResponse = yield call(request, {
      url: `${API_URL}/organization/${action.orgId}`,
      method: 'PUT',
      headers: {
        'x-access-token': accessToken,
        'content-type': 'application/json',
      },
      data: JSON.stringify(action.payload),
    })

    yield put(updateOrgActions.success(response))
    yield put(fetchOrgActions.request(action.orgId))
  } catch (error) {
    yield put(updateOrgActions.error(error.response.data.error))
    yield put(authActions.handleSessionExpire())
  }
}

function * rootSaga () {
  yield takeLatest(ProfileActionTypes.FETCH_TEAM_MEMBERS_REQUEST, fetchTeamMembersSaga)
  yield takeLatest(ProfileActionTypes.FETCH_ROLE_OPTIONS_REQUEST, fetchRoleOptionsSaga)
  yield takeLatest(ProfileActionTypes.INVITE_MEMBER_REQUEST, inviteMemberSaga)
  yield takeLatest(ProfileActionTypes.CONFIRM_INVITE_MEMBER_REQUEST, confirmInviteSaga)
  yield takeLatest(ProfileActionTypes.CHANGE_ROLE_REQUEST, changeRoleSaga)
  yield takeLatest(ProfileActionTypes.GET_PROFILE_REQUEST, getProfileSaga)
  yield takeLatest(ProfileActionTypes.UPDATE_PROFILE_REQUEST, updateProfileSaga)
  yield takeLatest(ProfileActionTypes.FETCH_ORG_REQUEST, fetchOrgSaga)
  yield takeLatest(ProfileActionTypes.UPDATE_ORG_REQUEST, updateOrgSaga)
}

export default rootSaga
