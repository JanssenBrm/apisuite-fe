import React from 'react'
import { mountWithIntl } from 'util/test-utils'
import LandingPage from './LandingPage'
import { translationMessages, formats } from 'util/i18n'
import { IntlProvider } from 'react-intl'
import HeaderSection from 'components/HeaderSection'
import SectionPortal from 'components/SectionPortal'
import request from 'util/request'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { fetchApiProductsSaga, getApiProductSaga } from './sagas'
import reducer, {
  fetchApiProducts,
  fetchApiProductsSuccess,
  fetchApiProductsError,
  getApiProduct,
  getApiProductSuccess,
  getApiProductError
} from './ducks'

const intlProvider = new IntlProvider({locale: 'en', messages: translationMessages['en'], formats})
const {intl} = intlProvider.getChildContext()

const mockApiProducts = {
  'brands': [
    {
      'id': 1,
      'name': 'BNPPF',
      'logo': 'logo.svg'
    },
    {
      'id': 2,
      'name': 'Fintro',
      'logo': 'fintro_logo.svg'
    },
    {
      'id': 3,
      'name': 'Hello Bank',
      'logo': 'hellobank_logo.svg'
    }
  ],
  'products': [
    {
      'id': 1,
      'name': 'PAYMENT_INITIATION_API',
      'brand': 1,
      'scopes': [
        {
          'id': 1,
          'name': 'AISP'
        },
        {
          'id': 2,
          'name': 'PISP'
        }
      ],
      'versions': [
        'v1.4.0.47',
        'v1.5.0.0'
      ]
    },
    {
      'id': 2,
      'name': 'ACCOUNT_INFORMATION_API',
      'brand': 1,
      'scopes': [
        {
          'id': 1,
          'name': 'AISP'
        },
        {
          'id': 2,
          'name': 'PISP'
        }
      ],
      'versions': [
        'v1.4.0.47'
      ]
    },
    {
      'id': 3,
      'name': 'PAYMENT_INITIATION_API',
      'brand': 2,
      'scopes': [
        {
          'id': 1,
          'name': 'AISP'
        },
        {
          'id': 2,
          'name': 'PISP'
        }
      ],
      'versions': [
        'v1.4.0.47'
      ]
    },
    {
      'id': 4,
      'name': 'ACCOUNT_INFORMATION_API',
      'brand': 2,
      'scopes': [
        {
          'id': 1,
          'name': 'AISP'
        },
        {
          'id': 2,
          'name': 'PISP'
        }
      ],
      'versions': [
        'v1.4.0.47'
      ]
    },
    {
      'id': 5,
      'name': 'PAYMENT_INITIATION_API',
      'brand': 3,
      'scopes': [
        {
          'id': 1,
          'name': 'AISP'
        },
        {
          'id': 2,
          'name': 'PISP'
        }
      ],
      'versions': [
        'v1.4.0.47'
      ]
    },
    {
      'id': 6,
      'name': 'ACCOUNT_INFORMATION_API',
      'brand': 3,
      'scopes': [
        {
          'id': 1,
          'name': 'AISP'
        },
        {
          'id': 2,
          'name': 'PISP'
        }
      ],
      'versions': [
        'v1.4.0.47'
      ]
    }
  ]
}

const mockProduct = {
  'id': 4,
  'name': 'Payment Initiation API',
  'longname': 'Payment Initiation – BNP Paribas Fortis Accounts',
  'intro': 'Give customers and users the option to initiate payments via our BNP Paribas Fortis Payment Initiation API.',
  'description': 'With our BNP Paribas Fortis Payment Initiation API you can allow customers and users to connect to their account and initiate a payment. Our Payment Initiation API will enable secure access to and payment initiation from Belgian BNP Paribas Fortis payment accounts.',
  'image': 'themes/bnpp/images/logo.svg',
  'version': 'Sandbox v1.4.0.47',
  'created_at': '2019-02-20T10:52:41.000Z',
  'updated_at': '2019-02-20T10:52:41.000Z',
  'usecases': [{
    'id': 1,
    'title': 'Easy payments',
    'description': 'We want to help you to create value-added services and applications. Therefore we give our customers the possibility to initiate payments from third party apps from certified providers if so desired.',
    'product_id': 4,
    'created_at': '2019-02-20T10:52:41.000Z',
    'updated_at': '2019-02-20T10:52:41.000Z'
  }, {
    'id': 2,
    'title': 'Seamless and safe experiences',
    'description': 'This API will allow you to build seamless journeys for our customers and users, who remain in full control. Our customers always decide which third party app can have access to execute a payment, in a secure way.',
    'product_id': 4,
    'created_at': '2019-02-20T10:52:41.000Z',
    'updated_at': '2019-02-20T10:52:41.000Z'
  }],
  'features': [{
    'id': 1,
    'title': 'Identification',
    'description': 'Our Payment Initiation API will provide for proper identification and signing by our customers before initiating a payment transfer.',
    'product_id': 4,
    'created_at': '2019-02-20T10:52:41.000Z',
    'updated_at': '2019-02-20T10:52:41.000Z'
  }, {
    'id': 2,
    'title': 'Single Credit Transfer',
    'description': 'Our Payment Initiation API will enable to initiate a Single Credit Transfer. Other payment types will follow.',
    'product_id': 4,
    'created_at': '2019-02-20T10:52:41.000Z',
    'updated_at': '2019-02-20T10:52:41.000Z'
  }, {
    'id': 3,
    'title': 'Security',
    'description': 'Our Payment Initiation API allows our customers to initiate a payment much in the same way and with the same security as via our bank applications.',
    'product_id': 4,
    'created_at': '2019-02-20T10:52:41.000Z',
    'updated_at': '2019-02-20T10:52:41.000Z'
  }]
}

