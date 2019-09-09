
import React from 'react'
import { shallowWithIntl, mountWithIntl } from 'util/test-utils'
import request from 'util/request'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { signupUserSaga, signupOrganizationSaga, signupSecuritySaga, sendActivationEmailSaga, generateQRCodeSaga, sendSMSCodeSaga } from './sagas'
import Signup from './Signup'
import PersonalDetails from './PersonalDetails'
import OrganisationDetails from './OrganisationDetails'
import SecuritySetup from './SecuritySetup'
import SuccessPage from './SuccessPage'
import ActivationPage from './ActivationPage'
import InvitationPage from './InvitationPage'

import reducer, {
  signupUser,
  signupUserSuccess,
  signupUserError,
  signupOrganization,
  signupOrganizationSuccess,
  signupOrganizationError,
  signupSecurity,
  signupSecuritySuccess,
  signupSecurityError,
  sendActivationEmail,
  sendActivationEmailSuccess,
  sendActivationEmailError,
  generateQRCode,
  generateQRCodeSuccess,
  generateQRCodeError,
  sendSMSCode,
  sendSMSCodeSuccess,
  sendSMSCodeError,
  skipStep,
} from './ducks'
import { translationMessages, formats } from 'util/i18n'
import { IntlProvider } from 'react-intl'

const intlProvider = new IntlProvider({ locale: 'en', messages: translationMessages.en, formats })
const { intl } = intlProvider.getChildContext()

const initialState = {
  ui: {
    loading: false,
  },
  user: {},
  error: null,
  step: 1,
  qrcode: '',
}
const errorMock = { message: 'error-stub' }

const fakeUi = {
  loading: false,
}

const fakeUserResponse = {
  email: 'mh@appcenter.be',
  fullName: 'Marie Mai',
  password: 'password',
  role: 'user',
  id: 2,
  codes: ['zfo5F-vPldM', 'zfo5F-vPldM', 'zfo5F-vPldM', 'zfo5F-vPldM', 'zfo5F-vPldM', 'zfo5F-vPldM'],
}

const fakeForm = {
  email: 'email@example.be',
  confirmEmail: 'email@example.be',
  fullName: 'MH Mai',
  phoneNumber: '+351968887711',
  terms: true,
  privacy: true,
  organisationName: 'MyOrganisation',
  vat: '',
  website: '',
  position: '',
  password: 'M1 super password',
}

const fakePersonalDetails = {
  email: 'email@example.be',
  fullName: 'MH Mai',
  phoneNumber: '+351968887711',
}

const fakeOrganizationDetails = {
  organisationName: 'MyOrganisation',
  vat: '121232',
  website: 'http://test.com',
  position: 'Developer',
}

const fakeSecurityDetails = {
  password: 'P4ssword',
  method: 'authorizationApp',
  confirmationCode: '665754',
}

const fakeEmailPayload = {
  email: 'example@gmail.com',
  userID: 1,
}

const mockState = {
  signup: {
    user: {
      token: '123',
    },
  },
  team: {
    ticket: {},
  },
}

