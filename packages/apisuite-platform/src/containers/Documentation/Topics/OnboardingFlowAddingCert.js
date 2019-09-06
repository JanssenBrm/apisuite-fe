import React from 'react'
import { FormattedMessage } from 'react-intl'

const OnboardingFlowAddingCert = () => (
  <div className='topic-container'>
    <h2 className='headline'>
      <FormattedMessage id='navigation.docs.onboardingflowaddingcert.title' />
    </h2>
    <p>
      You can only use one certificate per organisation. So if you need to add another certificate, you will need to
      replace the previously uploaded one. To do so you will need to revoke your certificate (see next section).
    </p>
    <p>
      <br />
    </p>
  </div>
)

export default OnboardingFlowAddingCert
