import React from 'react'
import { mountWithIntl } from 'util/test-utils'
import ApiSubscriptions from './ApiSubscriptions'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import CircularProgress from '@material-ui/core/CircularProgress'
import { translationMessages, formats } from 'util/i18n'
import { IntlProvider } from 'react-intl'
import request from 'util/request'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { fetchApiSubscriptionsSaga, createApiSubscriptionSaga } from './sagas'
import reducer, {
  fetchApiSubscriptions,
  fetchApiSubscriptionsSuccess,
  fetchApiSubscriptionsError,
  createApiSubscription,
  createApiSubscriptionSuccess,
  createApiSubscriptionError
} from './ducks'

const intlProvider = new IntlProvider({locale: 'en', messages: translationMessages['en'], formats})
const {intl} = intlProvider.getChildContext()

const errorMock = {message: 'error-stub'}
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
      'isSubscribed': false
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

const mockOrganization = {id: 1, name: 'myOrg', state: 'NON_VALIDATED'}

describe('<ApiSubscriptions />', () => {
  const props = {
    history: {push: jest.fn()},
    intl,
    theme: {
      name: ''
    },
    fetchApiSubscriptions: jest.fn(),
    createApiSubscription: jest.fn(),
    fetchApps: jest.fn(),
    subscriptions: {
      products: mockSubscriptions.products,
      brands: mockSubscriptions.brands,
      ui: {
        loading: false
      }
    },
    auth: {
      user: {
        organizations: [
          mockOrganization
        ]
      }
    },
    apps: []
  }
  const wrapper = mountWithIntl(<ApiSubscriptions {...props} />)

  it('should have div as parent', () => {
    expect(wrapper.find('.api-subscriptions-container')).toHaveLength(1)
  })

  it('should call expand panel on click', () => {
    const expandSpy = jest.spyOn(wrapper.instance(), 'handleExpand')
    wrapper.setProps({
      subscriptions: {
        ...props.subscriptions,
        products: mockSubscriptions.products,
        brands: mockSubscriptions.brands
      }
    })
    wrapper.find(ExpansionPanel).first().simulate('click')
    expect(expandSpy).toHaveBeenCalledWith(0)
  })

  it('should navigate to route on icon click', () => {
    wrapper.find('.api-action-icon').first().simulate('click')
    expect(props.history.push).toHaveBeenCalledWith('/api-references')
  })

  it('should open modal if user is not validated', () => {
    wrapper.find('#api-subscription-btn').first().simulate('click')
    expect(wrapper.state().modalOpen).toEqual(true)
  })

  it('should request sandbox access if user is validated', () => {
    wrapper.setProps({auth: {...props.auth, user: {organizations: [{id: 1, name: 'myOrg', state: 'NON_TRUSTED'}]}}})
    wrapper.find('#api-subscription-btn').first().simulate('click')
    expect(props.createApiSubscription).toHaveBeenCalledWith(mockOrganization.id, [`${mockSubscriptions.products[0].id}`])
  })

  it('should display loading status', () => {
    wrapper.setProps({subscriptions: {...props.subscriptions, ui: {loading: true}}})
    expect(wrapper.find(CircularProgress)).toHaveLength(1)
  })
})

const initialState = {
  products: [],
  brands: [],
  ui: {
    loading: false
  }
}

const mockState = {
  auth: {
    user: {
      organizations: [
        mockOrganization
      ]
    }
  }
}

describe('ApiSubscriptions reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should update state on FETCH_API_SUBSCRIPTIONS', () => {
    expect(reducer(initialState, fetchApiSubscriptions())).toEqual({...initialState, ui: {loading: true}})
  })

  it('should update state on FETCH_API_SUBSCRIPTIONS_SUCCESS', () => {
    expect(reducer(initialState, fetchApiSubscriptionsSuccess(mockSubscriptions))).toEqual({
      ...initialState,
      products: mockSubscriptions.products,
      brands: mockSubscriptions.brands
    })
  })

  it('should update state on FETCH_API_SUBSCRIPTIONS_ERROR', () => {
    expect(reducer(initialState, fetchApiSubscriptionsError(errorMock))).toEqual({
      ...initialState,
      products: [],
      brands: []
    })
  })

  it('should update state on CREATE_API_SUBSCRIPTION', () => {
    const productIds = ['2']
    expect(reducer(initialState, createApiSubscription(mockOrganization.id, productIds))).toEqual({
      ...initialState,
      ui: {loading: true}
    })
  })

  it('should update state on CREATE_API_SUBSCRIPTION_SUCCESS', () => {
    expect(reducer(initialState,
      createApiSubscriptionSuccess({products: mockSubscriptions.products, brands: mockSubscriptions.brands}))).toEqual({
      ...initialState,
      products: mockSubscriptions.products,
      brands: mockSubscriptions.brands
    })
  })

  it('should update state on CREATE_API_SUBSCRIPTION_ERROR', () => {
    expect(reducer(initialState, createApiSubscriptionError(errorMock))).toEqual({
      ...initialState,
      ui: {loading: false}
    })
  })
})

describe('ApiSubscriptions sagas', () => {
  it('should call fetchApiSubscriptions and return an object', () => {
    const fakeResponse = {data: mockSubscriptions}

    return expectSaga(fetchApiSubscriptionsSaga)
      .withState(mockState)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(fetchApiSubscriptionsSuccess(mockSubscriptions))
      .dispatch(fetchApiSubscriptions())
      .silentRun()
  })

  it('should call fetchApiSubscriptions and handle the error', () => {
    const fakeResponse = {err: errorMock}

    return expectSaga(fetchApiSubscriptionsSaga)
      .withState(mockState)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(fetchApiSubscriptionsError(errorMock))
      .dispatch(fetchApiSubscriptions())
      .silentRun()
  })

  it('should call createApiSubscription and return an object', () => {
    const fakeResponse = {data: {productIds: [`${mockSubscriptions.products[0].id}`]}}

    return expectSaga(createApiSubscriptionSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(createApiSubscriptionSuccess({productIds: [`${mockSubscriptions.products[0].id}`]}))
      .dispatch(createApiSubscription(mockOrganization.id, [`${mockSubscriptions.products[0].id}`]))
      .silentRun()
  })

  it('should call createApiSubscription and handle the error', () => {
    const fakeResponse = {err: errorMock}

    return expectSaga(createApiSubscriptionSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(createApiSubscriptionError(errorMock))
      .dispatch(createApiSubscription(mockOrganization.id, [`${mockSubscriptions.products[0].id}`]))
      .silentRun()
  })
})
