import React from 'react'
import { FormattedMessage } from 'react-intl'

const Topic = () => (
  <div className='topic-container'>
    <h2 className='headline'>
      <FormattedMessage id='navigation.docs.console.title' />
    </h2>
    <p>
      <FormattedMessage id='navigation.docs.console.text1' />
    </p>
  </div>
)

export default Topic
