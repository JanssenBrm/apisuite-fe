import update from 'immutability-helper'
import {
  RegisterFormStore,
  RegisterFormActions,
  isStep,
  PersonalDetails,
  OrganisationDetails,
  SecurityStep,
  PersonalDetailsResponse,
} from './types'

export enum RegisterFormActionTypes {
  SUBMIT_PERSONAL_DETAILS_REQUEST = 'SUBMIT_PERSONAL_DETAILS_REQUEST',
  SUBMIT_PERSONAL_DETAILS_SUCCESS = 'SUBMIT_PERSONAL_DETAILS_SUCCESS',
  SUBMIT_PERSONAL_DETAILS_ERROR = 'SUBMIT_PERSONAL_DETAILS_ERROR',

  SUBMIT_ORGANISATION_DETAILS_REQUEST = 'SUBMIT_ORGANISATION_DETAILS_REQUEST',
  SUBMIT_ORGANISATION_DETAILS_SUCCESS = 'SUBMIT_ORGANISATION_DETAILS_SUCCESS',
  SUBMIT_ORGANISATION_DETAILS_ERROR = 'SUBMIT_ORGANISATION_DETAILS_ERROR',

  SUBMIT_SECURITY_STEP_REQUEST = 'SUBMIT_SECURITY_STEP_REQUEST',
  SUBMIT_SECURITY_STEP_SUCCESS = 'SUBMIT_SECURITY_STEP_SUCCESS',
  SUBMIT_SECURITY_STEP_ERROR = 'SUBMIT_SECURITY_STEP_ERROR',

  NEXT_STEP = 'NEXT_STEP'
}

export const registerFormRequestsIState = {
  submitPersonalDetails: {
    isRequesting: false,
    isError: false,
    error: '',
  },
  submitOrganisationDetails: {
    isRequesting: false,
    isError: false,
    error: '',
  },
  submitSecurityStep: {
    isRequesting: false,
    isError: false,
    error: '',
  },
}

const IState: RegisterFormStore = {
  registrationToken: undefined,
  step: 1,
  registerFormRequests: registerFormRequestsIState,
}

export default function registerFormReducer (
  state = IState,
  action: RegisterFormActions,
): RegisterFormStore {
  switch (action.type) {
    case RegisterFormActionTypes.NEXT_STEP: {
      const nextStep = state.step + 1

      if (isStep(nextStep)) {
        return update(state, {
          step: { $set: nextStep },
        })
      }
      return state
    }

    case RegisterFormActionTypes.SUBMIT_PERSONAL_DETAILS_SUCCESS: {
      return update(state, {
        registrationToken: { $set: action.response.token },
      })
    }

    // case LOGIN: {
    //   return update(state, {
    //     isRegistering: { $set: false },
    //     isRegistered: { $set: false },
    //     user: { $set: undefined },
    //     error: { $set: undefined },
    //   })
    // }

    default:
      return state
  }
}

export const nextStepAction = () => ({
  type: RegisterFormActionTypes.NEXT_STEP,
} as const)

export const submitPersonalDetailsActions = {
  request: (personalDetails: PersonalDetails) => {
    return {
      type: RegisterFormActionTypes.SUBMIT_PERSONAL_DETAILS_REQUEST,
      payload: personalDetails,
    } as const
  },
  success: (response: PersonalDetailsResponse) => {
    return {
      type: RegisterFormActionTypes.SUBMIT_PERSONAL_DETAILS_SUCCESS,
      response: response,
    } as const
  },
  error: (error: string) => {
    return {
      type: RegisterFormActionTypes.SUBMIT_PERSONAL_DETAILS_ERROR,
      error: error,
    } as const
  },
}

export const submitOrganisationDetailsActions = {
  request: (organisationDetails: OrganisationDetails) => {
    return {
      type: RegisterFormActionTypes.SUBMIT_ORGANISATION_DETAILS_REQUEST,
      payload: organisationDetails,
    } as const
  },
  success: (response: any) => {
    return {
      type: RegisterFormActionTypes.SUBMIT_ORGANISATION_DETAILS_SUCCESS,
      response: response,
    } as const
  },
  error: (error: string) => {
    return {
      type: RegisterFormActionTypes.SUBMIT_ORGANISATION_DETAILS_ERROR,
      error: error,
    } as const
  },
}

export const submitSecurityStepActions = {
  request: (securityStep: SecurityStep) => {
    return {
      type: RegisterFormActionTypes.SUBMIT_SECURITY_STEP_REQUEST,
      payload: securityStep,
    } as const
  },
  success: (response: any) => {
    return {
      type: RegisterFormActionTypes.SUBMIT_SECURITY_STEP_SUCCESS,
      response: response,
    } as const
  },
  error: (error: string) => {
    return {
      type: RegisterFormActionTypes.SUBMIT_SECURITY_STEP_ERROR,
      error: error,
    } as const
  },
}
