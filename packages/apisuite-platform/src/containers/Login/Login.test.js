
import React from 'react'
import { mountWithIntl } from 'util/test-utils'
import Login from './Login'
import { translationMessages, formats } from 'util/i18n'
import { IntlProvider } from 'react-intl'
import { API_URL } from 'constants/endpoints'

const intlProvider = new IntlProvider({ locale: 'en', messages: translationMessages.en, formats })
const { intl } = intlProvider.getChildContext()

const fakeUi = {
  success: false,
  error: false,
  message: null,
}

describe('<Login />', () => {
  const props = {
    logUserIn: jest.fn(),
    ghLogin: jest.fn(),
    openForgotPassword: jest.fn(),
    ui: fakeUi,
    intl,
    history: { push: jest.fn() },
  }
  const wrapper = mountWithIntl(<Login {...props} />)

  const email = 'email@email.com'
  const password = 'password-stub'

  it('should not call onButtonClick if email or password empty', () => {
    wrapper.find('.login-submit').first().simulate('click')
    expect(props.logUserIn).not.toHaveBeenCalled()
  })

  it('should call onButtonClick with email and password values', () => {
    wrapper.setState({ form: { email, password } })
    wrapper.find('.login-submit').first().simulate('click')
    expect(props.logUserIn).toHaveBeenCalledWith({ email, password })
  })

  it('should go to signup on link click', () => {
    wrapper.find('#signup-link').first().simulate('click')
    expect(props.history.push).toHaveBeenCalledWith('/signup')
  })

  // it('should login with Github', () => {
  //   const loginWithGhSpy = jest.spyOn(wrapper.instance(), 'loginWithGh')
  //   wrapper.find('.gh-login-button').first().simulate('click')
  //   expect(loginWithGhSpy).toHaveBeenCalled()
  //   expect(window.location.href).toEqual(`${API_URL}/auth/github`)
  // })
})
