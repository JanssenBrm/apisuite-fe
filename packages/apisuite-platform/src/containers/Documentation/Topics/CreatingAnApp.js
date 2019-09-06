import React from 'react'
import { FormattedMessage } from 'react-intl'

const Topic = () => (
  <div className='topic-container'>
    <h2 className='headline'>
      <FormattedMessage id='docs.creatingapps.title' />
    </h2>
    <p>
      <FormattedMessage id='docs.creatingapps.p1' />
    </p>
    <ol>
      <li><FormattedMessage id='docs.creatingapps.li1' /></li>
      <li><FormattedMessage id='docs.creatingapps.li2' /></li>
      <li><FormattedMessage id='docs.creatingapps.li3' /></li>
      <li><FormattedMessage id='docs.creatingapps.li4' /></li>
      <li><FormattedMessage id='docs.creatingapps.li5' /></li>
    </ol>
    <p>
      <FormattedMessage id='docs.creatingapps.p2' />
    </p>
  </div>
)

export default Topic
