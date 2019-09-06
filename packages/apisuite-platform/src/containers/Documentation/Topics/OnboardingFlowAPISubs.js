import React from 'react'
import { FormattedMessage } from 'react-intl'

const OnboardingFlowAPISubs = () => (
  <div className='topic-container'>
    <h2 className='headline'>
      <FormattedMessage id='navigation.docs.onboardingflowapisubs.title' />
    </h2>
    <p>
      If your organization was validated and an app was created you will be able to subscribe to APIs to start using the
      sandbox. Navigate to API subscriptions (from your dashboard or the landing page) and make sure the APIs you want
      to use are selected. Make also sure that the app that was created after the onboarding has all the API
      subscriptions you need (your app scopes should reflect that).
    </p>
    <p>
      If you did provide a certificate at this stage this will generate your test data, which is accessible via the
      “Test Data” tab of your dashboard.
    </p>
  </div>
)

export default OnboardingFlowAPISubs