describe('<PersonalDetails />', () => {
  const state = {
    showErrors: false,
    form: {
      email: '',
      confirmEmail: '',
      fullName: '',
      phoneNumber: '',
      terms: false,
      privacy: false,
    },
    errors: [],
  }

  const props = {
    invitation: {},
    ui: fakeUi,
    nextStep: jest.fn(),
    intl,
    goToTerms: jest.fn(),
    goToPrivacy: jest.fn(),
  }

  const wrapper = mountWithIntl(<PersonalDetails {...props} />)
  wrapper.setState(state)

  it('should not call nextStep if fullName and email are not filled', () => {
    wrapper.find('.signup-submit').first().simulate('click')
    expect(props.nextStep).not.toHaveBeenCalled()
  })

  it('should not call nextStep if terms or privacy are not checked', () => {
    const { email, confirmEmail, fullName, phoneNumber } = fakeForm
    wrapper.setState({ form: { email, confirmEmail, fullName, phoneNumber, terms: false, privacy: true } })
    wrapper.find('.signup-submit').first().simulate('click')
    expect(props.nextStep).not.toHaveBeenCalled()
  })

  it('should not call nextStep if email is invalid or confirmation does not match', () => {
    const { fullName, phoneNumber } = fakeForm
    wrapper.setState({ form: { email: 'email-not-valid', confirmEmail: 'email-not-valid', fullName, phoneNumber, terms: true, privacy: true } })
    wrapper.find('.signup-submit').first().simulate('click')
    expect(props.nextStep).not.toHaveBeenCalled()

    wrapper.setState({ form: { email: 'email@cloudoki.com', confirmEmail: 'email2@cloudoki.com', fullName, phoneNumber, terms: true, privacy: true } })
    wrapper.find('.signup-submit').first().simulate('click')
    expect(props.nextStep).not.toHaveBeenCalled()
  })

  it('should call nextStep if fullName, email and phoneNumber are filled and terms and privacy checked', () => {
    const { email, confirmEmail, fullName, phoneNumber } = fakeForm
    wrapper.setState({ form: { email, confirmEmail, fullName, phoneNumber, terms: true, privacy: true } })
    wrapper.find('.signup-submit').first().simulate('click')
    expect(props.nextStep).toHaveBeenCalled()
  })
})

describe('<OrganisationDetails />', () => {
  const state = {
    showErrors: false,
    form: {
      organisationName: '',
      vat: '',
      website: '',
      position: '',
    },
    errors: [],
  }

  const props = {
    ui: fakeUi,
    previousStep: jest.fn(),
    nextStep: jest.fn(),
    skipStep: jest.fn(),
    intl,
  }

  const wrapper = shallowWithIntl(<OrganisationDetails {...props} />)
  wrapper.setState(state)

  it('should not call nextStep if there is errors', () => {
    wrapper.setState({ errors: ['organisationName'] })
    wrapper.find('.signup-submit').first().simulate('click')
    expect(props.nextStep).not.toHaveBeenCalled()
  })

  it('should call nextStep if there is no errors', () => {
    wrapper.setState({ errors: [] })
    wrapper.find('#organisation-name').first().simulate('change', { target: { name: 'organisationName', value: fakeForm.organisationName } })
    wrapper.find('.signup-submit').first().simulate('click')
    expect(props.nextStep).toHaveBeenCalled()
  })

  it('should call skipStep', () => {
    wrapper.find('#skip-button').first().simulate('click')
    expect(props.skipStep).toHaveBeenCalled()
  })
})

describe('<SecuritySetup />', () => {
  const state = {
    showErrors: false,
    form: {
      password: '',
      method: '1',
      confirmationCode: '123456',
    },
    errors: [],
  }

  const props = {
    ui: fakeUi,
    previousStep: jest.fn(),
    intl,
    handleSubmit: jest.fn(),
    email: 'example@gmail.com',
    number: '+33622222222',
    qrcode: 'qrcode',
    generateQRCode: jest.fn(),
    sendSMSCode: jest.fn(),
    sendSecurityDetails: jest.fn(),
    history: { location: { pathname: '/signup' } },
    route: '/signup',
  }

  const wrapper = mountWithIntl(<SecuritySetup {...props} />)
  wrapper.setState(state)

  it('should not call handleSubmit if there is errors', () => {
    wrapper.setState({ errors: ['password'] })
    wrapper.find('.signup-submit').first().simulate('click')
    expect(props.handleSubmit).not.toHaveBeenCalled()
  })

  it('should not call handleSubmit if password length < 8', () => {
    wrapper.setState({ errors: ['password'], form: { ...state.form, password: 'p-not-k' } })
    wrapper.find('.signup-submit').first().simulate('click')
    expect(props.handleSubmit).not.toHaveBeenCalled()
  })

  it('should call sendSecurityDetails if there is no errors and password, method and confirmationCode are valid', () => {
    wrapper.setState({ errors: [], form: { ...state.form, password: fakeForm.password, method: '1', confirmationCode: '123456' } })
    wrapper.find('.signup-submit').last().simulate('click')
    expect(props.sendSecurityDetails).toHaveBeenCalled()
  })

  it('should call generate passPhrase', () => {
    const handleChangeSpy = jest.spyOn(wrapper.instance(), 'handleChange')
    wrapper.find('#security-generate-pass-btn').first().simulate('click')
    expect(handleChangeSpy).toHaveBeenCalled()
  })
})

