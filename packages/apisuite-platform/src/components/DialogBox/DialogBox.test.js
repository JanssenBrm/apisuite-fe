import React from 'react'
import { mount } from 'enzyme'
import DialogBox from './DialogBox'

describe('<DialogBox />', () => {
  const props = {
    open: false,
    content: 'content',
    actions: ['action1', 'action2']
  }
  const actions = ['action1', 'action2']
  const wrapper = mount(<DialogBox {...props} />)

  it('should open DialogBox when state.open is true', () => {
    expect(wrapper.find('Dialog').first().props().open).toEqual(false)
    wrapper.setProps({ open: true })
    expect(wrapper.find('Dialog').first().props().open).toEqual(true)
  })

  it('should find DialogTitle when title is set', () => {
    expect(wrapper.find('#form-dialog-title').first()).toHaveLength(0)
    wrapper.setProps({ title: 'title-stub' })
    expect(wrapper.find('#form-dialog-title').first()).toHaveLength(1)
  })

  it('should render the actions', () => {
    expect(wrapper.find('.dialog-action')).toHaveLength(actions.length)
  })

  it('should have a default onClose function', () => {
    expect(wrapper.props().onClose).toBeDefined()
    wrapper.props().onClose()
  })
})
