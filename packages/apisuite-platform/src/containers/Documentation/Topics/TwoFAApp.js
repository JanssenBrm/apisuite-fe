import React from 'react'
import { FormattedMessage } from 'react-intl'

const Topic = () => (
  <div className='topic-container'>
    <h2 className='headline'>
      Two-Factor Authentication - TOTP Mobile App
    </h2>
    <p>
      A Time-based One-Time Password (TOTP) application automatically generates an authentication code that changes after a certain period of time.
    </p>
    <p>
      Since SMS is the default 2FA method, if you chose to use TOTP instead you have to navigate to your Profile page and under the Security section, update the 2FA method to "Authorisation App".
    </p>
    <h4>1. Download Google Authenticator</h4>
    <p>
      The first step is dowloading <a href='https://support.google.com/accounts/answer/1066447?hl=en' target='_blank'>Google Authenticator</a>. This application will be the one responsible for generating valid access codes to complete your authentication flow.
    </p>
    <h4>2. Generate QR code</h4>
    <p>
      After changing the 2FA method in your profile page, as mentioned before, a QR code will be automatically generated.
    </p>
    <h4>3. Scan the QR code</h4>
    <p>
      Using the Google Authenticator app you can add an entry and scan the QR code. After scanning, the app will display a six-digit code that you can enter on the input field next to the QR code.
    </p>
    <h4>4. Login with 2FA</h4>
    <p>
      From this point on, every time you authenticate you will be prompted for a valid six-digit code. Just go back to Google Authenticator and input the latest self-generated code.
    </p>
  </div>
)

export default Topic
