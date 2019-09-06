import React from 'react'
import { shallow } from 'enzyme'
import MultiSelect from './MultiSelect'
import Checkbox from 'components/Checkbox'

describe('<MultiSelect />', () => {
  const props = {
    onChange: jest.fn(),
    onClick: jest.fn(),
    options: [
      { id: 1, name: 'Option 1' },
      { id: 2, name: 'Option 2' }
    ],
    expanded: true,
    selected: [1]
  }
  const wrapper = shallow(<MultiSelect {...props} />)

  it('should be a div with a class for the container', () => {
    expect(wrapper.hasClass('multiselect-container')).toEqual(true)
    expect(wrapper.type()).toEqual('div')
  })

  it('should render 2 checkboxes', () => {
    expect(wrapper.find(Checkbox).length).toEqual(2)
  })

  it('should call onChange on checkbox click', () => {
    wrapper.find(Checkbox).first().simulate('click')
    expect(props.onChange).toHaveBeenCalledWith(props.options[0])
  })
})
