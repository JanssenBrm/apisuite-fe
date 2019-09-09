import React from 'react'
import { string, object, oneOfType } from 'prop-types'

const Badge = ({ text, type }) => (
  <div className='badge'>
    <div className={`badge-label ${type}`}>
      {text}
    </div>
  </div>
)

Badge.defaultProps = {
  type: 'default',
}

Badge.propTypes = {
  text: oneOfType([object, string]).isRequired,
  type: string,
}

export default Badge
