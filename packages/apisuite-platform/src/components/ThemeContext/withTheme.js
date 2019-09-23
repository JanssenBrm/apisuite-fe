import React from 'react'
import ThemeContext from './ThemeContext'

const withTheme = (Component) =>
  props =>
    <ThemeContext.Consumer>
      {theme =>
        <Component {...props} theme={theme} />}
    </ThemeContext.Consumer>

export default withTheme
