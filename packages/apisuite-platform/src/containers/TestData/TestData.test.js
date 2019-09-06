import React from 'react'
import { mountWithIntl } from 'util/test-utils'
import TestData from './TestData'
import TestDetail from './TestDetail'
import CreateTestUser from './CreateTestUser'
import IconButton from '@material-ui/core/IconButton'
import PasswordVisibleIcon from '@material-ui/icons/VisibilityOutlined'
import { translationMessages, formats } from 'util/i18n'
import { IntlProvider } from 'react-intl'
import request from 'util/request'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { fetchTestDataSaga, createTestUserSaga, getTestUserSaga, updateTestUserSaga } from './sagas'
import reducer, {
  fetchTestData,
  fetchTestDataSuccess,
  fetchTestDataError,
  createTestUser,
  createTestUserSuccess,
  createTestUserError,
  getTestUser,
  getTestUserSuccess,
  getTestUserError,
  updateTestUser,
  updateTestUserSuccess,
  updateTestUserError
} from './ducks'

const intlProvider = new IntlProvider({locale: 'en', messages: translationMessages['en'], formats})
const {intl} = intlProvider.getChildContext()

const errorMock = {message: 'error-stub'}
const mockUsers = [
  {
    'id': 2,
    'email': 'albert.einstein@test.be',
    'language': 'FR',
    'name': 'Albert Einstein',
    'username': '1234567890',
    'password': '91c7058f-9e76-4405-859c-7e004be76387',
    'postalAddress': {
      'country': 'BE',
      'addressLine': [
        '2 rue de la DSP2',
        '1000 Bruxelles'
      ]
    },
    'avatarUrl': null,
    'accounts': [
      {
        'id': 3,
        'resourceId': 'BE12345678901234EUR',
        'bicFi': 'GEBABBEB',
        'name': 'Albert Einstein - FINTRO',
        'details': null,
        'linkedAccount': null,
        'usage': 'PRIV',
        'cashAccountType': 'CACC',
        'product': 'CUR - FINTRO',
        'currency': 'EUR',
        'accountId': {
          'iban': 'BE12345678901234'
        },
        'balances': [
          {
            'id': 5,
            'name': 'Closing balance',
            'balanceType': 'CLBD',
            'referenceDate': '2019-03-26',
            'balanceAmount': {
              'currency': 'EUR',
              'amount': '100.00'
            },
            'lastChangeDateTime': '2019-03-26T14:54:37',
            'lastCommittedTransaction': '2019032620190326190000'
          },
          {
            'id': 6,
            'name': 'Intraday balance',
            'balanceType': 'OTHR',
            'referenceDate': '2019-03-26',
            'balanceAmount': {
              'currency': 'EUR',
              'amount': '100.00'
            },
            'lastChangeDateTime': '2019-03-26T14:54:37',
            'lastCommittedTransaction': '2019032620190326190000'
          }
        ],
        'psuStatus': 'AccountHolder',
        'totalTransactions': 0
      }
    ],
    'totalBalance': 100
  }
]
const mockApps = [
  {
    'id': 1,
    'name': 'My First App',
    'description': 'Very cool app',
    'icon': 'http://myicon',
    'publicURL': 'public.com',
    'redirectURLs': ['redirect.com']
  }
]

const mockOrganizations = [{id: 1, name: 'myOrg', state: 'NON_TRUSTED'}]
const mockOrganization = mockOrganizations[0]

const mockState = {
  auth: {
    user: {
      organizations: mockOrganizations
    }
  }
}