const errorMock = {message: 'error-stub'}

describe('<LandingPage />', () => {
  const props = {
    intl,
    products: mockApiProducts.products,
    brands: mockApiProducts.brands,
    history: {
      push: jest.fn()
    },
    auth: {
      user: {}
    },
    theme: {},
    fetchApiProducts: jest.fn()
  }
  const wrapper = mountWithIntl(<LandingPage {...props} />)

  it('should have three sections', () => {
    expect(wrapper.find('.home-container')).toHaveLength(1)
    expect(wrapper.find(HeaderSection)).toHaveLength(1)
    expect(wrapper.find(SectionPortal)).toHaveLength(1)
  })

  it('should redirect to signup', () => {
    wrapper.instance().goToSignup()
    expect(props.history.push).toHaveBeenCalledWith('signup')
  })

  it('should redirect to api detail', () => {
    wrapper.instance().goToApi('apiid')
    expect(props.history.push).toHaveBeenCalledWith('api-detail/apiid')
  })
})

const initialState = {
  products: [],
  brands: [],
  product: {},
  ui: {
    loading: false
  }
}

describe('LandingPage reducer', () => {
  const productId = 4

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should update state on FETCH_API_PRODUCTS', () => {
    expect(reducer(initialState, fetchApiProducts())).toEqual({...initialState, ui: {loading: true}})
  })

  it('should update state on FETCH_API_PRODUCTS_SUCCESS', () => {
    expect(reducer(initialState, fetchApiProductsSuccess(mockApiProducts))).toEqual({
      ...initialState,
      products: mockApiProducts.products,
      brands: mockApiProducts.brands
    })
  })

  it('should update state on FETCH_API_PRODUCTS_ERROR', () => {
    expect(reducer(initialState, fetchApiProductsError(errorMock))).toEqual({...initialState})
  })

  it('should update state on  GET_API_PRODUCT', () => {
    expect(reducer(initialState, getApiProduct(productId))).toEqual({...initialState, ui: {loading: true}})
  })

  it('should update state on GET_API_PRODUCT_SUCCESS', () => {
    expect(reducer(initialState, getApiProductSuccess(mockProduct))).toEqual({...initialState, product: mockProduct})
  })

  it('should update state on GET_API_PRODUCT_ERROR', () => {
    expect(reducer(initialState, getApiProductError(errorMock))).toEqual({...initialState, product: {}})
  })
})

describe('LandingPage sagas', () => {
  const productId = 4

  it('should call fetchApiProducts and return an array', () => {
    const fakeResponse = {data: mockApiProducts}

    return expectSaga(fetchApiProductsSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(fetchApiProductsSuccess(mockApiProducts))
      .dispatch(fetchApiProducts())
      .silentRun()
  })

  it('should call fetchApiProducts and handle the error', () => {
    const fakeResponse = {err: errorMock}

    return expectSaga(fetchApiProductsSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(fetchApiProductsError(errorMock))
      .dispatch(fetchApiProducts())
      .silentRun()
  })

  it('should call getApiProduct and return an array', () => {
    const fakeResponse = {data: mockProduct}

    return expectSaga(getApiProductSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(getApiProductSuccess(mockProduct))
      .dispatch(getApiProduct(productId))
      .silentRun()
  })

  it('should call fetchApiProducts and handle the error', () => {
    const fakeResponse = {err: errorMock}

    return expectSaga(getApiProductSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(getApiProductError(errorMock))
      .dispatch(getApiProduct(productId))
      .silentRun()
  })
})
