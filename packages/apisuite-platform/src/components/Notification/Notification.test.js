import React from 'react'
import { shallow } from 'enzyme'
import Notification from 'components/Notification'

describe('<Notification />', () => {
  const props = {
    tag: 'release',
    message: '<strong>NEWS:</strong> A new release.',
    url: 'https://cloudoki.com',
    handleClose: jest.fn(),
  }

  const wrapper = shallow(<Notification {...props} />)

  it('should be a div with a class for the container', () => {
    expect(wrapper.hasClass('portal-notification-container')).toEqual(true)
    expect(wrapper.type()).toEqual('div')
  })

  it('should render a tag, message, url and close button', () => {
    expect(wrapper.find('.tag')).toHaveLength(1)
    expect(wrapper.find('.message')).toHaveLength(1)
    expect(wrapper.find('.view-more')).toHaveLength(1)
    expect(wrapper.find('.close')).toHaveLength(1)
  })

  it('should call the close function', () => {
    wrapper.find('.close').simulate('click')
    expect(props.handleClose).toHaveBeenCalled()
  })
})
