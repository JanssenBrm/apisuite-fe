import * as React from 'react'
import iconPaths from './iconPaths'

import { SvgIconProps } from './types'

const SvgIcon: React.FC<SvgIconProps> = ({ size = 16, name, color = 'currentColor', style, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill={color}
    style={{ display: 'block', ...style }}
    {...rest}
  >
    <path d={iconPaths[name]} />
  </svg>
)

export default SvgIcon
