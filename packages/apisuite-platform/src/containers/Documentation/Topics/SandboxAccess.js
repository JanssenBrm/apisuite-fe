import React from 'react'
import { FormattedMessage } from 'react-intl'

const Topic = () => (
  <div className='topic-container'>
    <h2 className='headline'>
      <FormattedMessage id='docs.sandbox.title' />
    </h2>
    <p>
      <FormattedMessage id='docs.sandbox.p1' />
    </p>
    <p>
      <FormattedMessage id='docs.sandbox.p2' />
    </p>

    <h3><FormattedMessage id='docs.sandbox.access.title' /></h3>
    <p>
      <FormattedMessage id='docs.sandbox.access.p1' />
    </p>
    <p>
      <FormattedMessage id='docs.sandbox.access.p2' />
    </p>
  </div>
)

export default Topic
