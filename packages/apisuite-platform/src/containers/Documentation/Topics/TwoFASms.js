import React from 'react'
import { FormattedMessage } from 'react-intl'

const Topic = () => (
  <div className='topic-container'>
    <h2 className='headline'>
      Two-Factor Authentication - SMS
    </h2>
    <p>
      For The Bank, the enforced second form of authentication is a text message (SMS) that is sent to the developer's provided phone number. The Bank generates an authentication code any time someone attemps to sign in or login. The only way someone can sign into your account is if they know both your password and have access to the authentication on your phone.
    </p>
    <p>
      After signing up using the default 2FA method (SMS), you have the option to change this secondary method from an SMS to an Authorisation app flow, if you prefer.
    </p>
  </div>
)

export default Topic
