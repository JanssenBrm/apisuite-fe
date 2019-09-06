import React from 'react'
import { mount } from 'enzyme'
import SelectInput from 'components/SelectInput'
import Chip from '@material-ui/core/Chip'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'

describe('<SelectInput />', () => {
  const props = {
    helperText: 'helper',
    children: [
      <MenuItem key='key1' value={{ description: 'descr1', value: 'val1' }}>descr1</MenuItem>,
      <MenuItem key='key2' value={{ description: 'descr2', value: 'val2' }}>descr2</MenuItem>
    ],
    value: [1],
    data: [
      { id: 1, description: 'descr1', value: 'val1' },
      { id: 2, description: 'descr2', value: 'val2' }
    ],
    multiple: true,
    shrink: 'true'

  }
  const wrapper = mount(<SelectInput {...props} />)

  it('should have FormControl as parent', () => {
    expect(wrapper.find(FormControl)).toHaveLength(1)
  })

  it('should add chips if multiple select', () => {
    expect(wrapper.find('.chips')).toHaveLength(1)
    expect(wrapper.find(Chip)).toHaveLength(1)
  })

  it('should have select-single class if not multiple select', () => {
    wrapper.setProps({ multiple: false, value: 1 })
    wrapper.mount()
    expect(wrapper.find('.select-single')).toHaveLength(1)
  })

  it('should have a default onChange function', () => {
    expect(wrapper.props().onChange).toBeDefined()
    wrapper.props().onChange()
  })
})
