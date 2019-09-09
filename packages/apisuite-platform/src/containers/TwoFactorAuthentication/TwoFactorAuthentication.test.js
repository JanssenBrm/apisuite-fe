
import React from 'react'
import { mountWithIntl } from 'util/test-utils'
import LoginPage from './LoginPage'
import RecoveryPage from './RecoveryPage'
import { translationMessages, formats } from 'util/i18n'
import { IntlProvider } from 'react-intl'

const intlProvider = new IntlProvider({ locale: 'en', messages: translationMessages.en, formats })
const { intl } = intlProvider.getChildContext()

describe('<LoginPage />', () => {
  const props = {
    auth: {
      ui: {
        loading: false,
      },
      TwoFA: {},
    },
    twoFaAuth: jest.fn(),
    openRecovery: jest.fn(),
    sendSMSCode: jest.fn(),
    intl,
  }
  const wrapper = mountWithIntl(<LoginPage {...props} />)

  it('should have a two-fa-login container', () => {
    expect(wrapper.find('.two-fa-login')).toHaveLength(1)
  })

  it('should call twoFaAuth on submit', () => {
    const code = '123456'
    wrapper.setState({ code })
    wrapper.find('.two-fa-submit').first().simulate('click')
    expect(props.twoFaAuth).toHaveBeenCalledWith(code)
  })

  // it('should call sendSMSCode', () => {
  //   wrapper.find('.send-sms-btn').first().simulate('click')
  //   expect(props.sendSMSCode).toHaveBeenCalledWith()
  // })
})

describe('<RecoveryPage />', () => {
  const props = {
    auth: {
      ui: {
        loading: false,
      },
      TwoFA: {},
    },
    verifyRecoveryCode: jest.fn(),
    openSupport: jest.fn(),
    intl,
  }
  const wrapper = mountWithIntl(<RecoveryPage {...props} />)

  it('should have a two-fa-recovery container', () => {
    expect(wrapper.find('.two-fa-recovery')).toHaveLength(1)
  })

  it('should call verifyRecoveryCode on submit', () => {
    const code = '123456'
    wrapper.setState({ code })
    wrapper.find('.two-fa-submit').first().simulate('click')
    expect(props.verifyRecoveryCode).toHaveBeenCalledWith(code)
  })
})
