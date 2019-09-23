import React from 'react'
import { mountWithIntl, shallowWithIntl } from 'util/test-utils'
import request from 'util/request'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import CircularProgress from '@material-ui/core/CircularProgress'
import AppsPage from './AppsPage'
import CreateApp from './CreateApp'
import AppDetail from './AppDetail'
import { fetchAppsSaga, createAppSaga, updateAppSaga, deleteAppSaga, getAppSaga } from './sagas'
import reducer, {
  fetchApps,
  fetchAppsSuccess,
  fetchAppsError,
  createApp,
  createAppSuccess,
  createAppError,
  getApp,
  getAppSuccess,
  getAppError,
  updateApp,
  updateAppSuccess,
  updateAppError,
  deleteApp,
  deleteAppSuccess,
  deleteAppError,
} from './ducks'
import { translationMessages, formats } from 'util/i18n'
import { IntlProvider } from 'react-intl'

const intlProvider = new IntlProvider({ locale: 'en', messages: translationMessages.en, formats })
const { intl } = intlProvider.getChildContext()

const mockApps = [
  {
    id: 1,
    name: 'My First App',
    description: 'Very cool app',
    iconURL: 'http://myicon',
    publicURL: 'public.com',
    redirectURLs: ['redirect.com'],
    clientId: '123',
    clientSecret: 'xxxx',
    container: 'container1',
    productIds: [1, 4],
  },
]
const errorMock = { message: 'error-stub' }
const mockApp = {
  id: 1,
  name: 'My Second App',
  description: 'Very cool app',
  iconURL: 'http://myicon',
  publicURL: 'public.com',
  redirectURLs: ['redirect.com'],
  clientId: '123',
  clientSecret: 'xxxx',
  container: 'container1',
  productIds: [1, 4],
}

const mockSubscriptions = {
  products: [
    {
      id: 4,
      name: 'Payment Initiation API',
      longname: 'Payment Initiation – Bank One Accounts',
      intro: 'Give customers the option to initiate payments via our Bank One Payment Initiation API.',
      description: 'With our Bank One Payment Initiation API you can allow customers to connect to their account and initiate a payment. Our Payment Initiation API will enable secure access to and payment initiation from Belgian Bank One payment accounts.',
      image: 'logo.svg',
      role: 'pisp',
      version: 'Sandbox v1.4.0.47',
      created_at: '2019-02-20T10:52:41.000Z',
      updated_at: '2019-02-20T10:52:41.000Z',
      brand_id: 1,
      isSubscribed: true,
    },
  ],
  brands: [
    {
      id: 1,
      name: 'Bank One',
      logo: 'logo.svg',
      shortname: 'bnppf',
    },
    {
      id: 2,
      name: 'Bank Two',
      logo: 'hellobank_logo.svg',
      shortname: 'hb',
    },
    {
      id: 3,
      name: 'Bank Three',
      logo: 'fintro_logo.svg',
      shortname: 'fintro',
    },
  ],
}

const mockOrganizations = [{ id: 1, name: 'myOrg', state: 'NON_TRUSTED' }]
const mockOrganization = mockOrganizations[0]

describe('<AppsPage />', () => {
  const props = {
    fetchApps: jest.fn(),
    apps: mockApps,
    history: { push: jest.fn() },
    createApp: jest.fn(),
    closeModal: jest.fn(),
    fetchApiSubscriptions: jest.fn(),
    createApiSubscription: jest.fn(),
    ui: {
      loading: false,
    },
    user: {
      id: 123,
      fullName: 'Clau',
      email: 'clau@cloudoki.com',
      organizations: mockOrganizations,
    },
    theme: {},
    subscriptions: {
      products: mockSubscriptions.products,
      brands: mockSubscriptions.brands,
    },
  }

  const wrapper = mountWithIntl(shallowWithIntl(<AppsPage {...props} />).get(0))

  it('should have a div container', () => {
    expect(wrapper.find('.apps-container')).toHaveLength(1)
  })

  it('should render overview section', () => {
    expect(wrapper.find('.overview-section')).toHaveLength(1)
  })

  it('should render first app screen if no apps available', () => {
    wrapper.setProps({ apps: [] })
    expect(wrapper.find('.first-app')).toHaveLength(1)
  })

  it('should render loading UI', () => {
    wrapper.setProps({ ui: { loading: true } })
    expect(wrapper.find(CircularProgress)).toHaveLength(1)
  })

  it('should open modal', () => {
    wrapper.setProps({ ui: { loading: false } })
    wrapper.find('.create-app-button').first().simulate('click')
    expect(wrapper.state().modalOpen).toEqual(true)
  })

  it('should navigate to documentation', () => {
    wrapper.find('.explore-block-action').first().simulate('click')
    expect(props.history.push).toHaveBeenCalledWith('/docs/started')
  })
})

