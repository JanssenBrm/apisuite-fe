import React from 'react'
import SectionSubscribe from './SectionSubscribe'
import { translationMessages, formats } from 'util/i18n'
import { IntlProvider } from 'react-intl'
import { shallowWithIntl } from 'util/test-utils'

const intlProvider = new IntlProvider({ locale: 'en', messages: translationMessages.en, formats })
const { intl } = intlProvider.getChildContext()

describe('<SectionSubscribe />', () => {
  const props = {
    intl,
    sendNewsletterForm: jest.fn(),
    theme: {},
  }
  const wrapper = shallowWithIntl(<SectionSubscribe {...props} />)

  it('should have div section as parent', () => {
    expect(wrapper).toHaveLength(1)
  })
})
