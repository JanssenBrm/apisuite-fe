import React from 'react'
import { mountWithIntl } from 'util/test-utils'
import ApiDetail from './ApiDetail'

describe('<ApiDetail />', () => {
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

  const props = {
    history: {
      push: jest.fn()
    },
    match: {
      params: {
        apiId: 'bnp-aisp'
      }
    },
    theme: {},
    ui: {
      loading: false
    },
    product: {},
    getApiProduct: jest.fn()
  }

  const wrapper = mountWithIntl(<ApiDetail {...props} />)

  it('should have div as parent', () => {
    wrapper.setProps({ product: mockProduct })
    expect(wrapper.find('.api-detail-container')).toHaveLength(1)
  })

  it('should render 2 usecases', () => {
    expect(wrapper.find('.usage-section')).toHaveLength(2)
  })

  it('should render 3 features', () => {
    expect(wrapper.find('.api-feature')).toHaveLength(3)
  })

  it('should display loading circle', () => {
    wrapper.setProps({ ui: { loading: true } })
    expect(wrapper.find('.loading')).toHaveLength(1)
  })
})
