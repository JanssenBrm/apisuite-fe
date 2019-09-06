import React from 'react'
import { array, string, node } from 'prop-types'
import classnames from 'classnames'

const Card = ({ children, scope, creator }) => (
  <div className='card'>
    <div
      className={classnames(
        'card-wrapper',
        { [`${scope}-wrapper`]: scope }
      )}
    >
      { children.map((content, key) =>
        <div
          key={key}
          className={classnames(
            'card-content-item',
            { [`${scope}-item`]: scope }
          )}
        >
          {content}
        </div>)
      }
      {creator}
    </div>
    {!creator && <div className='card-shadow' />}
    {!creator && <div className='card-shadow-side' />}
  </div>
)

Card.propTypes = {
  children: array.isRequired,
  scope: string,
  creator: node
}

export default Card
