import React from 'react'
import { string } from 'prop-types'

const NotFound = ({ message }) => (
  <div className='not-found'>
    <h4>
      {message}
    </h4>
  </div>
)

NotFound.defaultProps = {
  message: '404 Page Not Found',
}

NotFound.propTypes = {
  /**
   * Error message to be displayed
   */
  message: string,
}

export default NotFound
