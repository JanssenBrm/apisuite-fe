import * as React from 'react'
import { __RouterContext as RouterContext, matchPath } from 'react-router'
import { LazySwitchProps } from './types'

const LazySwitch: React.FC<LazySwitchProps> = ({ children, location }) => {
  const context = React.useContext(RouterContext)
  const [child, setChild] = React.useState(null)

  React.useEffect(() => {
    const theLocation = location || context.location

    let element: any
    let match: any

    // We use React.Children.forEach instead of React.Children.toArray().find()
    // here because toArray adds keys to all child elements and we do not want
    // to trigger an unmount/remount for two <Route>s that render the same
    // component at different URLs.
    React.Children.forEach(children, (child) => {
      if (match == null && React.isValidElement(child)) {
        element = child

        const path = child.props.path || child.props.from

        match = path
          ? matchPath(theLocation.pathname, { ...child.props, path })
          : context.match
      }
    })

    // @ts-ignore
    setChild(match ? React.cloneElement(element, { location: theLocation, computedMatch: match }) : null)
  }, [context])

  return child
}

export default LazySwitch
