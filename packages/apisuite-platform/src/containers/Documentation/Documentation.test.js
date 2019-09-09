import React from 'react'
import { mountWithIntl } from 'util/test-utils'
import { shallow } from 'enzyme'
import Documentation from './Documentation'
import reducer, { changeTopic } from './ducks'
import AccountFlow from './Topics/AccountFlow'
import PaymentFlow from './Topics/PaymentFlow'
import TwoFA from './Topics/TwoFA'
import UsingPostman from './Topics/UsingPostman'
import UsingPostmanCollections from './Topics/UsingPostmanCollections'
import UsingTheConsole from './Topics/UsingTheConsole'
import ProductionEndpoints from './Topics/ProductionEndpoints'
import SignatureAuthentificationSheme from './Topics/SignatureAuthenticationScheme'
import themes from 'themes'

describe('<Documentation />', () => {
  const props = {
    auth: {
      user: {
        id: 1,
      },
    },
    history: { push: jest.fn() },
    location: { search: '?access_token=1234', pathname: '/docs/started' },
    changeTopic: jest.fn(),
    documentation: {
      topic: null,
      child: null,
    },
    theme: themes.default,
  }
  const wrapper = mountWithIntl(<Documentation {...props} />)

  it('should have a div container', () => {
    expect(wrapper.find('.docs-container')).toHaveLength(1)
  })

  it('should change topic', () => {
    const handleOpenSpy = jest.spyOn(wrapper.instance(), 'handleOpen')
    const handleClickSpy = jest.spyOn(wrapper.instance(), 'handleClick')
    wrapper.find('#g0').first().simulate('click')
    expect(handleOpenSpy).toHaveBeenCalledWith(0)
    wrapper.find('#get0').first().simulate('click')
    expect(handleClickSpy).toHaveBeenCalledWith(0, 0)
  })

  it('should navigate to footer link', () => {
    wrapper.find('.section-title').at(1).simulate('click')
    expect(props.history.push).toHaveBeenCalledWith('/api-references')
  })
})

describe('Documentation reducer', () => {
  const initialState = {
    topic: null,
    child: null,
  }

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should update state on CHANGE_TOPIC', () => {
    const topic = 0
    const child = 0
    expect(reducer(initialState, changeTopic(topic, child))).toEqual({ ...initialState, child, topic })
  })
})

describe('<AccountFlow />', () => {
  const wrapper = shallow(<AccountFlow />)

  it('should have a div container', () => {
    expect(wrapper.find('.topic-container')).toHaveLength(1)
  })
})

describe('<PaymentFlow />', () => {
  const wrapper = shallow(<PaymentFlow />)

  it('should have a div container', () => {
    expect(wrapper.find('.topic-container')).toHaveLength(1)
  })
})

describe('<TwoFA />', () => {
  const wrapper = shallow(<TwoFA />)

  it('should have a div container', () => {
    expect(wrapper.find('.topic-container')).toHaveLength(1)
  })
})

describe('<UsingPostman />', () => {
  const wrapper = shallow(<UsingPostman />)

  it('should have a div container', () => {
    expect(wrapper.find('.topic-container')).toHaveLength(1)
  })
})

describe('<UsingPostmanCollections />', () => {
  const wrapper = shallow(<UsingPostmanCollections />)

  it('should have a div container', () => {
    expect(wrapper.find('.topic-container')).toHaveLength(1)
  })
})

describe('<UsingTheConsole />', () => {
  const wrapper = shallow(<UsingTheConsole />)

  it('should have a div container', () => {
    expect(wrapper.find('.topic-container')).toHaveLength(1)
  })
})

describe('<ProductionEndpoints />', () => {
  const wrapper = shallow(<ProductionEndpoints />)

  it('should have a div container', () => {
    expect(wrapper.find('.topic-container')).toHaveLength(1)
  })
})

describe('<SignatureAuthentificationSheme />', () => {
  const wrapper = shallow(<SignatureAuthentificationSheme />)

  it('should have a div container', () => {
    expect(wrapper.find('.topic-container')).toHaveLength(1)
  })
})
