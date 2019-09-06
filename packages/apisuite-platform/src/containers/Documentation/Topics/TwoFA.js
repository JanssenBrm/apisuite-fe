import React from 'react'
import { FormattedMessage } from 'react-intl'

const Topic = () => (
  <div className='topic-container'>
    <h2 className='headline'>
      Authentication
    </h2>
    <h3>
      <FormattedMessage id='docs.twofa.title' />
    </h3>
    <p>
      <FormattedMessage id='docs.twofa.p1' />
    </p>
    <p>
      <FormattedMessage id='docs.twofa.p2' />
    </p>

    <h4><FormattedMessage id='docs.twofa.smsflow.title' /></h4>
    <p><FormattedMessage id='docs.twofa.smsflow.p1' /></p>
    <p><FormattedMessage id='docs.twofa.smsflow.p2' /></p>

    <h4><FormattedMessage id='docs.twofa.totp.title' /></h4>
    <p><FormattedMessage id='docs.twofa.totp.p1' /></p>
    <p><FormattedMessage id='docs.twofa.totp.p2' /></p>

    <h5><FormattedMessage id='docs.twofa.ga.title' /></h5>
    <p><FormattedMessage id='docs.twofa.ga.text' /></p>

    <h5><FormattedMessage id='docs.twofa.generateqr.title' /></h5>
    <p><FormattedMessage id='docs.twofa.generateqr.text' /></p>

    <h5><FormattedMessage id='docs.twofa.scanqr.title' /></h5>
    <p><FormattedMessage id='docs.twofa.scanqr.text' /></p>

    <h5><FormattedMessage id='docs.twofa.login.title' /></h5>
    <p><FormattedMessage id='docs.twofa.login.text' /></p>

    <h3>
      <FormattedMessage id='docs.twofa.recoverycodes.title' />
    </h3>
    <p>
      <FormattedMessage id='docs.twofa.recoverycodes.p1' />
    </p>
    <p>
      <FormattedMessage id='docs.twofa.recoverycodes.p2' />
    </p>
    <ul>
      <li><a href='https://agilebits.com/onepassword'>1Password</a></li>
      <li><a href='https://keepersecurity.com/'>Keeper</a></li>
      <li><a href='https://lastpass.com/'>LastPass</a></li>
    </ul>
  </div>
)

export default Topic