describe('<CreateApp />', () => {
  const props = {
    app: mockApp,
    createApp: jest.fn(),
    closeModal: jest.fn(),
    fetchApiSubscriptions: jest.fn(),
    createApiSubscription: jest.fn(),
    updateApp: jest.fn(),
    organization: { id: 1, name: 'myOrg' },
    subscriptions: mockSubscriptions,
    user: {
      id: 123,
      fullName: 'Clau',
      email: 'clau@cloudoki.com',
      organizations: mockOrganizations,
    },
  }

  const wrapper = mountWithIntl(shallowWithIntl(<CreateApp {...props} />).get(0))

  it('should have a div container', () => {
    expect(wrapper.find('.create-app-container')).toHaveLength(1)
  })

  it('should update subscribed state on subscriptions props change', () => {
    wrapper.setProps({ subscriptions: mockSubscriptions })
    expect(wrapper.state().subscribed).toEqual([])
  })

  it('should call on updateApp when updating app subscriptions', () => {
    const app = { ...mockApp, redirectURLs: mockApp.redirectURLs[0] }
    wrapper.setState({ form: app })
    wrapper.find('.create-app-submit').first().simulate('click')

    expect(props.updateApp).toHaveBeenCalled()
  })

  it('should call createApp on api subscriptions submit click', () => {
    wrapper.setProps({ app: null })
    const { clientId, clientSecret, container, id, ...rest } = mockApp
    wrapper.setState({ form: { ...mockApp, redirectURLs: mockApp.redirectURLs[0] }, subscribed: [{ id: 1, name: 'api 1' }, { id: 2, name: 'api 2' }] })
    wrapper.find('.create-app-submit').first().simulate('click')

    expect(props.createApp)
      .toHaveBeenCalledWith(mockOrganization.id,
        { ...rest, redirectURLs: [mockApp.redirectURLs[0]], productIds: [1, 2] }
      )
  })
})

describe('<AppDetail />', () => {
  const props = {
    app: mockApp,
    match: { params: { appId: '2' } },
    history: { push: jest.fn() },
    getApp: jest.fn(),
    createApp: jest.fn(),
    updateApp: jest.fn(),
    deleteApp: jest.fn(),
    closeModal: jest.fn(),
    fetchApiSubscriptions: jest.fn(),
    subscriptions: {
      products: mockSubscriptions.products,
      brands: mockSubscriptions.brands,
    },
    organizations: mockOrganizations,
    user: {
      fullName: 'Dummy User',
      organizations: mockOrganizations,
    },
    intl,
  }

  const wrapper = mountWithIntl(<AppDetail {...props} />)

  it('should have a div container', () => {
    expect(wrapper.find('.app-detail-container')).toHaveLength(1)
  })

  it('should update app when it receives new props', () => {
    wrapper.setProps({ app: { ...mockApp, name: 'test' } })
    expect(wrapper.state().app).toEqual({ ...mockApp, name: 'test', redirectURLs: mockApp.redirectURLs[0] })
  })

  it('should call updateApp on save click', () => {
    const app = { ...mockApp, redirectURLs: mockApp.redirectURLs[0] }
    wrapper.setState({ app })
    wrapper.find('#save-app-btn').first().simulate('click')
    const { clientId, clientSecret, container, productIds, ...rest } = mockApp
    expect(props.updateApp).toHaveBeenCalledWith(mockOrganization.id, { ...rest })
  })

  it('should have the confirmation modal untoggled', () => {
    expect(wrapper.state().deleteConfirmationOpen).toEqual(false)
  })

  it('should toggle the confirmation modal but not trigger actions', () => {
    wrapper.find('#delete-app-trigger').first().simulate('click')
    expect(wrapper.state().deleteConfirmationOpen).toEqual(true)
    expect(props.deleteApp).toHaveBeenCalledTimes(0)
  })

  it('should cancel app deletion', () => {
    wrapper.find('#delete-app-cancel').first().simulate('click')
    expect(wrapper.state().deleteConfirmationOpen).toEqual(false)
    expect(props.deleteApp).toHaveBeenCalledTimes(0)
  })

  it('should trigger app deletion action', () => {
    wrapper.find('#delete-app-trigger').first().simulate('click')
    wrapper.find('#delete-app-confirm').first().simulate('click')
    expect(props.deleteApp).toHaveBeenCalledTimes(1)
  })
})

const initialState = {
  data: [],
  app: {},
  ui: {
    loading: false,
  },
}

