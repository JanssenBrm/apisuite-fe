import React from 'react'
import { mountWithIntl } from 'util/test-utils'
import RecoveryCodes from './RecoveryCodes'
import themes from 'themes'
import request from 'util/request'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import reducer, {
  getCodes,
  getCodesSuccess,
  getCodesError,
  cleanCodes,
} from './ducks'
import { getCodesSaga } from './sagas'

describe('<RecoveryCodes />', () => {
  const props = {
    intl: {},
    auth: {
      user: {},
    },
    signup: {
      user: {},
    },
    history: { push: jest.fn() },
    theme: themes.default,
    cleanCodes: jest.fn(),
    codes: [],
  }

  const dummyCodes = ['123', '456']
  const dummySignup = {
    user: {
      codes: dummyCodes,
    },
  }

  const wrapper = mountWithIntl(<RecoveryCodes {...props} />)

  it('should find the container', () => {
    expect(wrapper.find('.recoveryCodes')).toHaveLength(1)
  })

  it('should get no codes and redirect', () => {
    expect(wrapper.state().codes).toEqual([])
  })

  it('should get codes from signup', () => {
    const wrapper2 = mountWithIntl(<RecoveryCodes {...{ ...props, signup: dummySignup }} />)
    expect(wrapper2.state().codes).toBe(dummyCodes)
  })

  it('should update codes state from new signup props', () => {
    const wrapper3 = mountWithIntl(<RecoveryCodes {...{ ...props, auth: { ...props.auth, authToken: 'xxx' }, signup: dummySignup }} />)
    const codes = dummySignup.user.codes
    wrapper3.setProps({ auth: { user: { codes } } })
    expect(wrapper3.instance().state.codes).toEqual(codes)
  })

  it('should update state on new props', () => {
    const newCodes = ['222']
    wrapper.setProps({ codes: newCodes })
    expect(wrapper.state().codes).toEqual(newCodes)
  })

  it('should call cleanCodes on unmount', () => {
    wrapper.unmount()
    expect(props.cleanCodes).toHaveBeenCalled()
  })
})

const initialState = {
  codes: [],
}

describe('RecoveryCodes ducks', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should update state on GET_CODES_SUCCESS', () => {
    const data = ['xxx', 'yyy']
    expect(reducer(initialState, getCodesSuccess(data))).toEqual({ ...initialState, codes: data })
  })

  it('should reset codes state on GET_CODES_ERROR', () => {
    expect(reducer(initialState, getCodesError())).toEqual({ ...initialState, codes: [] })
  })

  it('should reset state on CLEAN_CODES', () => {
    expect(reducer(initialState, cleanCodes())).toEqual({ ...initialState, codes: [] })
  })
})

const errorMock = { message: 'error-stub' }

describe('RecoveryCodes sagas', () => {
  it('should call get codes API', () => {
    const fakeResponse = { data: [] }

    return expectSaga(getCodesSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(getCodesSuccess())
      .dispatch(getCodes())
      .silentRun()
  })

  it('should call get codes API and handle the error', () => {
    const fakeResponse = { err: errorMock }

    return expectSaga(getCodesSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(getCodesError(errorMock))
      .dispatch(getCodes())
      .silentRun()
  })
})
