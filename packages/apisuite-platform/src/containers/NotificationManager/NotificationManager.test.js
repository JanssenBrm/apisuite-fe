
import React from 'react'
import { mountWithIntl, shallowWithIntl } from 'util/test-utils'
import NotificationManager from './NotificationManager'
import reducer, { showNotification, hideNotification } from './ducks'

const initialState = {
  variant: null,
  message: null,
  show: false,
  fromAPI: false
}
const mockMessage = {
  message: 'test message',
  variant: 'success'
}
const props = {
  hideNotification: jest.fn()
}

describe('<NotificationManager />', () => {
  const wrapper = shallowWithIntl(<NotificationManager {...props} />).dive()

  it('should not show the component since the start', () => {
    expect(!wrapper.props().show)
  })

  it('should hide notification on handleClose', () => {
    const event = {}
    let reason = 'clickaway'
    wrapper.setProps({ message: 'app.delete.success' })
    wrapper.instance().handleClose(event, reason)
    expect(props.hideNotification).not.toHaveBeenCalled()
    reason = 'test'
    wrapper.instance().handleClose(event, reason)
    expect(props.hideNotification).toHaveBeenCalled()
  })
})

describe('NotificationManager reducer', () => {
  const wrapper = mountWithIntl(<NotificationManager {...props} />)

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should trigger a PopMessage show', () => {
    const { message, variant } = mockMessage
    const wrapperProps = wrapper.props()

    expect(reducer(initialState, showNotification(variant, message))).toEqual({...initialState,
      message: mockMessage.message,
      variant: mockMessage.variant,
      show: true
    })
    expect(
      wrapperProps.show === true &&
      wrapperProps.message === mockMessage.message &&
      wrapperProps.variant === mockMessage.variant &&
      wrapperProps.fromAPI === false
    )
  })

  it('should trigger a PopMessage hide', () => {
    expect(reducer(initialState, hideNotification())).toEqual({...initialState,
      show: false
    })
  })
})
