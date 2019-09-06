import React from 'react'
import { FormattedMessage } from 'react-intl'

const Topic = () => (
  <div className='topic-container'>
    <h2 className='headline'>
      <FormattedMessage id='docs.clientidsecret.title' />
    </h2>
    <p>
      <FormattedMessage id='docs.clientidsecret.p1' />
    </p>
    <p>
      <FormattedMessage id='docs.clientidsecret.p2' />
    </p>
  </div>
)

export default Topic
