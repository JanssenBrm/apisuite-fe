import React from 'react'
import { mountWithIntl } from 'util/test-utils'
import SecurityTwoFa from './SecurityTwoFa'

describe('<SecurityTwoFa />', () => {
  const props = {
    intl: {},
    loading: false,
    method: '1',
    confirmationCode: '',
    showErrors: false,
    handleChange: jest.fn(),
    handleTwoFaMethodChange: jest.fn(),
    generateQRCode: jest.fn(),
    sendSMSCode: jest.fn(),
    twoFaUpdate: jest.fn(),
    route: '/profile',
    verified: false,
  }

  const wrapper = mountWithIntl(<SecurityTwoFa {...props} />)

  it('should have a div as parent', () => {
    expect(wrapper.find('.securityTwoFa')).toHaveLength(1)
  })

  it('should call generateQRCode when component is mounted on Profile', () => {
    expect(props.generateQRCode).toHaveBeenCalled()
  })

  it('should call sendSMSCode on button click when `authorizationSms` option is selected', () => {
    wrapper.setProps({
      method: '2',
    })
    const smsBtn = wrapper.find('#send-sms-button')
    smsBtn.first().simulate('click')

    expect(props.handleTwoFaMethodChange).toHaveBeenCalledTimes(1)
    expect(props.sendSMSCode).toHaveBeenCalledTimes(1)
  })

  it('should call generateQRCode when 2fa method is switched to `authorizationApp option`', () => {
    wrapper.setProps({ method: '1' })

    expect(props.handleTwoFaMethodChange).toHaveBeenCalledTimes(2)
    expect(props.generateQRCode).toHaveBeenCalledTimes(2)
  })

  it('should render qrcode container if available', () => {
    wrapper.setProps({ qrcode: 'xxxxx' })
    expect(wrapper.find('.qrcode-container')).toHaveLength(1)
  })

  it('should call twoFaUpdate on update button click', () => {
    const confirmationCode = '123456'
    wrapper.setProps({ verified: true, confirmationCode })

    wrapper.find('#twofa-update-btn').first().simulate('click')
    expect(props.twoFaUpdate).toHaveBeenCalledWith({ confirmationCode, method: 'authorizationApp' })
  })
})
