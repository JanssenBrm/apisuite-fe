import React from 'react'
import { mountWithIntl } from 'util/test-utils'
import request from 'util/request'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import Team from './Team'
import reducer, {
  fetchTeam,
  fetchTeamSuccess,
  fetchTeamError,
  saveRole,
  saveRoleSuccess,
  saveRoleError,
  removeUser,
  removeUserError,
  removeUserSuccess,
  fetchInvitations,
  fetchInvitationsSuccess,
  fetchInvitationsError,
  createInvitation,
  createInvitationSuccess,
  createInvitationError,
  getInvitation,
  getInvitationSuccess,
  getInvitationError,
  acceptInvitation,
  acceptInvitationSuccess,
  acceptInvitationError,
  postponeInvitation,
  postponeInvitationSuccess,
  postponeInvitationError,
} from './ducks'
import { fetchTeamSaga, saveRoleSaga, removeUserSaga, fetchInvitationsSaga, createInvitationSaga, getInvitationSaga, acceptInvitationSaga, postponeInvitationSaga } from './sagas'

const mockTeam = {
  users: [
    {
      id: 204,
      email: 'manaf.melloul@gmail.com',
      fullName: 'manaf',
      avatar: '',
      bio: '',
      phone: '+32488206060',
      activated: true,
      github: false,
      created: '2019-04-09T09:48:31.000Z',
      updated: '2019-04-09T09:49:25.000Z',
      twofa: { enabled: true, method: 'authorizationApp' },
      roles: [{ id: 1, orgId: 208, name: 'ADMIN' }],
    },
    {
      id: 202,
      email: 'mhm@wemanity.com',
      fullName: 'Mh Mai',
      avatar: '',
      bio: 'C\'est moi',
      phone: '+33632225104',
      activated: true,
      github: false,
      created: '2019-03-25T09:39:17.000Z',
      updated: '2019-04-24T11:59:07.000Z',
      twofa: { enabled: true, method: 'authorizationSms' },
      roles: [{ id: 3, orgId: 208, name: 'TESTER' }],
    }],
  roles: [
    {
      id: 1, name: 'ADMIN', level: 0, created: null, updated: null,
    },
    {
      id: 2,
      name: 'DEVELOPER',
      level: 1,
      created: null,
      updated: null,
    },
    {
      id: 3, name: 'TESTER', level: 2, created: null, updated: null,
    },
    {
      id: 4,
      name: 'SALES',
      level: 3,
      created: null,
      updated: null,
    },
  ],
}
const mockOrganization = { id: 208, name: 'myOrg', state: 'NON_VALIDATED' }
const mockState = {
  auth: {
    user: {
      organizations: [
        mockOrganization,
      ],
    },
  },
}
const errorMock = { message: 'error-load-team' }