const mockSubscriptions = {
  brands: [{'id': 1, 'name': 'BNP Paribas Fortis', 'logo': 'logo.svg'}, {
    'id': 2,
    'name': 'Hello Bank!',
    'logo': 'hellobank_logo.svg'
  }, {'id': 3, 'name': 'Fintro', 'logo': 'fintro_logo.svg'}],
  products: [
    {
      'id': 4,
      'name': 'Payment Initiation API',
      'longname': 'Payment Initiation – BNP Paribas Fortis Accounts',
      'intro': 'Give customers the option to initiate payments via our BNP Paribas Fortis Payment Initiation API.',
      'description': 'With our BNP Paribas Fortis Payment Initiation API you can allow customers to connect to their account and initiate a payment. Our Payment Initiation API will enable secure access to and payment initiation from Belgian BNP Paribas Fortis payment accounts.',
      'image': 'logo.svg',
      'role': 'pisp',
      'version': 'Sandbox v1.4.0.47',
      'created_at': '2019-04-03T11:44:35.000Z',
      'updated_at': '2019-04-03T11:44:35.000Z',
      'brand_id': 1,
      'isSubscribed': true
    }, {
      'id': 5,
      'name': 'Payment Initiation API',
      'longname': 'Payment Initiation – Hello Bank! Accounts',
      'intro': 'Give customers the option to initiate payments via our Hello Bank! Payment Initiation API.',
      'description': 'With our Hello Bank! Payment Initiation API you can allow customers to connect to their account and initiate a payment. Our Payment Initiation API will enable secure access to and payment initiation from Belgian BNP Paribas Fortis payment accounts.',
      'image': 'hellobank_logo.svg',
      'role': 'pisp',
      'version': 'Sandbox v1.4.0.47',
      'created_at': '2019-04-03T11:44:35.000Z',
      'updated_at': '2019-04-03T11:44:35.000Z',
      'brand_id': 2,
      'isSubscribed': false
    }, {
      'id': 6,
      'name': 'Payment Initiation API',
      'longname': 'Payment Initiation – Fintro Accounts',
      'intro': 'Give customers the option to initiate payments via our Fintro Payment Initiation API.',
      'description': 'With our Fintro Payment Initiation API you can allow customers to connect to their account and initiate a payment. Our Payment Initiation API will enable secure access to and payment initiation from Belgian BNP Paribas Fortis payment accounts.',
      'image': 'fintro_logo.svg',
      'role': 'pisp',
      'version': 'Sandbox v1.4.0.47',
      'created_at': '2019-04-03T11:44:35.000Z',
      'updated_at': '2019-04-03T11:44:35.000Z',
      'brand_id': 3,
      'isSubscribed': false
    }, {
      'id': 7,
      'name': 'Account Information API',
      'longname': 'Account Information – BNP Paribas Fortis Accounts',
      'intro': 'Give customers secure access to transaction data and balance data via our BNP Paribas Fortis Account Information API.',
      'description': 'With our BNP Paribas Fortis Account Information API you can allow customers to connect to balance and transaction data. Our Account Information API will enable secure access to Belgian BNP Paribas Fortis payment accounts.',
      'image': 'logo.svg',
      'role': 'aisp',
      'version': 'Sandbox v1.4.0.47',
      'created_at': '2019-04-03T11:44:35.000Z',
      'updated_at': '2019-04-03T11:44:35.000Z',
      'brand_id': 1,
      'isSubscribed': false
    }, {
      'id': 8,
      'name': 'Account Information API',
      'longname': 'Account Information – Hello Bank! Accounts',
      'intro': 'Give customers secure access to transaction data and balance data via our Hello Bank! Account Information API.',
      'description': 'Create Account Information consuming applications that offer great added value to your customers. The Banks’s Account Information Service will enable secure access to all European The Bank payments accounts.',
      'image': 'hellobank_logo.svg',
      'role': 'aisp',
      'version': 'Sandbox v1.4.0.47',
      'created_at': '2019-04-03T11:44:35.000Z',
      'updated_at': '2019-04-03T11:44:35.000Z',
      'brand_id': 2,
      'isSubscribed': false
    }, {
      'id': 9,
      'name': 'Account Information API',
      'longname': 'Account Information – Fintro Accounts',
      'intro': 'Give customers secure access to transaction data and balance data via our Fintro Account Information API.',
      'description': 'Create Account Information consuming applications that offer great added value to your customers. The Banks’s Account Information Service will enable secure access to all European The Bank payments accounts.',
      'image': 'fintro_logo.svg',
      'role': 'aisp',
      'version': 'Sandbox v1.4.0.47',
      'created_at': '2019-04-03T11:44:35.000Z',
      'updated_at': '2019-04-03T11:44:35.000Z',
      'brand_id': 3,
      'isSubscribed': false
    }
  ]
}

describe('<TestData />', () => {
  const props = {
    apps: mockApps,
    ui: {
      loading: false
    },
    testusers: {
      users: mockUsers,
      pagination: {
        page: 1,
        pageSize: 5,
        rowCount: 7,
        pageCount: 2
      }
    },
    accounts: {},
    history: {push: jest.fn()},
    location: {state: {}},
    openSupportModal: jest.fn(),
    fetchApps: jest.fn(),
    createApp: jest.fn(),
    fetchTestData: jest.fn(),
    createTestUser: jest.fn(),
    getTestUserAccounts: jest.fn(),
    user: {
      id: 123,
      fullName: 'Clau',
      email: 'clau@cloudoki.com',
      organizations: mockOrganizations
    },
    intl,
    subscriptions: mockSubscriptions,
    theme: {},
    fetchApiSubscriptions: jest.fn(),
    createApiSubscription: jest.fn()
  }

  const wrapper = mountWithIntl(<TestData {...props} />)

  it('should have a div container', () => {
    expect(wrapper.find('.testdata-container')).toHaveLength(1)
  })

  it('should render test users list', () => {
    expect(wrapper.find('.testdata-item')).toHaveLength(1)
  })

  it('should navigate to testdata detail', () => {
    wrapper.find(IconButton).last().simulate('click')
    expect(props.history.push).toHaveBeenCalledWith(`/testdata/2`)
  })

  // it('should open support modal on propose feature', () => {
  //   wrapper.find('#propose-feature-btn').last().simulate('click')
  //   expect(props.openSupportModal).toHaveBeenCalled()
  // })

  it('should display first use screen if no apps', () => {
    wrapper.setProps({apps: []})
    expect(wrapper.find('.first-app')).toHaveLength(1)
  })

  it('should open create app modal', () => {
    wrapper.find('.create-app-button').first().simulate('click')
    expect(wrapper.state().appModalOpen).toEqual(true)
  })

  it('should display loading icon', () => {
    wrapper.setProps({ui: {loading: true}})
    expect(wrapper.find('.testdata-loading')).toHaveLength(1)
  })

  it('should open add user modal', () => {
    props.location.state = {testUser: {fullName: 'Super Test User', email: 'test@test.com', avatar: ''}}
    const wrapperWithTestUser = mountWithIntl(<TestData {...props} />)
    expect(wrapperWithTestUser.state().testModalOpen).toEqual(true)
  })
})

