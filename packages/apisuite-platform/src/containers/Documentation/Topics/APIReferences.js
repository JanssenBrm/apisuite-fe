import React from 'react'
import { FormattedMessage } from 'react-intl'

const Topic = () => (
  <div className='topic-container'>
    <h2 className='headline'>
      <FormattedMessage id='docs.navigateapireferences.title' />
    </h2>
    <p>
      <FormattedMessage id='docs.navigateapireferences.p1' />
    </p>
    <p>
      <FormattedMessage id='docs.navigateapireferences.p2' />
    </p>
  </div>
)

export default Topic
