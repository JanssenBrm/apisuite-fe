import update from 'immutability-helper'
import {
  RegisterFormStore,
  RegisterFormActions,
  isStep,
  PersonalDetails,
  OrganisationDetails,
  SecurityStep,
  PersonalDetailsResponse,
  PersonalDetailsResponseErrorObject,
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

  CONFIRM_REGISTRATION_REQUEST = 'CONFIRM_REGISTRATION_REQUEST',
  CONFIRM_REGISTRATION_SUCCESS = 'CONFIRM_REGISTRATION_SUCCESS',
  CONFIRM_REGISTRATION_ERROR = 'CONFIRM_REGISTRATION_ERROR',

  VALIDATE_REGISTRATION_TOKEN_REQUEST = 'VALIDATE_REGISTRATION_TOKEN_REQUEST',
  VALIDATE_REGISTRATION_TOKEN_SUCCESS = 'VALIDATE_REGISTRATION_TOKEN_SUCCESS',
  VALIDATE_REGISTRATION_TOKEN_ERROR = 'VALIDATE_REGISTRATION_TOKEN_ERROR',

  NEXT_STEP = 'NEXT_STEP'
}

const IState: RegisterFormStore = {
  isRequesting: false,
  error: undefined,
  registrationToken: undefined,
  step: 1,
  submittedEmail: '',
  invitation: {
    email: undefined,
  },
  invitationError: undefined,
}

export default function registerFormReducer (
  state = IState,
  action: RegisterFormActions,
): RegisterFormStore {
  switch (action.type) {
    case RegisterFormActionTypes.NEXT_STEP: {
      const nextStep = state.step + 1

      // if we have an invitation skip setp 2
      if (state.invitation && state.invitation.email && nextStep === 2) {
        const skipedStep = nextStep + 1
        return update(state, {
          // @ts-ignore
          step: { $set: skipedStep },
        })
      }

      // If 'nextStep' ever amounts to '5', it means we have reached the 'Confirm registration' view.
      if (nextStep === 5) {
        return update(state, {
          step: { $set: 1 },
        })
      }

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
        isRequesting: { $set: false },
        submittedEmail: { $set: '' },
      })
    }

    case RegisterFormActionTypes.SUBMIT_PERSONAL_DETAILS_REQUEST:
      return update(state, {
        isRequesting: { $set: true },
        error: { $set: undefined },
        submittedEmail: { $set: action.payload.email },
      })
    case RegisterFormActionTypes.SUBMIT_ORGANISATION_DETAILS_REQUEST:
    case RegisterFormActionTypes.SUBMIT_SECURITY_STEP_REQUEST:
    case RegisterFormActionTypes.VALIDATE_REGISTRATION_TOKEN_REQUEST: {
      return update(state, {
        isRequesting: { $set: true },
      })
    }

    case RegisterFormActionTypes.SUBMIT_PERSONAL_DETAILS_ERROR:
      /* The submission of one's personal details can fail for a number of
      reasons (e.g., connection issues, bad requests, ...), one of them
      being an e-mail address that's already in use. When this happens,
      the back-end's response status is '409'. */
      return update(state, {
        isRequesting: { $set: false },
        error: { $set: `${action.error.response.status}` },
      })

    case RegisterFormActionTypes.SUBMIT_ORGANISATION_DETAILS_SUCCESS:
    case RegisterFormActionTypes.SUBMIT_ORGANISATION_DETAILS_ERROR:
    case RegisterFormActionTypes.SUBMIT_SECURITY_STEP_SUCCESS:
    case RegisterFormActionTypes.SUBMIT_SECURITY_STEP_ERROR: {
      return update(state, {
        isRequesting: { $set: false },
      })
    }

    case RegisterFormActionTypes.VALIDATE_REGISTRATION_TOKEN_SUCCESS: {
      return update(state, {
        invitation: { $set: action.response },
        isRequesting: { $set: false },
      })
    }
    case RegisterFormActionTypes.VALIDATE_REGISTRATION_TOKEN_ERROR: {
      return update(state, {
        invitationError: { $set: action.error },
        isRequesting: { $set: false },
      })
    }

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
  error: (error: PersonalDetailsResponseErrorObject) => {
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
  success: () => {
    return {
      type: RegisterFormActionTypes.SUBMIT_ORGANISATION_DETAILS_SUCCESS,
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
  success: () => {
    return {
      type: RegisterFormActionTypes.SUBMIT_SECURITY_STEP_SUCCESS,
    } as const
  },
  error: (error: string) => {
    return {
      type: RegisterFormActionTypes.SUBMIT_SECURITY_STEP_ERROR,
      error: error,
    } as const
  },
}

export const confirmRegistrationActions = {
  request: (token: string) => {
    return {
      type: RegisterFormActionTypes.CONFIRM_REGISTRATION_REQUEST,
      payload: { token: token },
    } as const
  },
  success: (response: any) => {
    return {
      type: RegisterFormActionTypes.CONFIRM_REGISTRATION_SUCCESS,
      response: response,
    } as const
  },
  error: (error: string) => {
    return {
      type: RegisterFormActionTypes.CONFIRM_REGISTRATION_ERROR,
      error: error,
    } as const
  },
}

export const validateRegisterTokenActions = {
  request: (token: string) => {
    return {
      type: RegisterFormActionTypes.VALIDATE_REGISTRATION_TOKEN_REQUEST,
      payload: { token: token },
    } as const
  },
  success: (response: any) => {
    return {
      type: RegisterFormActionTypes.VALIDATE_REGISTRATION_TOKEN_SUCCESS,
      response: response,
    } as const
  },
  error: (error: string) => {
    return {
      type: RegisterFormActionTypes.VALIDATE_REGISTRATION_TOKEN_ERROR,
      error: error,
    } as const
  },
}
