/**
 * Test helpers
 */

import React from 'react'
import { object } from 'prop-types'
import createRouterContext from 'react-router-test-context'
import { mount, shallow } from 'enzyme'
import { IntlProvider, intlShape } from 'react-intl'
import { translationMessages, formats } from 'util/i18n'

const intlProvider = new IntlProvider({ locale: 'en', messages: translationMessages.en, formats })
const { intl } = intlProvider.getChildContext()

const nodeWithIntlProp = (node) =>
  React.cloneElement(node, { intl })

export const getNodeAttr = (node, name) => node.html().match(new RegExp(`${name}="([^"]*)"`, 'i'))[1]
export const getChildrenAttrs = (nodes, name) => nodes.map(node => getNodeAttr(node, name)).join(' ')

export const mountWithIntl = (tree) =>
  mount(
    nodeWithIntlProp(tree), {
      context: { ...intlProvider.getChildContext() },
      childContextTypes: { intl: intlShape },
    }
  )

export const shallowWithIntl = (tree) =>
  shallow(
    nodeWithIntlProp(tree), {
      context: { ...intlProvider.getChildContext() },
      childContextTypes: { intl: intlShape },
    }
  )

export const fullMount = (tree) => mount(tree, {
  context: { ...createRouterContext(), ...intlProvider.getChildContext() },
  childContextTypes: {
    router: object,
    intl: intlShape,
  },
})

// Takes the context data we want to test, or uses defaults
export const getComponentWithContext = (path, context) => {
  // Will then mock the ThemeContext module being used in our component
  jest.doMock('../components/ThemeContext', () => ({
    ThemeContext: {
      Consumer: (props) => props.children(context),
    },
  }))
  // you need to re-require after calling jest.doMock.
  // return the updated Component module that now includes the mocked context
  return require(`../${path}`).default
}
