import React from 'react'
import { FormattedMessage } from 'react-intl'

const Topic = () => (
  <div className='topic-container'>
    <h2 className='headline'>
      <FormattedMessage id='navigation.docs.postmancollection.title' />
    </h2>
    <p>
      <FormattedMessage id='navigation.docs.postmancollection.text1' />
    </p>
  </div>
)

export default Topic
