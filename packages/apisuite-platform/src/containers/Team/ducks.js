import update from 'immutability-helper'

/**
 * Constants
 */
export const FETCH_TEAM = 'Team/LOAD_TEAM'
export const FETCH_TEAM_SUCCESS = 'Team/LOAD_TEAM_SUCCESS'
export const FETCH_TEAM_ERROR = 'Team/LOAD_TEAM_ERROR'
export const SAVE_ROLE = 'Team/SAVE_ROLE'
export const SAVE_ROLE_SUCCESS = 'Team/SAVE_ROLE_SUCCESS'
export const SAVE_ROLE_ERROR = 'Team/SAVE_ROLE_ERROR'
export const REMOVE_USER = 'Team/REMOVE_USER'
export const REMOVE_USER_SUCCESS = 'Team/REMOVE_USER_SUCCESS'
export const REMOVE_USER_ERROR = 'Team/REMOVE_USER_ERROR'
export const FETCH_INVITATIONS = 'Team/FETCH_INVITATIONS'
export const FETCH_INVITATIONS_SUCCESS = 'Team/FETCH_INVITATIONS_SUCCESS'
export const FETCH_INVITATIONS_ERROR = 'Team/FETCH_INVITATIONS_ERROR'
export const CREATE_INVITATION = 'Team/CREATE_INVITATION'
export const CREATE_INVITATION_SUCCESS = 'Team/CREATE_INVITATION_SUCCESS'
export const CREATE_INVITATION_ERROR = 'Team/CREATE_INVITATION_ERROR'
export const DELETE_INVITATION = 'Team/DELETE_INVITATION'
export const DELETE_INVITATION_SUCCESS = 'Team/DELETE_INVITATION_SUCCESS'
export const DELETE_INVITATION_ERROR = 'Team/DELETE_INVITATION_ERROR'
export const GET_INVITATION = 'Team/GET_INVITATION'
export const GET_INVITATION_SUCCESS = 'Team/GET_INVITATION_SUCCESS'
export const GET_INVITATION_ERROR = 'Team/GET_INVITATION_ERROR'
export const ACCEPT_INVITATION = 'Team/ACCEPT_INVITATION'
export const ACCEPT_INVITATION_SUCCESS = 'Team/ACCEPT_INVITATION_SUCCESS'
export const ACCEPT_INVITATION_ERROR = 'Team/ACCEPT_INVITATION_ERROR'
export const POSTPONE_INVITATION = 'Team/POSTPONE_INVITATION'
export const POSTPONE_INVITATION_SUCCESS = 'Team/POSTPONE_INVITATION_SUCCESS'
export const POSTPONE_INVITATION_ERROR = 'Team/POSTPONE_INVITATION_ERROR'

/**
 * Team state
 * @typedef {Object} state
 * @prop {array} [team] - Team list
 */
const initialState = {
  team: {},
  ui: {
    loading: false
  },
  invitations: [],
  ticket: {}
}

/**
 * Reducer
 * @param {state} [state=initialState] - Team state or initial state
 * @param {object} action - the action type and payload
 */
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_TEAM:
    case FETCH_INVITATIONS:
    case GET_INVITATION:
    case SAVE_ROLE:
    case REMOVE_USER:
      return update(state, {
        ui: {
          loading: {$set: true}
        }
      })
    case FETCH_TEAM_SUCCESS:
      return update(state, {
        team: {$set: action.data},
        ui: {
          loading: {$set: false}
        }
      })
    case FETCH_TEAM_ERROR:
      return update(state, {
        team: {$set: {}},
        ui: {
          loading: {$set: false}
        }
      })
    case SAVE_ROLE_SUCCESS:
    case SAVE_ROLE_ERROR:
    case REMOVE_USER_SUCCESS:
    case REMOVE_USER_ERROR:
    case DELETE_INVITATION_ERROR:
      return update(state, {
        ui: {
          loading: {$set: false}
        }
      })
    case FETCH_INVITATIONS_SUCCESS:
      return update(state, {
        invitations: {$set: action.data},
        ui: {
          loading: {$set: false}
        }
      })
    case FETCH_INVITATIONS_ERROR:
      return update(state, {
        invitations: {$set: []},
        ui: {
          loading: {$set: false}
        }
      })
    case CREATE_INVITATION_SUCCESS:
      return update(state, {
        invitations: { $push: [action.data] },
        ui: {
          loading: { $set: false }
        }
      })
    case DELETE_INVITATION_SUCCESS:
      return update(state, {
        invitations: { $apply: invitations => invitations.filter(inv => action.data.invId !== inv.id) },
        ui: {
          loading: { $set: false }
        }
      })
    case GET_INVITATION_SUCCESS:
      return update(state, {
        ticket: {$set: action.data},
        ui: {
          loading: {$set: false}
        }
      })
    case GET_INVITATION_ERROR:
      return update(state, {
        ticket: {$set: {}},
        ui: {
          loading: {$set: false}
        }
      })
    default:
      return state
  }
}

