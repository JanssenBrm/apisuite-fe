import React from 'react'
import { shallow } from 'enzyme'
import Checkbox from './Checkbox'

describe('<Checkbox />', () => {
  const props = {
    onChange: jest.fn(),
    value: 'terms',
    checked: false,
    label: 'Accept',
  }
  const wrapper = shallow(<Checkbox {...props} />)

  it('should be a div with a class for the container', () => {
    expect(wrapper.hasClass('checkbox-container')).toEqual(true)
    expect(wrapper.type()).toEqual('div')
  })
})
