import React from 'react'
import { shallow } from 'enzyme'
import Badge from './Badge'

describe('<Badge />', () => {
  const wrapper = shallow(<Badge text='text-mock' />)

  it('should have div as parent', () => {
    expect(wrapper.find('.badge')).toHaveLength(1)
  })

  it('should have a text prop', () => {
    expect(wrapper.find('.badge-label')).toHaveLength(1)
  })
})
