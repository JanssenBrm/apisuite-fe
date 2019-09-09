import React from 'react'
import { mountWithIntl } from 'util/test-utils'
import { IntlProvider } from 'react-intl'
import { translationMessages, formats } from 'util/i18n'
import Profile from './Profile'
import OrganisationSection from './OrganisationSection'
import PasswordVisibleIcon from '@material-ui/icons/Visibility'
import request from 'util/request'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { fetchOrganizationsSaga, updateOrganizationSaga } from './sagas'
import reducer, {
  fetchOrganizations,
  fetchOrganizationsSuccess,
  fetchOrganizationsError,
  updateOrganization,
  updateOrganizationSuccess,
  updateOrganizationError,
} from './ducks'

const intlProvider = new IntlProvider({ locale: 'en', messages: translationMessages.en, formats })
const { intl } = intlProvider.getChildContext()

const mockOrganizations = [
  {
    id: 123456,
    name: 'THE BANK',
    vat: '123456789',
    website: 'https://www.thebank.com',
    createdAt: '2018/02/01',
    updatedAt: '2018/02/01',
  },
]

const userMock = {
  id: 1,
  fullName: 'John Doe',
  bio: 'Sed posuere consectetur',
  email: 'johndoe@mail.com',
  phone: '123',
  avatar: '',
  method: '2',
  confirmationCode: '',
  github: false,
  organizations: mockOrganizations,
  roles: [
    {
      id: 1,
      orgId: 208,
      name: 'ADMIN',
    },
  ],
}

const organisationMock = {
  id: 123456,
  name: 'THE BANK',
  vat: '123456789',
  website: 'https://www.thebank.com',
}

const errorMock = { message: 'error-stub' }

describe('<Profile />', () => {
  const props = {
    intl,
    user: userMock,
    updateUser: jest.fn(),
    updatePassword: jest.fn(),
    removeAccount: jest.fn(),
    logout: jest.fn(),
    TwoFA: {},
    history: {
      location: {
        pathname: '',
      },
    },
    generateQRCode: jest.fn(),
    sendSMSCode: jest.fn(),
    twoFaUpdate: jest.fn(),
    twoFaVerify: jest.fn(),
    getCodes: jest.fn(),
  }

  const wrapper = mountWithIntl(<Profile {...props} />)

  it('should have two sections', () => {
    expect(wrapper.find('.profile-container')).toHaveLength(1)
    expect(wrapper.find('.profile-section')).toHaveLength(2)
  })

  it('should call updateUser on Save click', () => {
    wrapper.find('#save-profile-btn').first().simulate('click')
    expect(props.updateUser).toHaveBeenCalled()

    wrapper.setProps({ user: userMock })

    expect(wrapper.state().user).toEqual(userMock)
    expect(wrapper.props().user).toEqual(userMock)
  })

  it('should call updatePassword on Change click', () => {
    wrapper.setState({ oldPassword: 'oldpass', newPassword: 'mynewpassA1&' })
    wrapper.find('#change-pass-btn').first().simulate('click')
    expect(props.updatePassword).toHaveBeenCalled()

    expect(wrapper.state().oldPassword).toEqual('oldpass')
  })

  it('should toggle password visibility', () => {
    wrapper.find('#new-password-icon').first().simulate('click')
    wrapper.find('#old-password-icon').first().simulate('click')
    expect(wrapper.state().newPasswordVisible).toEqual(true)
    expect(wrapper.state().oldPasswordVisible).toEqual(true)
    expect(wrapper.find(PasswordVisibleIcon).length).toEqual(2)
  })

  it('should have the confirmation modal untoggled', () => {
    expect(wrapper.state().confirmationOpen).toEqual(false)
  })

  it('should toggle the confirmation modal but not trigger actions', () => {
    wrapper.find('#remove-account-trigger').first().simulate('click')
    expect(wrapper.state().confirmationOpen).toEqual(true)
    expect(props.removeAccount).toHaveBeenCalledTimes(0)
  })

  it('should cancel account removal', () => {
    wrapper.find('#dialog-cancel').first().simulate('click')
    expect(wrapper.state().confirmationOpen).toEqual(false)
    expect(props.removeAccount).toHaveBeenCalledTimes(0)
  })

  it('should trigger account removal action', () => {
    wrapper.find('#remove-account-trigger').first().simulate('click')
    wrapper.find('#remove-account-confirm').first().simulate('click')
    expect(props.removeAccount).toHaveBeenCalledTimes(1)
  })
})