describe('<CreateTestUser />', () => {
  const props = {
    intl,
    ui: {
      loading: false
    },
    organization: mockOrganization,
    testUser: {
      fullName: 'Super Test User',
      email: 'test@test.com',
      avatar: 'https://github.com/superTesterAvatar.png'
    },
    closeModal: jest.fn(),
    accounts: {},
    history: {push: jest.fn()},
    createTestUser: jest.fn(),
    getTestUserAccounts: jest.fn()
  }
  const wrapperWithTestUser = mountWithIntl(<CreateTestUser {...props} />)

  it('should have a pre-filled form', () => {
    const name = wrapperWithTestUser.find('input[id="testuser-name"]')
    const email = wrapperWithTestUser.find('input[id="testuser-email"]')
    const avatar = wrapperWithTestUser.find('input[id="testuser-avatar"]')
    const password = wrapperWithTestUser.find('input[id="testuser-password"]')
    expect(name).toHaveLength(1)
    expect(email).toHaveLength(1)
    expect(avatar).toHaveLength(1)
    expect(password).toHaveLength(1)
    expect(name.props().value).toEqual('Super Test User')
    expect(email.props().value).toEqual('test@test.com')
    expect(avatar.props().value).toEqual('https://github.com/superTesterAvatar.png')
    expect(password.props().value).not.toEqual('')
  })
})

describe('<TestDetail />', () => {
  const props = {
    testuser: {},
    history: {push: jest.fn()},
    organizations: mockOrganizations,
    getTestUser: jest.fn(),
    updateTestUser: jest.fn(),
    match: {params: {psuId: 1}},
    intl
  }

  const wrapper = mountWithIntl(<TestDetail {...props} />)

  it('should have a div container', () => {
    expect(wrapper.find('.test-detail-container')).toHaveLength(1)
  })

  it('should call getTestUser', () => {
    expect(props.getTestUser).toHaveBeenCalled()
  })

  it('should render user accounts', () => {
    wrapper.setProps({testuser: mockUsers[0]})
    expect(wrapper.find('.account-info')).toHaveLength(1)
  })

  it('should toggle password visibility', () => {
    wrapper.find('#test-detail-toggle-btn').first().simulate('click')
    expect(wrapper.state().passwordVisible).toEqual(true)
    expect(wrapper.find(PasswordVisibleIcon).length).toEqual(1)
  })

  it('should call updateTestUser on Update click', () => {
    wrapper.find('#update-testuser-btn').first().simulate('click')
    wrapper.setState({testuser: mockUsers[0]})
    const {name, email, password, avatarUrl} = wrapper.state().testuser
    const data = {name, email, password, avatarUrl}
    expect(props.updateTestUser).toHaveBeenCalledWith(props.organizations[0].id, props.match.params.psuId, data)
  })
})

const initialState = {
  data: {},
  testuser: {},
  accounts: {},
  transactions: {},
  ui: {
    loading: false
  }
}

const mockTestData = {
  users: mockUsers,
  pagination: {
    page: 1,
    pageSize: 5,
    rowCount: 7,
    pageCount: 2
  }
}

const mockTestUser = mockUsers[0]

