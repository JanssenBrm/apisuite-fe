import React from 'react'
import { mount } from 'enzyme'
import PopMessage from './PopMessage'

describe('<PopMessage />', () => {
  const onClose = jest.fn()
  const wrapper = mount(<PopMessage open={false} message='message-stub' variant='success' />)

  it('should have a default handleClose function', () => {
    expect(wrapper.props().handleClose).toBeDefined()
    wrapper.props().handleClose()
  })

  it('should show PopMessage when state.open is true', () => {
    wrapper.setProps({ handleClose: onClose })
    expect(wrapper.find('Snackbar').first().props().open).toEqual(false)
    wrapper.setProps({ open: true })
    expect(wrapper.find('Snackbar').first().props().open).toEqual(true)
  })

  it('should call onClose after default duration 2000ms', async () => {
    expect(wrapper.find('PopMessageContent').first().props().onClose).toEqual(onClose)
    expect(onClose).not.toHaveBeenCalled()
    await new Promise(resolve => setTimeout(resolve, 2000)).then(() => {
      expect(onClose).toHaveBeenCalled()
    })
  }, 2500)
})
