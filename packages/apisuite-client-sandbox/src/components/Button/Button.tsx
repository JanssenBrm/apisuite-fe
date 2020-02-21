import * as React from 'react'
import classnames from 'classnames'

import './styles.scss'

const Button: React.FC<{label?: any,
  type?: string,
  fullWidth?: boolean,
  href?: string,
  loading?: boolean,
  disabled?: boolean,
  onClick?: any,
}> = ({ label, type, fullWidth, href, loading, disabled, onClick, ...rest }) => (
  <div onClick={!disabled && !loading ? onClick : null}>
    {href && !disabled && <a href={href} target='_blank' rel='noopener noreferrer' className={classnames('button', type, { 'full-width': fullWidth || false }, { 'disabled': disabled || loading || false }, { 'loading': loading || false })}>{label}</a>}
    {!href && <div className={classnames('button', type, { 'full-width': fullWidth || false }, { 'disabled': disabled || loading || false }, { 'loading': loading || false })} {...rest}>{label}</div>}
  </div>
)

export default Button
