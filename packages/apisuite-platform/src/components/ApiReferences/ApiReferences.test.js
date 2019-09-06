import React from 'react'
import { mountWithIntl } from 'util/test-utils'
import ApiReferences from './ApiReferences'

describe('<ApiReferences />', () => {
  const mockProducts = [
    {
      id: 1,
      name: 'Product 1',
      intro: 'Intro 1',
      role: 'aisp',
      version: 'Sandbox v1',
      brand_id: 1
    },
    {
      id: 2,
      name: 'Product 2',
      intro: 'Intro 2',
      role: 'pisp',
      version: 'Sandbox v1',
      brand_id: 1
    }
  ]

  const mockBrands = [
    {
      id: 1,
      name: 'Brand 1',
      logo: 'logo.svg'
    }
  ]

  const props = {
    intl: {},
    history: { push: jest.fn() },
    products: mockProducts,
    brands: mockBrands,
    theme: {
      name: ''
    },
    ui: {
      loading: false
    },
    fetchApiProducts: jest.fn()
  }

  const wrapper = mountWithIntl(<ApiReferences {...props} />)

  it('should have a div as parent', () => {
    expect(wrapper.find('.api-references-container')).toHaveLength(1)
  })

  it('should navigate to api detail on product info click', () => {
    wrapper.find('.info-link').first().simulate('click')
    expect(props.history.push).toHaveBeenCalledWith(`api-detail/${mockProducts[0].id}`)
  })

  it('should navigate to api on caret click', () => {
    wrapper.find('.api-caret').first().simulate('click')
    expect(props.history.push).toHaveBeenCalledWith(`api/${encodeURIComponent(mockBrands[0].name.toLowerCase())}/${mockProducts[0].id}/${mockProducts[0].role}/${mockProducts[0].version.match(/[\d.]+/gmi)}`)
  })
})
