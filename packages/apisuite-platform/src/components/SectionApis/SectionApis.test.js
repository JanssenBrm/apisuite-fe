import React from 'react'
import { mountWithIntl } from 'util/test-utils'
import SectionApis from 'components/SectionApis'
import themes from 'themes'

describe('<SectionApis />', () => {
  const mockBrands = [
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
  ]
  const mockProducts = [{
    'id': 4,
    'name': 'Payment Initiation API',
    'longname': 'Payment Initiation – BNP Paribas Fortis Accounts',
    'intro': 'Give customers the option to initiate payments via our BNP Paribas Fortis Payment Initiation API.',
    'description': 'With our BNP Paribas Fortis Payment Initiation API you can allow customers to connect to their account and initiate a payment. Our Payment Initiation API will enable secure access to and payment initiation from Belgian BNP Paribas Fortis payment accounts.',
    'image': 'logo.svg',
    'version': 'Sandbox v1.4.0.47',
    'created_at': '2019-02-20T10:52:41.000Z',
    'updated_at': '2019-02-20T10:52:41.000Z',
    'brand_id': 1
  }, {
    'id': 5,
    'name': 'Payment Initiation API',
    'longname': 'Payment Initiation – Hello Bank! Accounts',
    'intro': 'Give customers the option to initiate payments via our Hello Bank! Payment Initiation API.',
    'description': 'With our Hello Bank! Payment Initiation API you can allow customers to connect to their account and initiate a payment. Our Payment Initiation API will enable secure access to and payment initiation from Belgian BNP Paribas Fortis payment accounts.',
    'image': 'hellobank_logo.svg',
    'version': 'Sandbox v1.4.0.47',
    'created_at': '2019-02-20T10:52:41.000Z',
    'updated_at': '2019-02-20T10:52:41.000Z',
    'brand_id': 2
  }, {
    'id': 6,
    'name': 'Payment Initiation API',
    'longname': 'Payment Initiation – Fintro Accounts',
    'intro': 'Give customers the option to initiate payments via our Fintro Payment Initiation API.',
    'description': 'With our Fintro Payment Initiation API you can allow customers to connect to their account and initiate a payment. Our Payment Initiation API will enable secure access to and payment initiation from Belgian BNP Paribas Fortis payment accounts.',
    'image': 'fintro_logo.svg',
    'version': 'Sandbox v1.4.0.47',
    'created_at': '2019-02-20T10:52:41.000Z',
    'updated_at': '2019-02-20T10:52:41.000Z',
    'brand_id': 3
  }, {
    'id': 7,
    'name': 'Account Information API',
    'longname': 'Account Information – BNP Paribas Fortis Accounts',
    'intro': 'Give customers secure access to transaction data and balance data via our BNP Paribas Fortis Account Information API.',
    'description': 'With our BNP Paribas Fortis Account Information API you can allow customers to connect to balance and transaction data. Our Account Information API will enable secure access to Belgian BNP Paribas Fortis payment accounts.',
    'image': 'logo.svg',
    'version': 'Sandbox v1.4.0.47',
    'created_at': '2019-02-20T10:52:41.000Z',
    'updated_at': '2019-02-20T10:52:41.000Z',
    'brand_id': 1
  }, {
    'id': 8,
    'name': 'Account Information API',
    'longname': 'Account Information – Hello Bank! Accounts',
    'intro': 'Give customers secure access to transaction data and balance data via our Hello Bank! Account Information API.',
    'description': 'Create Account Information consuming applications that offer great added value to your customers. The Banks’s Account Information Service will enable secure access to all European The Bank payments accounts.',
    'image': 'hellobank_logo.svg',
    'version': 'Sandbox v1.4.0.47',
    'created_at': '2019-02-20T10:52:41.000Z',
    'updated_at': '2019-02-20T10:52:41.000Z',
    'brand_id': 2
  }, {
    'id': 9,
    'name': 'Account Information API',
    'longname': 'Account Information – Fintro Accounts',
    'intro': 'Give customers secure access to transaction data and balance data via our Fintro Account Information API.',
    'description': 'Create Account Information consuming applications that offer great added value to your customers. The Banks’s Account Information Service will enable secure access to all European The Bank payments accounts.',
    'image': 'fintro_logo.svg',
    'version': 'Sandbox v1.4.0.47',
    'created_at': '2019-02-20T10:52:41.000Z',
    'updated_at': '2019-02-20T10:52:41.000Z',
    'brand_id': 3
  }]

  const props = {
    goToApi: jest.fn(),
    theme: themes.default,
    products: mockProducts,
    brands: mockBrands
  }
  const wrapper = mountWithIntl(<SectionApis {...props} />)

  it('should have div as parent', () => {
    expect(wrapper.find('.apis-section')).toHaveLength(1)
  })

  it('should find have 6 api blocks', () => {
    expect(wrapper.find('.apis-api-block')).toHaveLength(6)
  })

  // it('should go api detail', () => {
  //   wrapper.find('.apis-api-block-action').first().simulate('click')
  //   expect(props.goToApi).toHaveBeenCalled()
  // })
})