describe('<SuccessPage />', () => {
  const props = {
    openLoginModal: jest.fn(),
    intl,
    sendActivationEmail: jest.fn(),
    user: {
      email: '',
      id: '',
      roles: [
        {
          id: 1,
          orgId: 208,
          name: 'ADMIN',
        },
      ],
    },
    history: {
      push: jest.fn(),
    },
    invitation: {},
  }
  const wrapper = shallowWithIntl(<SuccessPage {...props} />)

  it('should render 3 items', () => {
    expect(wrapper.find('.signup-success-item')).toHaveLength(3)
  })

  it('should render 2 items on invitation flow', () => {
    wrapper.setProps({ invitation: { invitationCode: 'xyz' } })
    expect(wrapper.find('.signup-success-item')).toHaveLength(2)
  })

  it('should call getRecoveryCodes on link click', () => {
    wrapper.find('.recovery-codes-link').first().simulate('click')
    expect(props.history.push).toHaveBeenCalledWith('/recovery-codes')
  })
})

describe('<ActivationPage />', () => {
  const props = {
    openLoginModal: jest.fn(),
    intl,
    sendActivationEmail: jest.fn(),
    auth: {
      user: {
        email: 'email-stub@gmail.com',
      },
    },
  }
  const wrapper = shallowWithIntl(<ActivationPage {...props} />)

  it('should call sendActivationEmail on button click', () => {
    wrapper.find('#resend-btn').first().simulate('click')
    expect(props.sendActivationEmail).toHaveBeenCalled()
  })
})

describe('<InvitationPage />', () => {
  const props = {
    intl,
    history: {
      push: jest.fn(),
    },
    location: { search: '?ticket=1234', pathname: '/signup' },
    invitation: { isRegistered: true },
    getInvitation: jest.fn(),
    acceptInvitation: jest.fn(),
    postponeInvitation: jest.fn(),
    skipStep: jest.fn(),
    error: null,
  }
  const wrapper = shallowWithIntl(<InvitationPage {...props} />)

  wrapper.setState({ loading: false })

  it('should call acceptInvitation on button click', () => {
    wrapper.find('#invitation-join-btn').first().simulate('click')
    expect(props.acceptInvitation).toHaveBeenCalled()
  })

  it('should redirect to signup if user is not registered', () => {
    wrapper.setProps({ invitation: { isRegistered: false } })
    wrapper.find('#invitation-join-btn').first().simulate('click')
    expect(props.history.push).toHaveBeenCalledWith('/signup')
  })

  it('should call postponeInvitation on remindMeLater button click', () => {
    wrapper.find('#invitation-remind-btn').first().simulate('click')
    expect(props.postponeInvitation).toHaveBeenCalled()
  })
})

