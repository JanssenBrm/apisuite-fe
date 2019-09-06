
import React from 'react'
import { shallow } from 'enzyme'
import FormField from 'components/FormField'
import TextField from '@material-ui/core/TextField'
import SelectInput from 'components/SelectInput'

describe('<FormField />', () => {
  const wrapper = shallow(<FormField name='name' />)

  it('should display TextField by default if no type is specified', () => {
    expect(wrapper.find(TextField)).toHaveLength(1)
  })

  it('should display SelectInput if type is select', () => {
    wrapper.setProps({ type: 'select' })
    expect(wrapper.find(TextField)).toHaveLength(0)
    expect(wrapper.find(SelectInput)).toHaveLength(1)
  })
})
