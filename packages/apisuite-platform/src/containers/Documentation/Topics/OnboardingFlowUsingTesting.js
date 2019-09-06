import React from 'react'
import { FormattedMessage } from 'react-intl'

const OnboardingFlowUsingTesting = () => (
  <div className='topic-container'>
    <h2 className='headline'>
      <FormattedMessage id='navigation.docs.onboardingflowusingtesting.title' />
    </h2>
    <p>
      <b>Disclaimer :</b> In production, only one app (=client) can be used with the same QWAC certificate. Also, in
      Production we will validate the signature of the certificate (not in the sandbox).
    </p>
    <p>
      Once your certificate has been validated you can start making API calls to the sandbox by providing it along with
      your request. As long as your certificate is valid your request will be accepted, assuming you have a valid OAuth2
      access token for the API you are trying to use. The process to authorize an app and retrieve an access token still
      applies, so please refer to the documentation on how to access a specific AISP or PISP endpoint for more details
      (see section “AUTHORIZATION FLOWS” in the documentation :
      <a
        href='https://developer.bnpparibasfortis.com/docs'>https://developer.bnpparibasfortis.com/docs
      </a>).
    </p>
  </div>
)

export default OnboardingFlowUsingTesting
