import React, { FC } from 'react'
import { $Button } from './button.styles'
import { ButtonProps as Props } from './button.types'

const Button: FC<Props> = ({ children, ...rest }) => (
  <$Button variant="contained" {...rest}>
    {children}
  </$Button>
)

export default Button