describe('<Team />', () => {
  const props = {
    history: { push: jest.fn() },
    fetchTeam: jest.fn(),
    fetchInvitations: jest.fn(),
    createInvitation: jest.fn(),
    deleteInvitation: jest.fn(),
    saveRole: jest.fn(),
    removeUser: jest.fn(),
    team: {},
    invitations: [],
    auth: {
      user: {
        id: 204,
        organizations: [
          mockOrganization,
        ],
      },
    },
    intl: {},
    ui: {
      loading: false,
    },
  }

  const wrapper = mountWithIntl(<Team {...props} />)

  it('should have a div as parent', () => {
    expect(wrapper.find('.team-container')).toHaveLength(1)
  })

  it('should call fetchTeam on mount', () => {
    expect(props.fetchTeam).toHaveBeenCalledTimes(1)
    wrapper.setProps({ team: mockTeam })
    expect(wrapper.state().team).toEqual(mockTeam.users)
  })

  it('should update ui state with new props', () => {
    wrapper.setProps({ ui: { loading: true } })
    expect(wrapper.state().ui.loading).toEqual(true)
  })

  it('should render 2 users', () => {
    wrapper.setProps({ team: mockTeam, ui: { loading: false } })
    expect(wrapper.find('.member-row')).toHaveLength(2)
  })

  it('should open the action menu', () => {
    const actionMenu = wrapper.find('.action-menu button').first()
    expect(actionMenu).toHaveLength(1)
    expect(Boolean(wrapper.state().anchorEl)).toBe(false)
    actionMenu.simulate('click')
    expect(Boolean(wrapper.state().anchorEl)).toBe(true)
  })

  describe('reducer', () => {
    const initialState = {
      team: {},
      invitations: [],
      ticket: {},
      ui: {
        loading: false,
      },
    }

    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should update state on FETCH_TEAM', () => {
      expect(reducer(initialState, fetchTeam()))
        .toEqual({
          ...initialState,
          ui: {
            loading: true,
          },
        })
    })

    it('should update state on FETCH_TEAM_SUCCESS', () => {
      expect(reducer(initialState, fetchTeamSuccess(mockTeam)))
        .toEqual({
          ...initialState,
          ui: {
            loading: false,
          },
          team: mockTeam,
        })
    })

    it('should update state on FETCH_APIS_ERROR', () => {
      expect(reducer(initialState, fetchTeamError(errorMock)))
        .toEqual({
          ...initialState,
          ui: {
            loading: false,
          },
          team: {},
        })
    })

    it('should update state on SAVE_ROLE', () => {
      expect(reducer(initialState, saveRole()))
        .toEqual({
          ...initialState,
          ui: {
            loading: true,
          },
        })
    })

    it('should update state on SAVE_ROLE_SUCCESS', () => {
      expect(reducer(initialState, saveRoleSuccess()))
        .toEqual({
          ...initialState,
          ui: {
            loading: false,
          },
          team: {},
        })
    })

    it('should update state on SAVE_ROLE_ERROR', () => {
      expect(reducer(initialState, saveRoleError()))
        .toEqual({
          ...initialState,
          ui: {
            loading: false,
          },
          team: {},
        })
    })

    it('should update state on REMOVE_USER', () => {
      expect(reducer(initialState, removeUser()))
        .toEqual({
          ...initialState,
          ui: {
            loading: true,
          },
        })
    })

    it('should update state on REMOVE_USER_SUCCESS', () => {
      expect(reducer(initialState, removeUserSuccess()))
        .toEqual({
          ...initialState,
          ui: {
            loading: false,
          },
          team: {},
        })
    })

    it('should update state on REMOVE_USER_ERROR', () => {
      expect(reducer(initialState, removeUserError()))
        .toEqual({
          ...initialState,
          ui: {
            loading: false,
          },
          team: {},
        })
    })

    it('should update state on FETCH_INVITATIONS', () => {
      expect(reducer(initialState, fetchInvitations()))
        .toEqual({
          ...initialState,
          ui: {
            loading: true,
          },
        })
    })

    it('should update state on FETCH_INVITATIONS_SUCCESS', () => {
      const mockInvitations = []
      expect(reducer(initialState, fetchInvitationsSuccess(mockInvitations)))
        .toEqual({
          ...initialState,
          ui: {
            loading: false,
          },
          invitations: mockInvitations,
        })
    })

    it('should update state on FETCH_INVITATIONS_ERROR', () => {
      expect(reducer(initialState, fetchInvitationsError(errorMock)))
        .toEqual({
          ...initialState,
          ui: {
            loading: false,
          },
          invitations: [],
        })
    })

    it('should update state on GET_INVITATION', () => {
      const invId = 2
      expect(reducer(initialState, getInvitation(invId)))
        .toEqual({
          ...initialState,
          ui: {
            loading: true,
          },
        })
    })

    it('should update state on GET_INVITATION_SUCCESS', () => {
      const mockTicket = {}
      expect(reducer(initialState, getInvitationSuccess(mockTicket)))
        .toEqual({
          ...initialState,
          ui: {
            loading: false,
          },
          ticket: mockTicket,
        })
    })

    it('should update state on GET_INVITATION_ERROR', () => {
      expect(reducer(initialState, getInvitationError(errorMock)))
        .toEqual({
          ...initialState,
          ui: {
            loading: false,
          },
          ticket: {},
        })
    })
  })

  describe('sagas', () => {
    it('should call fetchTeam and return an object', () => {
      const fakeResponse = { data: mockTeam }
      return expectSaga(fetchTeamSaga)
        .withState(mockState)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(fetchTeamSuccess(mockTeam))
        .dispatch(fetchTeam())
        .silentRun()
    })

    it('should call fetchTeam and handle the error', () => {
      const fakeResponse = { err: errorMock }
      return expectSaga(fetchTeamSaga)
        .withState(mockState)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(fetchTeamError(errorMock))
        .dispatch(fetchTeam())
        .silentRun()
    })

    it('should call saveRole and return an object', () => {
      const fakeResponse = { data: mockTeam }
      return expectSaga(saveRoleSaga)
        .withState(mockState)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(saveRoleSuccess(mockTeam))
        .dispatch(saveRole())
        .silentRun()
    })

    it('should call saveRole and handle the error', () => {
      const fakeResponse = { err: errorMock }
      return expectSaga(saveRoleSaga)
        .withState(mockState)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(saveRoleError(errorMock))
        .dispatch(saveRole())
        .silentRun()
    })

    it('should call removeUser and return an object', () => {
      const fakeResponse = { data: mockTeam }
      return expectSaga(removeUserSaga)
        .withState(mockState)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(removeUserSuccess(mockTeam))
        .dispatch(removeUser())
        .silentRun()
    })

    it('should call removeUser and handle the error', () => {
      const fakeResponse = { err: errorMock }
      return expectSaga(removeUserSaga)
        .withState(mockState)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(removeUserError(errorMock))
        .dispatch(removeUser())
        .silentRun()
    })

    it('should call fetchInvitations and return an array', () => {
      const mockInvitations = []
      const fakeResponse = { data: mockInvitations }
      return expectSaga(fetchInvitationsSaga)
        .withState(mockState)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(fetchInvitationsSuccess(mockInvitations))
        .dispatch(fetchInvitations())
        .silentRun()
    })

    it('should call fetchInvitations and handle the error', () => {
      const fakeResponse = { err: errorMock }
      return expectSaga(fetchInvitationsSaga)
        .withState(mockState)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(fetchInvitationsError(errorMock))
        .dispatch(fetchInvitations())
        .silentRun()
    })

    const orgId = 1
    const mockData = {
      email: 'john@doe.com',
      name: 'John Doe',
      role: 1,
    }

    it('should call createInvitation and return an object', () => {
      const mockInvitation = {}
      const fakeResponse = { data: mockInvitation }
      return expectSaga(createInvitationSaga)
        .withState(mockState)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(createInvitationSuccess(mockInvitation))
        .dispatch(createInvitation(orgId, mockData))
        .silentRun()
    })

    it('should call createInvitation and handle the error', () => {
      const fakeResponse = { err: errorMock }
      return expectSaga(createInvitationSaga)
        .withState(mockState)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(createInvitationError(errorMock))
        .dispatch(createInvitation(orgId, mockData))
        .silentRun()
    })

    const invId = 1

    it('should call getInvitation and return an object', () => {
      const mockInvitation = {}
      const fakeResponse = { data: mockInvitation }
      return expectSaga(getInvitationSaga)
        .withState(mockState)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(getInvitationSuccess(mockInvitation))
        .dispatch(getInvitation(invId))
        .silentRun()
    })

    it('should call getInvitation and handle the error', () => {
      const fakeResponse = { err: errorMock }
      return expectSaga(getInvitationSaga)
        .withState(mockState)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(getInvitationError(errorMock))
        .dispatch(getInvitation(invId))
        .silentRun()
    })

    it('should call acceptInvitation and redirect the user', () => {
      const mockInvitation = {}
      const fakeResponse = { data: mockInvitation }
      return expectSaga(acceptInvitationSaga)
        .withState(mockState)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(acceptInvitationSuccess(mockInvitation))
        .dispatch(acceptInvitation(invId))
        .silentRun()
    })

    it('should call acceptInvitation and handle the error', () => {
      const fakeResponse = { err: errorMock }
      return expectSaga(acceptInvitationSaga)
        .withState(mockState)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(acceptInvitationError(errorMock))
        .dispatch(acceptInvitation(invId))
        .silentRun()
    })

    it('should call postponeInvitation and redirect the user', () => {
      const mockInvitation = {}
      const fakeResponse = { data: mockInvitation }
      return expectSaga(postponeInvitationSaga)
        .withState(mockState)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(postponeInvitationSuccess(mockInvitation))
        .dispatch(postponeInvitation(invId))
        .silentRun()
    })

    it('should call postponeInvitation and handle the error', () => {
      const fakeResponse = { err: errorMock }
      return expectSaga(postponeInvitationSaga)
        .withState(mockState)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(postponeInvitationError(errorMock))
        .dispatch(postponeInvitation(invId))
        .silentRun()
    })
  })
})
