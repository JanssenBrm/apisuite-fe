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
} from './ducks'
import { Store } from 'store/types'
import { API_URL } from 'constants/endpoints'
import {
  FetchTeamMembersResponse,
  FetchRoleOptionsResponse,
  InviteMemberResponse,
  GetProfileResponse,
  UpdateProfileResponse,
} from './types'
import { openNotification } from 'containers/NotificationStack/ducks'

export function * fetchTeamMembersSaga () {
  try {
    const accessToken = yield select((state: Store) => state.auth.authToken)
    const response: FetchTeamMembersResponse = yield call(request, {
      url: `${API_URL}/organization/members/list`,
      method: 'GET',
      headers: { 'x-access-token': accessToken },
    })

    yield put(fetchTeamMembersActions.success(response))
  } catch (error) {
    yield put(fetchTeamMembersActions.error(error))
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
  } catch (error) {
    yield put(inviteMemberActions.error(error))
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
    yield put(openNotification('success', 'New team member added!', 4000))
  } catch (error) {
    yield put(confirmInviteActions.error(error))
  }
}

export function * changeRoleSaga (
  action: ReturnType<typeof changeRoleActions.request>,
) {
  try {
    const accessToken = yield select((state: Store) => state.auth.authToken)
    const response: InviteMemberResponse = yield call(request, {
      url: `${API_URL}/organization/assign`,
      method: 'POST',
      headers: {
        'x-access-token': accessToken,
        'content-type': 'application/json',
      },
      data: JSON.stringify(action.payload),
    })

    yield put(changeRoleActions.success(response))
  } catch (error) {
    yield put(changeRoleActions.error(error))
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
  } catch (error) {
    yield put(updateProfileActions.error(error))
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
}

export default rootSaga
