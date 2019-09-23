import React from 'react'
import { shallowWithIntl } from 'util/test-utils'
import request from 'util/request'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { sendSupportFormSaga } from './sagas'
import Support from './Support'
import reducer, {
  sendSupportForm,
  sendSupportFormSuccess,
  sendSupportFormError,
  openSupportModal,
  resetSupportModal,
  saveCaptcha,
  resetCaptcha,
} from './ducks'
import { translationMessages, formats } from 'util/i18n'
import { IntlProvider } from 'react-intl'

const intlProvider = new IntlProvider({ locale: 'en', messages: translationMessages.en, formats })
const { intl } = intlProvider.getChildContext()

const initialState = {
  open: false,
  option: null,
  captcha: {
    value: null,
  },
  form: null,
}

const errorMock = { message: 'error-stub' }

const fakeForm = {
  type: '1',
  environment: '',
  subject: 'issue-subject-mock',
  message: 'issue-description-mock',
  refLink: '',
  fullName: 'MH Mai',
  email: 'example@gmail.com',
  organisation: '',
  terms: true,
}

describe('<Support />', () => {
  const props = {
    intl,
    isLoggedIn: false,
    captcha: {
      value: null,
    },
    auth: {
      user: {
        fullName: 'MH',
        email: 'mh@gmail.com',
      },
    },
    resetCaptcha: jest.fn(),
    sendSupportForm: jest.fn(),
    history: {
      push: jest.fn(),
    },
  }

  const wrapper = shallowWithIntl(<Support {...props} />)

  it('should change state on input change', () => {
    const subjectStub = 'subject-stub'
    wrapper.find('#subject').first().simulate('change', { target: { name: 'subject', value: subjectStub } })
    expect(wrapper.state().form.subject).toEqual(subjectStub)
  })

  it('should not call sendSupportForm if type of inquiry, subject and message are empty', () => {
    wrapper.find('#sendBtn').last().simulate('click')
    expect(props.sendSupportForm).not.toHaveBeenCalled()
  })

  it('should not call sendSupportForm if user is not logged in AND type of inquiry is connection incident', () => {
    const fakeForm = {
      type: '2',
      environment: '',
      subject: 'issue-subject-mock',
      message: 'issue-description-mock',
      refLink: '',
      fullName: 'MH Mai',
      email: 'example@gmail.com',
      organisation: '',
      terms: true,
    }
    wrapper.setProps({
      isLoggedIn: false,
      captcha: {
        value: null,
      },
    })
    wrapper.setState({
      form: {
        ...fakeForm,
        subject: fakeForm.subject,
        message: fakeForm.message,
        type: fakeForm.type,
      },
      errors: [],
    })
    wrapper.find('#sendBtn').last().simulate('click')
    expect(props.sendSupportForm).not.toHaveBeenCalled()
  })

  it('should call sendSupportForm if user is not logged in AND type of inquiry is connection incident', () => {
    const fakeForm = {
      type: '2',
      environment: '1',
      subject: 'issue-subject-mock',
      message: 'issue-description-mock',
      refLink: '',
      fullName: 'MH Mai',
      email: 'example@gmail.com',
      organisation: '',
      terms: true,
    }
    wrapper.setProps({
      isLoggedIn: false,
      captcha: {
        value: 'toto',
      },
    })
    wrapper.setState({
      form: {
        ...fakeForm,
        subject: fakeForm.subject,
        message: fakeForm.message,
        type: fakeForm.type,
        environment: fakeForm.environment,
      },
      errors: [],
    })
    wrapper.find('#sendBtn').last().simulate('click')
    expect(props.sendSupportForm).toHaveBeenCalled()
  })

  it('should call sendSupportForm if user is logged in AND type of inquiry is connection incident', () => {
    const fakeForm = {
      type: '2',
      environment: '2',
      subject: 'issue-subject-mock',
      message: 'issue-description-mock',
      refLink: '',
      fullName: 'MH Mai',
      email: 'example@gmail.com',
      organisation: '',
      terms: true,
    }
    wrapper.setProps({
      isLoggedIn: true,
      captcha: {
        value: null,
      },
    })
    wrapper.setState({
      form: {
        ...fakeForm,
      },
      errors: [],
    })
    const expectedTicket = {
      subject: 'issue-subject-mock',
      message: 'issue-description-mock',
      name: 'MH',
      email: 'mh@gmail.com',
      type: 'incident',
      organization: '',
      refLink: '',
      captcha: null,
      environment: 'production',
    }
    wrapper.find('#sendBtn').last().simulate('click')
    expect(props.sendSupportForm).toHaveBeenCalled()
    expect(props.sendSupportForm).toHaveBeenCalledWith(expectedTicket)
  })

  it('should call sendSupportForm if user is logged in AND type of inquiry, subject, message are filled', () => {
    wrapper.setProps({
      isLoggedIn: true,
    })
    wrapper.setState({
      form: {
        ...fakeForm,
        subject: fakeForm.subject,
        message: fakeForm.message,
        type: fakeForm.type,
      },
      errors: [],
    })
    wrapper.find('#sendBtn').last().simulate('click')
    expect(props.sendSupportForm).toHaveBeenCalled()
  })

  it('should call sendSupportForm if user is NOT logged in AND type of inquiry, subject, message, fullName, email, terms, captcha are filled', () => {
    wrapper.setProps({
      isLoggedIn: false,
    })
    wrapper.setState({
      form: {
        ...fakeForm,
        subject: fakeForm.subject,
        message: fakeForm.message,
        type: fakeForm.type,
        fullName: fakeForm.fullName,
        email: fakeForm.email,
        terms: fakeForm.terms,
      },
      captcha: 'abc',
      errors: [],
    })
    wrapper.find('#sendBtn').last().simulate('click')
    expect(props.sendSupportForm).toHaveBeenCalled()
  })
})