describe('<OrganisationSection />', () => {
  const props = {
    intl,
    organisation: organisationMock,
    onboardingToken: {},
    updateOrganisation: jest.fn(),
    fetchOrganizations: jest.fn(),
    updateOrganization: jest.fn(),
    getOnboardingToken: jest.fn(),
  }

  const wrapper = mountWithIntl(<OrganisationSection {...props} />)

  it('should have a container div', () => {
    expect(wrapper.find('.profile-container')).toHaveLength(1)
    expect(wrapper.find('.profile-section')).toHaveLength(1)
  })

  it('should call updateOrganisation on Save click', () => {
    const editedOrganisation = { ...organisationMock, description: 'k' }
    wrapper.setState({ organisation: editedOrganisation })
    wrapper.find('#save-organisation-btn').first().simulate('click')
    expect(props.updateOrganization).toHaveBeenCalled()

    wrapper.setProps({ organisation: editedOrganisation })

    expect(wrapper.state().organisation).toEqual(editedOrganisation)
    expect(wrapper.props().organisation).toEqual(editedOrganisation)
  })
})

const initialState = {
  data: [],
  organization: {},
  onboardingToken: {},
  ui: {
    loading: false,
  },
}

describe('Profile reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should update state on FETCH_ORGANIZATIONS', () => {
    expect(reducer(initialState, fetchOrganizations())).toEqual({ ...initialState, ui: { loading: true } })
  })

  it('should update state on FETCH_ORGANIZATIONS_SUCCESS', () => {
    expect(reducer(initialState, fetchOrganizationsSuccess(mockOrganizations))).toEqual({ ...initialState, data: mockOrganizations })
  })

  it('should update state on FETCH_ORGANIZATIONS_ERROR', () => {
    expect(reducer(initialState, fetchOrganizationsError(errorMock))).toEqual({ ...initialState, data: [] })
  })

  it('should update state on UPDATE_ORGANIZATION', () => {
    expect(reducer(initialState, updateOrganization(organisationMock))).toEqual({ ...initialState, ui: { loading: true } })
  })

  it('should update state on UPDATE_ORGANIZATION_SUCCESS', () => {
    const editOrganization = {
      id: 123456,
      name: 'THE BANK edit',
      vat: '123456789',
      website: 'https://www.thebank.com',
    }
    expect(reducer({ ...initialState, data: mockOrganizations }, updateOrganizationSuccess(editOrganization))).toEqual({ ...initialState, data: [editOrganization], organization: editOrganization })
  })

  it('should update state on UPDATE_APP_ERROR', () => {
    expect(reducer(initialState, updateOrganizationError(errorMock))).toEqual({ ...initialState, ui: { loading: false } })
  })
})

describe('Profile sagas', () => {
  it('should call fetchOrganizations and return an array', () => {
    const fakeResponse = { data: mockOrganizations }

    return expectSaga(fetchOrganizationsSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(fetchOrganizationsSuccess(mockOrganizations))
      .dispatch(fetchOrganizations())
      .silentRun()
  })

  it('should call fetchOrganizations and handle the error', () => {
    const fakeResponse = { err: errorMock }

    return expectSaga(fetchOrganizationsSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(fetchOrganizationsError(errorMock))
      .dispatch(fetchOrganizations())
      .silentRun()
  })

  it('should call updateOrganization and return an object', () => {
    const fakeResponse = { data: organisationMock }

    return expectSaga(updateOrganizationSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(updateOrganizationSuccess(organisationMock))
      .dispatch(updateOrganization(organisationMock))
      .silentRun()
  })

  it('should call updateOrganization and handle the error', () => {
    const fakeResponse = { err: errorMock }

    return expectSaga(updateOrganizationSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(updateOrganizationError(errorMock))
      .dispatch(updateOrganization(organisationMock))
      .silentRun()
  })
})
