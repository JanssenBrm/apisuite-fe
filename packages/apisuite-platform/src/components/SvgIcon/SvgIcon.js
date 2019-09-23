import React from 'react'
import { string, number, oneOfType } from 'prop-types'
import iconPaths from './iconPaths'

const SvgIcon = ({ size, name, color, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill={color}
    {...rest}
  >
    <path d={iconPaths[name]} />
  </svg>
)

SvgIcon.defaultProps = {
  size: 24,
  color: '#fff',
}

SvgIcon.propTypes = {
  /**
   * The width and height of the icon, it should be uniform
   */
  size: oneOfType([number, string]),
  /**
   * The icon path name - see `iconPaths.js`
   */
  name: string.isRequired,
  /**
   * The stroke color to be applied to the vector
   */
  color: string,
}

export default SvgIcon