describe('TestData reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should update state on FETCH_TESTDATA', () => {
    expect(reducer(initialState, fetchTestData(mockOrganization.id))).toEqual({...initialState, ui: {loading: true}})
  })

  it('should update state on FETCH_TESTDATA_SUCCESS', () => {
    expect(reducer(initialState, fetchTestDataSuccess(mockTestData))).toEqual({...initialState, data: mockTestData})
  })

  it('should update state on FETCH_TESTDATA_ERROR', () => {
    expect(reducer(initialState, fetchTestDataError(errorMock))).toEqual({...initialState, data: []})
  })

  // it('should update state on CREATE_TESTUSER', () => {
  //   expect(reducer(initialState, createTestUser(mockOrganization.id, mockUsers[0]))).toEqual({...initialState, ui: {loading: true}})
  // })

  // it('should update state on CREATE_TESTUSER_SUCCESS', () => {
  //   expect(reducer(initialState, createTestUserSuccess(mockUsers[0]))).toEqual({...initialState, data: mockUsers[0]})
  // })

  // it('should update state on CREATE_TESTUSER_ERROR', () => {
  //   expect(reducer(initialState, createTestUserError(errorMock))).toEqual({...initialState, ui: {loading: false}})
  // })

  it('should update state on GET_TESTUSER', () => {
    const psuId = '2'
    expect(reducer(initialState, getTestUser(mockOrganization.id, psuId))).toEqual({
      ...initialState,
      ui: {loading: true}
    })
  })

  it('should update state on GET_TESTUSER_SUCCESS', () => {
    expect(reducer(initialState, getTestUserSuccess(mockUsers[0]))).toEqual({...initialState, testuser: mockUsers[0]})
  })

  it('should update state on GET_TESTUDER_ERROR', () => {
    expect(reducer(initialState, getTestUserError(errorMock))).toEqual({
      ...initialState,
      testuser: {},
      ui: {loading: false}
    })
  })

  it('should update state on UPDATE_TESTUSER', () => {
    expect(reducer(initialState, updateTestUser(mockOrganization.id, mockUsers[0]))).toEqual({
      ...initialState,
      ui: {loading: true}
    })
  })

  it('should update state on UPDATE_TESTUSER_SUCCESS', () => {
    const editPsu = {
      'id': 2,
      'name': 'Edited name',
      'email': 'psu@email.com',
      'avatarUrl': 'http://myicon',
      'password': '1234567'
    }
    expect(reducer(initialState, updateTestUserSuccess(editPsu))).toEqual({...initialState, testuser: editPsu})
  })

  it('should update state on UPDATE_TESTUSER_ERROR', () => {
    expect(reducer(initialState, updateTestUserError(errorMock))).toEqual({
      ...initialState,
      testuser: {},
      ui: {loading: false}
    })
  })
})

describe('TestData sagas', () => {
  it('should call fetchTestData and return an array', () => {
    const fakeResponse = {data: mockTestData}

    return expectSaga(fetchTestDataSaga)
      .withState(mockState)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(fetchTestDataSuccess(mockTestData))
      .dispatch(fetchTestData(mockOrganization.id))
      .silentRun()
  })

  it('should call fetchTestData and handle the error', () => {
    const fakeResponse = {err: errorMock}

    return expectSaga(fetchTestDataSaga)
      .withState(mockState)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(fetchTestDataError(errorMock))
      .dispatch(fetchTestData(mockOrganization.id))
      .silentRun()
  })

  it('should call createTestUser and return an object', () => {
    const fakeResponse = {data: mockTestUser}

    return expectSaga(createTestUserSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(createTestUserSuccess(mockTestUser))
      .dispatch(createTestUser(mockOrganization.id, mockTestUser))
      .silentRun()
  })

  it('should call createTestUser and handle the error', () => {
    const fakeResponse = {err: errorMock}

    return expectSaga(createTestUserSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(createTestUserError(errorMock))
      .dispatch(createTestUser(mockOrganization.id, mockTestUser))
      .silentRun()
  })

  it('should call getTestUser and return an object', () => {
    const fakeResponse = {data: mockUsers[0]}

    return expectSaga(getTestUserSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(getTestUserSuccess(mockUsers[0]))
      .dispatch(getTestUser(mockOrganization.id, mockUsers[0].id))
      .silentRun()
  })

  it('should call getTestUser and handle the error', () => {
    const fakeResponse = {err: errorMock}

    return expectSaga(getTestUserSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(getTestUserError(errorMock))
      .dispatch(getTestUser(mockOrganization.id, mockUsers[0].id))
      .silentRun()
  })

  it('should call updateTestUser and return an object', () => {
    const testUser = mockUsers[0]
    const fakeResponse = {data: testUser}

    return expectSaga(updateTestUserSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(updateTestUserSuccess(testUser))
      .dispatch(updateTestUser(mockOrganization.id, testUser))
      .silentRun()
  })

  it('should call updateTestUser and handle the error', () => {
    const fakeResponse = {err: errorMock}

    return expectSaga(updateTestUserSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(updateTestUserError(errorMock))
      .dispatch(updateTestUser(mockOrganization.id, mockUsers[0]))
      .silentRun()
  })
})