describe('<Signup />', () => {
  const props = {
    signup: {
      step: 1,
      TwoFA: {
        qrcode: 'qrcode',
      },
    },
    ui: fakeUi,
    intl,
    history: {
      push: jest.fn(),
      location: {},
    },
    location: { search: '', pathname: '/signup' },
    auth: {
      user: {},
    },
    invitation: {},
    openLoginModal: jest.fn(),
    sendActivationEmail: jest.fn(),
    generateQRCode: jest.fn(),
    sendSMSCode: jest.fn(),
    sendSecurityDetails: jest.fn(),
    number: '+33622222222',
    signupUser: jest.fn(),
    signupOrganization: jest.fn(),
    signupSecurity: jest.fn(),
    skipStep: jest.fn(),
    resetSignup: jest.fn(),
    getInvitation: jest.fn(),
    acceptInvitation: jest.fn(),
    postponeInvitation: jest.fn(),
  }

  const wrapper = mountWithIntl(<Signup {...props} />)

  it('should not call signup if password is empty', () => {
    wrapper.setProps({ signup: { step: 3 } })
    wrapper.find('.signup-submit').last().simulate('click')
    expect(props.signupUser).not.toHaveBeenCalled()
  })

  it('should call signupUser if mandatory form fields are valid', () => {
    wrapper.setProps({ signup: { step: 1 } })
    expect(wrapper.find(PersonalDetails)).toHaveLength(1)
    wrapper.instance().handleSubmit(fakePersonalDetails)
    expect(props.signupUser).toHaveBeenCalled()
  })

  // it('should navigate to terms on link click', () => {
  //   wrapper.find('#signup-terms-link').first().simulate('click')
  //   expect(props.history.push).toHaveBeenCalledWith('/terms')
  // })

  it('should call signupOrganization if mandatory form fields are valid', () => {
    wrapper.setProps({ signup: { step: 2 } })
    expect(wrapper.find(OrganisationDetails)).toHaveLength(1)
    wrapper.instance().handleSubmit(fakeOrganizationDetails)
    expect(props.signupOrganization).toHaveBeenCalled()
  })

  it('should call signupSecurity if mandatory form fields are valid', () => {
    wrapper.setProps({ signup: { step: 3 } })
    expect(wrapper.find(SecuritySetup)).toHaveLength(1)
    wrapper.instance().handleSubmit(fakeSecurityDetails)
    expect(props.signupSecurity).toHaveBeenCalled()
  })

  it('should display loading UI on step 4', () => {
    wrapper.setProps({ signup: { step: 4 } })
    expect(wrapper.find('.signup-loading')).toHaveLength(1)
  })

  it('should display ActivationPage if user is not activated', () => {
    wrapper.setProps({ auth: { user: { id: '1', activated: false } } })
    expect(wrapper.find(ActivationPage)).toHaveLength(1)
  })
})

describe('Signup reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should update state on SIGNUP_USER', () => {
    expect(reducer(initialState, signupUser(fakePersonalDetails))).toEqual({
      ...initialState,
      ui: { loading: true },
    })
  })

  it('should update state on SIGNUP_USER_SUCCESS', () => {
    const fakeResponse = {
      token: 'T25vAL7AD57cCt2!GSNm51Pbr9Qnb%u4mNkYvB$aHFSZnbbZ',
      expiresAt: '2018-09-10T15:34:20.099Z',
    }
    expect(reducer(initialState, signupUserSuccess(fakeResponse))).toEqual({
      ...initialState,
      ui: { loading: false },
      step: initialState.step + 1,
      user: fakeResponse,
    })
  })

  it('should update state on SIGNUP_USER_ERROR', () => {
    expect(reducer(initialState, signupUserError(errorMock))).toEqual({
      ...initialState,
      ui: { loading: false },
      error: errorMock,
    })
  })

  it('should update state on SIGNUP_ORGANIZATION', () => {
    expect(reducer(initialState, signupOrganization(fakeOrganizationDetails))).toEqual({
      ...initialState,
      ui: { loading: true },
    })
  })

  it('should update state on SIGNUP_ORGANIZATION_SUCCESS', () => {
    expect(reducer(initialState, signupOrganizationSuccess())).toEqual({
      ...initialState,
      ui: { loading: false },
      step: initialState.step + 1,
    })
  })

  it('should update state on SIGNUP_ORGANIZATION_ERROR', () => {
    expect(reducer(initialState, signupOrganizationError(errorMock))).toEqual({
      ...initialState,
      ui: { loading: false },
      error: errorMock,
    })
  })

  it('should update state on SIGNUP_SECURITY', () => {
    expect(reducer(initialState, signupSecurity(fakeSecurityDetails))).toEqual({
      ...initialState,
      ui: { loading: true },
    })
  })

  it('should update state on SIGNUP_SECURITY_SUCCESS', () => {
    expect(reducer(initialState, signupSecuritySuccess(fakeUserResponse))).toEqual({
      ...initialState,
      ui: { loading: false },
      step: initialState.step + 1,
      user: fakeUserResponse,
    })
  })

  it('should update state on SIGNUP_SECURITY_ERROR', () => {
    expect(reducer(initialState, signupSecurityError(errorMock))).toEqual({
      ...initialState,
      ui: { loading: false },
      error: errorMock,
    })
  })

  it('should update state on GENERATE_QRCODE_SUCCESS', () => {
    const fakeQRCode = 'qrcode'

    expect(reducer(initialState, generateQRCodeSuccess(fakeQRCode))).toEqual({
      ...initialState,
      qrcode: fakeQRCode,
    })
  })

  it('should update state on SKIP_STEP', () => {
    expect(reducer(initialState, skipStep())).toEqual({
      ...initialState,
      step: initialState.step + 1,
    })
  })
})

