import React from 'react'
import { FormattedMessage } from 'react-intl'

const Topic = () => (
  <div className='topic-container'>
    <h2 className='headline'>
      <FormattedMessage id='docs.creatingaccount.title' />
    </h2>
    <p>
      <FormattedMessage id='docs.creatingaccount.p1' />
    </p>
    <p>
      <FormattedMessage id='docs.creatingaccount.p2' />
    </p>
    <p>
      <FormattedMessage id='docs.creatingaccount.p3' />
    </p>
  </div>
)

export default Topic
