import React from 'react'
import { FormattedMessage } from 'react-intl'

const OnboardingFlowIntro = () => (
  <div className='topic-container'>
    <h2 className='headline'>
      <FormattedMessage id='navigation.docs.onboardingflowintro.title' />
    </h2>
    <p>
      In order to call the STET PSD2 APIs you will need to onboard your organization. Basically you will need to meet 4 conditions :
    </p>
    <ul>
      <li>
        Have a validated account
      </li>
      <li>
        Subscribe to at least one API
      </li>
      <li>
        Provide a valid certificate
      </li>
      <li>
        Have at least one app
      </li>
    </ul>
    <p>
      The process to meet those conditions is detailed below.
    </p>
  </div>
)

export default OnboardingFlowIntro
