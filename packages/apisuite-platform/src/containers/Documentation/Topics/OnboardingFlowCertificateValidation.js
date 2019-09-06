import React from 'react'
import { FormattedMessage } from 'react-intl'
import certprovided from 'assets/docs/ob_flow_certificate_provided.png'

const OnboardingFlowCertificateValidation = () => (
  <div className='topic-container'>
    <h2 className='headline'>
      <FormattedMessage id='navigation.docs.onboardingflowcertvalidation.title' />
    </h2>
    <p>
      Once the certificate has been provided via the onboarding endpoint, we still have to validate it. This is an
      automatic operation so it should be almost instant. You will see if the operation was successful when you go to
      your organisation details and see a text box “Certificate provided” along with the expiry date of the certificate.
      It should look like this :
    </p>
    <img className='center' src={certprovided} alt='certificate' />
  </div>
)

export default OnboardingFlowCertificateValidation
