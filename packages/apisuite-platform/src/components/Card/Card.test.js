
import React from 'react'
import { shallow } from 'enzyme'
import Card from 'components/Card'

describe('<Card />', () => {
  const children = ['item1', 'item2', 'item3']
  const wrapper = shallow(<Card children={children} />)

  it('should have div as parent', () => {
    expect(wrapper.find('.card')).toHaveLength(1)
  })

  it('should have the correct number of children', () => {
    expect(wrapper.find('.card-content-item')).toHaveLength(children.length)
  })
})
