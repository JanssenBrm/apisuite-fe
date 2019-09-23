import React from 'react'
import { shallow } from 'enzyme'
import Footer from './Footer'
import { translationMessages, formats } from 'util/i18n'
import { IntlProvider } from 'react-intl'
import themes from 'themes'

const intlProvider = new IntlProvider({ locale: 'en', messages: translationMessages.en, formats })
const { intl } = intlProvider.getChildContext()

describe('<Footer />', () => {
  const props = {
    navigate: jest.fn(),
    intl,
    theme: themes.default,
    user: {
      id: 1,
      scopes: [],
    },
  }
  const wrapper = shallow(<Footer {...props} />)

  it('should have a container class', () => {
    expect(wrapper.hasClass('footer-container')).toEqual(true)
    expect(wrapper.type()).toEqual('div')
  })

  it('should not have a mini behavior', () => {
    expect(wrapper.hasClass('mini')).toEqual(false)
    // expect(wrapper.find('.footer-logo')).toHaveLength(1)
    expect(wrapper.find('.footer-icons')).toHaveLength(1)
  })

  const miniWrapper = shallow(<Footer mini {...props} />)

  it('should have a mini behavior', () => {
    expect(miniWrapper.hasClass('mini')).toEqual(true)
    expect(miniWrapper.find('.footer-fab')).toHaveLength(0)
    expect(miniWrapper.find('.footer-logo')).toHaveLength(0)
    expect(miniWrapper.find('.footer-icons')).toHaveLength(0)
  })
})