describe('AppsPage reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should update state on FETCH_APPS', () => {
    expect(reducer(initialState, fetchApps(mockOrganization.id))).toEqual({ ...initialState, ui: { loading: true } })
  })

  it('should update state on FETCH_APPS_SUCCESS', () => {
    expect(reducer(initialState, fetchAppsSuccess(mockApps))).toEqual({ ...initialState, data: mockApps })
  })

  it('should update state on FETCH_APPS_ERROR', () => {
    expect(reducer(initialState, fetchAppsError(errorMock))).toEqual({ ...initialState, data: [] })
  })

  it('should update state on CREATE_APP', () => {
    expect(reducer(initialState, createApp(mockOrganization.id, mockApp)))
      .toEqual({ ...initialState, ui: { loading: true } })
  })

  it('should update state on CREATE_APP_SUCCESS', () => {
    expect(reducer(initialState, createAppSuccess(mockApp))).toEqual({ ...initialState, data: [mockApp] })
  })

  it('should update state on CREATE_APP_ERROR', () => {
    expect(reducer(initialState, createAppError(errorMock))).toEqual({ ...initialState, ui: { loading: false } })
  })

  it('should update state on GET_APP', () => {
    const appId = '123'
    expect(reducer(initialState, getApp(mockOrganization.id, appId)))
      .toEqual({ ...initialState, ui: { loading: true } })
  })

  it('should update state on GET_APP_SUCCESS', () => {
    expect(reducer(initialState, getAppSuccess(mockApp))).toEqual({ ...initialState, app: mockApp })
  })

  it('should update state on GET_APP_ERROR', () => {
    expect(reducer(initialState, getAppError(errorMock))).toEqual({ ...initialState, app: {}, ui: { loading: false } })
  })

  it('should update state on UPDATE_APP', () => {
    expect(reducer(initialState, updateApp(mockOrganization.id, mockApp)))
      .toEqual({ ...initialState, ui: { loading: true } })
  })

  it('should update state on UPDATE_APP_SUCCESS', () => {
    const editApp = {
      id: 1,
      name: 'Edited name',
      description: 'Very cool app',
      iconURL: 'http://myicon',
      publicURL: 'public.com',
      redirectURLs: ['redirect.com'],
    }
    expect(reducer({ ...initialState, data: mockApps }, updateAppSuccess(editApp)))
      .toEqual({ ...initialState, data: [editApp], app: editApp })
  })

  it('should update state on UPDATE_APP_ERROR', () => {
    expect(reducer(initialState, updateAppError(errorMock)))
      .toEqual({ ...initialState, app: {}, ui: { loading: false } })
  })

  it('should update state on DELETE_APP', () => {
    expect(reducer(initialState, deleteApp(mockOrganization.id, mockApp.id)))
      .toEqual({ ...initialState, ui: { loading: true } })
  })

  it('should update state on DELETE_APP_SUCCESS', () => {
    expect(reducer({ ...initialState, data: mockApps }, deleteAppSuccess(mockApps[0])))
      .toEqual({ ...initialState, data: [], app: {} })
  })

  it('should update state on DELETE_APP_ERROR', () => {
    expect(reducer(initialState, deleteAppError(errorMock)))
      .toEqual({ ...initialState, app: {}, ui: { loading: false } })
  })
})

describe('AppsPage sagas', () => {
  it('should call fetchApps and return an array', () => {
    const fakeResponse = { data: mockApps }

    return expectSaga(fetchAppsSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(fetchAppsSuccess(mockApps))
      .dispatch(fetchApps(mockOrganization.id))
      .silentRun()
  })

  it('should call fetchApps and handle the error', () => {
    const fakeResponse = { err: errorMock }

    return expectSaga(fetchAppsSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(fetchAppsError(errorMock))
      .dispatch(fetchApps(mockOrganization.id))
      .silentRun()
  })

  it('should call createApp and return an object', () => {
    const fakeResponse = { data: mockApp }

    return expectSaga(createAppSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(createAppSuccess(mockApp))
      .dispatch(createApp(mockOrganization.id, mockApp))
      .silentRun()
  })

  it('should call createApp and handle the error', () => {
    const fakeResponse = { err: errorMock }

    return expectSaga(createAppSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(createAppError(errorMock))
      .dispatch(createApp(mockOrganization.id, mockApp))
      .silentRun()
  })

  it('should call getApp and return an object', () => {
    const fakeResponse = { data: mockApp }

    return expectSaga(getAppSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(getAppSuccess(mockApp))
      .dispatch(getApp(mockOrganization.id, mockApp.id))
      .silentRun()
  })

  it('should call getApp and handle the error', () => {
    const fakeResponse = { err: errorMock }

    return expectSaga(getAppSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(getAppError(errorMock))
      .dispatch(getApp(mockOrganization.id, mockApp.id))
      .silentRun()
  })

  it('should call updateApp and return an object', () => {
    const fakeResponse = { data: mockApp }

    return expectSaga(updateAppSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(updateAppSuccess(mockApp))
      .dispatch(updateApp(mockOrganization.id, mockApp))
      .silentRun()
  })

  it('should call updateApp and handle the error', () => {
    const fakeResponse = { err: errorMock }

    return expectSaga(updateAppSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(updateAppError(errorMock))
      .dispatch(updateApp(mockOrganization.id, mockApp))
      .silentRun()
  })

  it('should call deleteApp and return an object', () => {
    const fakeResponse = { data: mockApp }

    return expectSaga(deleteAppSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(deleteAppSuccess(mockApp))
      .dispatch(deleteApp(mockOrganization.id, mockApp.id))
      .silentRun()
  })

  it('should call deleteApp and handle the error', () => {
    const fakeResponse = { err: errorMock }

    return expectSaga(deleteAppSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(deleteAppError(errorMock))
      .dispatch(deleteApp(mockOrganization.id, mockApp.id))
      .silentRun()
  })
})