describe('Signup sagas', () => {
  it('should call signupUser API and return a registration token', () => {
    const fakeResponse = { data: fakeUserResponse }

    return expectSaga(signupUserSaga)
      .withState(mockState)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(signupUserSuccess(fakeUserResponse))
      .dispatch(signupUser(fakePersonalDetails))
      .silentRun()
  })

  it('should call signupUser and handle the error', () => {
    const fakeResponse = { err: errorMock }

    return expectSaga(signupUserSaga)
      .withState(mockState)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(signupUserError(errorMock))
      .dispatch(signupUser(fakePersonalDetails))
      .silentRun()
  })

  it('should call signupOrganization and return 204 No Content', () =>
    expectSaga(signupOrganizationSaga)
      .withState(mockState)
      .provide([[matchers.call.fn(request), {}]])
      .put(signupOrganizationSuccess())
      .dispatch(signupOrganization(fakeOrganizationDetails))
      .silentRun()
  )

  it('should call signupOrganization and handle the error', () => {
    const fakeResponse = { err: errorMock }

    return expectSaga(signupOrganizationSaga)
      .withState(mockState)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(signupOrganizationError(errorMock))
      .dispatch(signupOrganization(fakeOrganizationDetails))
      .silentRun()
  })

  it('should call signupSecurity and return a user object', () => {
    const fakeResponse = { data: fakeUserResponse }

    return expectSaga(signupSecuritySaga)
      .withState(mockState)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(signupSecuritySuccess(fakeUserResponse))
      .dispatch(signupSecurity(fakeSecurityDetails))
      .silentRun()
  })

  it('should call signupSecurity and handle the error', () => {
    const fakeResponse = { err: errorMock }

    return expectSaga(signupSecuritySaga)
      .withState(mockState)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(signupSecurityError(errorMock))
      .dispatch(signupSecurity(fakeSecurityDetails))
      .silentRun()
  })

  it('should call sendActivationEmail and send an email', () =>
    expectSaga(sendActivationEmailSaga)
      .withState(mockState)
      .provide([[matchers.call.fn(request), {}]])
      .put(sendActivationEmailSuccess())
      .dispatch(sendActivationEmail(fakeEmailPayload))
      .silentRun()
  )

  it('should call sendActivationEmail and handle the error', () => {
    const fakeResponse = { err: errorMock }

    return expectSaga(sendActivationEmailSaga)
      .withState(mockState)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(sendActivationEmailError(errorMock))
      .dispatch(sendActivationEmail(fakeEmailPayload))
      .silentRun()
  })

  it('should call sendSMSCode and send a SMS', () =>
    expectSaga(sendSMSCodeSaga)
      .withState(mockState)
      .provide([[matchers.call.fn(request), {}]])
      .put(sendSMSCodeSuccess())
      .dispatch(sendSMSCode())
      .silentRun()
  )

  it('should call sendSMSCode and handle the error', () => {
    const fakeResponse = { err: errorMock }

    return expectSaga(sendSMSCodeSaga)
      .withState(mockState)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(sendSMSCodeError(errorMock))
      .dispatch(sendSMSCode())
      .silentRun()
  })

  it('should call generateQRCode and return a QR code', () => {
    const fakeQRCode = 'qrcode'
    const fakeResponse = { data: fakeQRCode }

    return expectSaga(generateQRCodeSaga)
      .withState(mockState)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(generateQRCodeSuccess(fakeQRCode))
      .dispatch(generateQRCode())
      .silentRun()
  })

  it('should call generateQRCode and handle the error', () => {
    const fakeResponse = { err: errorMock }

    return expectSaga(generateQRCodeSaga)
      .withState(mockState)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(generateQRCodeError(errorMock))
      .dispatch(generateQRCode())
      .silentRun()
  })
})
