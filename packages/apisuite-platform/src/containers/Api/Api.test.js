import React from 'react'
import { shallow } from 'enzyme'
import Api from './Api'
// import { RedocStandalone } from 'redoc'

describe('<Api />', () => {
  const props = {
    history: { push: jest.fn() },
    match: {
      params: {
        brand: 'bnp',
        productId: 1,
        role: 'aisp',
        version: '1.0.0'
      }
    },
    getApiDocs: jest.fn(),
    apidocs: {
      swagger: {}
    },
    ui: {
      loading: false
    }
  }

  const wrapper = shallow(<Api {...props} />)

  it('should have a div as parent', () => {
    expect(wrapper.find('.api-container')).toHaveLength(1)
    // expect(wrapper.find(RedocStandalone)).toHaveLength(1)
  })
})
