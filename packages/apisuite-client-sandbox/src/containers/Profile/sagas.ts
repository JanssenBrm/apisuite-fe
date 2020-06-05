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
} from './ducks'
import { Store } from 'store/types'
import { API_URL } from 'constants/endpoints'
import {
  FetchTeamMembersResponse,
  FetchRoleOptionsResponse,
  InviteMemberResponse,
} from './types'

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
        data: JSON.stringify(action.payload),
      },
    })

    yield put(inviteMemberActions.success(response))
  } catch (error) {
    yield put(inviteMemberActions.error(error))
  }
}

function * rootSaga () {
  yield takeLatest(ProfileActionTypes.FETCH_TEAM_MEMBERS_REQUEST, fetchTeamMembersSaga)
  yield takeLatest(ProfileActionTypes.FETCH_ROLE_OPTIONS_REQUEST, fetchRoleOptionsSaga)
  yield takeLatest(ProfileActionTypes.INVITE_MEMBER_REQUEST, inviteMemberSaga)
}

export default rootSaga
