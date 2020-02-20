import * as React from 'react'
import classnames from 'classnames'

import './styles.scss'

const Button = ({label, type, fullWidth, href, loading, disabled, onClick, ...rest}) => (
  <div onClick={!disabled && !loading ? onClick: ()=>{}}>
    {href && !disabled &&
      <a
        href={href}
        target='_blank'
        className={classnames('button', type,
          {'full-width': fullWidth || false},
          {'disabled': disabled || loading || false},
          {'loading': loading || false},
        )}
      >
        {label}
      </a>
    }
    {!href &&
      <div
        className={classnames('button', type,
        {'full-width': fullWidth || false},
        {'disabled': disabled || loading || false},
        {'loading': loading || false},
      )}
        {...rest}
      >
        {label}
      </div>
    }
  </div>
)   

export default Button
