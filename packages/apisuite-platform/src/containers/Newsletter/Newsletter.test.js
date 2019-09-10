// import React from 'react'
// import { shallowWithIntl } from 'util/test-utils'
import request from 'util/request'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { sendNewsletterFormSaga } from './sagas'
import reducer, {
  sendNewsletterForm,
  sendNewsletterFormSuccess,
  sendNewsletterFormError,
  resetNewsletterForm,
} from './ducks'
// import { translationMessages, formats } from 'util/i18n'
// import { IntlProvider } from 'react-intl'
// import SectionSubscribe from '../../components/SectionSubscribe/SectionSubscribe'
// const intlProvider = new IntlProvider({ locale: 'en', messages: translationMessages.en, formats })
// const { intl } = intlProvider.getChildContext()
const initialState = {
  form: null,
  success: null,
  error: null,
}

const errorMock = { message: 'error-stub' }

describe('<Newsletter />', () => {
  // const props = {
  //   intl,
  //   newsletter: {},
  //   sendNewsletterForm: jest.fn(),
  //   theme: {},
  // }
  // const wrapper = shallowWithIntl(<SectionSubscribe {...props} />)

  // it('should send the newsletter form successfully', () => {
  //   const emailField = wrapper.find('#email')
  //   expect(emailField).toHaveLength(1)
  //   const termsCheckbox = wrapper.find('#subscribe-terms')
  //   expect(termsCheckbox).toHaveLength(1)
  //   let subscribeBtn = wrapper.find('#subscribe-btn').first()
  //   expect(subscribeBtn).toHaveLength(1)
  //   expect(wrapper.state().termsChecked).toEqual(false)
  //   expect(subscribeBtn.hasClass('disabled')).toEqual(true)
  //   emailField.simulate('change', { target: { name: 'email', value: 'email@example.com' } })
  //   termsCheckbox.simulate('change', { target: { name: 'checked', checked: true } })
  //   subscribeBtn = wrapper.find('#subscribe-btn').first()
  //   expect(subscribeBtn.hasClass('disabled')).toEqual(false)
  //   expect(wrapper.state().termsChecked).toEqual(true)
  //   expect(wrapper.state().email).toEqual('email@example.com')
  //   subscribeBtn.simulate('click')
  //   expect(props.sendNewsletterForm).toHaveBeenCalled()
  // })
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should set form state on SEND_NEWSLETTER_FORM', () => {
    const form = { email: 'yoo@gmail.com' }
    expect(reducer(initialState, sendNewsletterForm(form))).toEqual({ ...initialState, form })
  })

  it('should set form state on SEND_NEWSLETTER_FORM_SUCCESS', () => {
    const form = { email: 'yoo@gmail.com' }
    expect(reducer(initialState, sendNewsletterFormSuccess(form))).toEqual({ error: null, form: null, success: { email: 'yoo@gmail.com' } })
  })

  it('should reset state on SEND_NEWSLETTER_FORM_ERROR', () => {
    expect(reducer(initialState, sendNewsletterFormError({ message: 'yoo error' }))).toEqual({ error: { message: 'yoo error' }, form: null, success: null })
  })

  it('should reset state on RESET_NEWSLETTER_FORM', () => {
    expect(reducer(initialState, resetNewsletterForm())).toEqual({ ...initialState })
  })

  it('should call sendNewsletterForm API and return form object', () => {
    const form = { email: 'yoo@gmail.com' }
    const fakeResponse = { data: form }

    return expectSaga(sendNewsletterFormSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(sendNewsletterFormSuccess(form))
      .dispatch(sendNewsletterForm(form))
      .silentRun()
  })

  it('should call sendNewsletterForm API and handle the error', () => {
    const fakeResponse = { err: errorMock }
    const form = { email: 'yoo@gmail.com' }
    return expectSaga(sendNewsletterFormSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(sendNewsletterFormError(errorMock))
      .dispatch(sendNewsletterForm(form))
      .silentRun()
  })
})