/**
 * Fetch Team action creator
 */
export function fetchTeam () {
  return {type: FETCH_TEAM}
}

/**
 * Fetch Team success
 * @param {Object} data - data received from the successful call
 */
export function fetchTeamSuccess (data) {
  return {type: FETCH_TEAM_SUCCESS, data}
}

/**
 * Fetch Team error
 */
export function fetchTeamError (error) {
  return {type: FETCH_TEAM_ERROR, error}
}

/**
 * Save role action creator
 */
export function saveRole (userId, oldRoleId, newRoleId) {
  return {type: SAVE_ROLE, userId, oldRoleId, newRoleId}
}

/**
 * Save role success
 * @param {Object} data - data received from the successful call
 */
export function saveRoleSuccess (data) {
  return {type: SAVE_ROLE_SUCCESS, data}
}

/**
 * Save role error
 */
export function saveRoleError (error) {
  return {type: SAVE_ROLE_ERROR, error}
}

/**
 * Remove user action creator
 */
export function removeUser (userId) {
  return {type: REMOVE_USER, userId}
}

/**
 * Remove user success
 * @param {Object} data - data received from the successful call
 */
export function removeUserSuccess (data) {
  return {type: REMOVE_USER_SUCCESS, data}
}

/**
 * Remove user error
 */
export function removeUserError (error) {
  return {type: REMOVE_USER_ERROR, error}
}

/**
 * Fetch invitations action creator
 */
export function fetchInvitations () {
  return { type: FETCH_INVITATIONS }
}

/**
 * Fetch invitations success
 * @param {Object} data - data received from the successful call
 */
export function fetchInvitationsSuccess (data) {
  return { type: FETCH_INVITATIONS_SUCCESS, data }
}

/**
 * Fetch invitations error
 */
export function fetchInvitationsError (error) {
  return { type: FETCH_INVITATIONS_ERROR, error }
}

/**
 * Create invitation action creator
 */
export function createInvitation (organizationId, data) {
  return { type: CREATE_INVITATION, organizationId, data }
}

/**
 * Create invitation success
 * @param {Object} data - data received from the successful call
 */
export function createInvitationSuccess (data) {
  return { type: CREATE_INVITATION_SUCCESS, data }
}

/**
 * Create invitation error
 */
export function createInvitationError (error) {
  return { type: CREATE_INVITATION_ERROR, error }
}

/**
 * Delete invitation action creator
 */
export function deleteInvitation (organizationId, invId) {
  return { type: DELETE_INVITATION, organizationId, invId }
}

/**
 * Delete invitation success
 * @param {Object} data - data received from the successful call
 */
export function deleteInvitationSuccess (data) {
  return { type: DELETE_INVITATION_SUCCESS, data }
}

/**
 * Delete invitation error
 */
export function deleteInvitationError (error) {
  return { type: DELETE_INVITATION_ERROR, error }
}

/**
 * Get invitation action creator
 */
export function getInvitation (invId) {
  return { type: GET_INVITATION, invId }
}

/**
 * Get invitation success
 * @param {Object} data - data received from the successful call
 */
export function getInvitationSuccess (data) {
  return { type: GET_INVITATION_SUCCESS, data }
}

/**
 * Get invitation error
 */
export function getInvitationError (error) {
  return { type: GET_INVITATION_ERROR, error }
}

/**
 * Accept organization invitation action creator
 */
export function acceptInvitation (invId) {
  return { type: ACCEPT_INVITATION, invId }
}

/**
 * Accept organization invitation success
 * @param {Object} data - data received from the successful call
 */
export function acceptInvitationSuccess (data) {
  return { type: ACCEPT_INVITATION_SUCCESS, data }
}

/**
 * Accept organization invitation error
 */
export function acceptInvitationError (error) {
  return { type: ACCEPT_INVITATION_ERROR, error }
}

/**
 * Postpone organization invitation action creator
 */
export function postponeInvitation (invId) {
  return { type: POSTPONE_INVITATION, invId }
}

/**
 * Postpone organization invitation success
 * @param {Object} data - data received from the successful call
 */
export function postponeInvitationSuccess (data) {
  return { type: POSTPONE_INVITATION_SUCCESS, data }
}

/**
 * Postpone organization invitation error
 */
export function postponeInvitationError (error) {
  return { type: POSTPONE_INVITATION_ERROR, error }
}
