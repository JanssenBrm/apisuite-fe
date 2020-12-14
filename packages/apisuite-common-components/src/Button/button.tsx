import React, { FC } from 'react'
import Button from '@material-ui/core/Button'
import useStyles from './button.styles'
import { ButtonProps as Props } from './button.types'

const $Button: FC<Props> = ({ children, ...rest }) => {
  const classes = useStyles(rest)

  return (
    <Button className={classes.apisButton} variant="contained" {...rest}>
      {children}
    </Button>
  )
}

export default $Button