describe('Support reducer', () => {
  const optionStub = 'option-stub'
  const captchaStub = { value: 'captcha-stub' }

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should set open and option state on OPEN_SUPPORT_MODAL', () => {
    expect(reducer(initialState, openSupportModal(optionStub))).toEqual({
      ...initialState,
      open: true,
      option: optionStub,
    })
  })

  it('should set reset open and option state on RESET_SUPPORT_MODAL', () => {
    expect(reducer(initialState, resetSupportModal(optionStub))).toEqual({ ...initialState })
  })

  it('should set captcha state on SAVE_CAPTCHA', () => {
    expect(reducer(initialState, saveCaptcha(captchaStub.value))).toEqual({ ...initialState, captcha: captchaStub })
  })

  it('should set captcha state on RESET_CAPTCHA', () => {
    expect(reducer(initialState, resetCaptcha())).toEqual({ ...initialState })
  })

  it('should set form state on SEND_SUPPORT_FORM', () => {
    expect(reducer(initialState, sendSupportForm(fakeForm))).toEqual({ ...initialState, form: fakeForm })
  })

  it('should set form state on SEND_SUPPORT_FORM_SUCCESS', () => {
    expect(reducer(initialState, sendSupportFormSuccess(fakeForm))).toEqual({ ...initialState, form: fakeForm })
  })

  it('should reset state on SEND_SUPPORT_FORM_ERROR', () => {
    expect(reducer(initialState, sendSupportFormError(errorMock))).toEqual({ ...initialState })
  })
})

describe('Support integration', () => {
  it('should call sendSupportForm API and return form object', () => {
    const fakeResponse = { data: fakeForm }

    return expectSaga(sendSupportFormSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(sendSupportFormSuccess(fakeForm))
      .dispatch(sendSupportForm(fakeForm))
      .silentRun()
  })

  it('should call sendSupportForm API and handle the error', () => {
    const fakeResponse = { err: errorMock }

    return expectSaga(sendSupportFormSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(sendSupportFormError(errorMock))
      .dispatch(sendSupportForm(fakeForm))
      .silentRun()
  })
})
