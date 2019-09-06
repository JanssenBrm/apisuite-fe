
import React from 'react'
import { shallow } from 'enzyme'
import DynamicFieldSet from './DynamicFieldSet'
import FormField from 'components/FormField'

const props = {
  fields: [
    'www.test1.com',
    'www.test2.com'
  ],
  onRemove: jest.fn(),
  onAdd: jest.fn(),
  actionLabel: 'label'
}

describe('<DynamicFieldSet />', () => {
  const wrapper = shallow(<DynamicFieldSet {...props} />)

  it('should have a container class', () => {
    expect(wrapper.hasClass('dynamic-fieldset-container')).toEqual(true)
    expect(wrapper.type()).toEqual('div')
  })

  it('should render dynamic fields', () => {
    expect(wrapper.find(FormField).length).toEqual(2)
  })
})
