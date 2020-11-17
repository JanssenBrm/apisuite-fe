import * as React from 'react'

import classnames from 'classnames'

import useStyles from './styles'

import './styles.scss'

// TODO: Clean this up - I believe 'classes.dark' is not used anywhere on the app

const Button: React.FC<{
  background?: string,
  color?: string,
  customButtonClassName?: string,
  disabled?: boolean,
  fullWidth?: boolean,
  href?: string,
  label?: any,
  loading?: boolean,
  onClick?: any,
  type?: string,
}> = ({
  background,
  color,
  customButtonClassName,
  disabled,
  fullWidth,
  href,
  label,
  loading,
  onClick,
  type,
  ...rest
}) => {
  const classes = useStyles()

  return (
    <div onClick={!disabled && !loading ? onClick : null}>
      {href && !disabled && (
        <a
          to={href}
          target='_blank'
          rel='noopener noreferrer'
          className={customButtonClassName || classnames(
            [classes.button],
            type,
            // Background color
            { [classes.dark]: background && background === 'dark' },
            { [classes.secondary]: background && background === 'secondary' },
            { [classes.tertiary]: background && background === 'tertiary' },
            { [classes.transparent]: background && background === 'transparent' },
            // Text color
            { [classes.primaryColor]: color && color === 'primary' },
            { [classes.secondaryColor]: color && color === 'secondary' },
            // Status
            { [classes.disabled]: disabled || loading || false },
            { [classes.fullWidth]: fullWidth || false },
            { [classes.loading]: loading || false },
          )}
          {...rest}
        >
          {label}
        </a>
      )}

      {!href && (
        <div
          className={customButtonClassName || classnames(
            [classes.button],
            type,
            // Background color
            { [classes.dark]: background && background === 'dark' },
            { [classes.secondary]: background && background === 'secondary' },
            { [classes.tertiary]: background && background === 'tertiary' },
            { [classes.transparent]: background && background === 'transparent' },
            // Text color
            { [classes.primaryColor]: color && color === 'primary' },
            { [classes.secondaryColor]: color && color === 'secondary' },
            // Status
            { [classes.disabled]: disabled || loading || false },
            { [classes.fullWidth]: fullWidth || false },
            { [classes.loading]: loading || false },
          )}
          {...rest}
        >
          {label}
        </div>
      )}
    </div>
  )
}

export default Button
