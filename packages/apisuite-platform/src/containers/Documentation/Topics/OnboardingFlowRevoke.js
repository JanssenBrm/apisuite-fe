import React from 'react'
import { FormattedMessage } from 'react-intl'

const OnboardingFlowRevoke = () => (
  <div className='topic-container'>
    <h2 className='headline'>
      <FormattedMessage id='navigation.docs.onboardingflowrevoke.title' />
    </h2>
    <p>
      If you need to upload a new certificate to replace another that was previously uploaded (because the previous one
      expired, or your domain name changed,…) our admin will need to remove the old certificate.
    </p>
    <p>
      You can send us an email / support request (see support module) and ask us to revoke the certificate. The
      certificate needs to be revoked manually so this might take a bit of time. Once it is revoked we will notify you
      that the certificate was deleted, then you can onboard again. You will have to delete the app that was created by
      the first onboarding as well, however. You can then upload your new certificate to your API client, and call the
      onboarding endpoint again.
    </p>
  </div>
)

export default OnboardingFlowRevoke
