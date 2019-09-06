import React from 'react'
import { FormattedMessage } from 'react-intl'
import orgapproved from 'assets/docs/ob_flow_organization_approved.png'
import orgapprovedunbranded from 'assets/docs/ob_flow_organization_approved_unbranded.png'
import { THEME } from 'constants/global'

const OnboardingFlowAccCreateValidate = () => (
  <div className='topic-container'>
    <h2 className='headline'>
      <FormattedMessage id='navigation.docs.onboardingflowaccountcreationvalidation.title' />
    </h2>
    <p>
      You first need to create an account (which you already did if you can see this screen) and wait for your company to be validated by one of our admins, who will ensure that you are a real company. You will see that this is the case once you receive an email indicating that your company has been validated.
    </p>
    <img className='center' src={THEME === 'default' ? orgapprovedunbranded : orgapproved} />
    <p>
      Note that if you were invited by a member of your company and you didn’t have to create a new company you won’t have to wait for its validation and can go straight to the next step.
    </p>
  </div>
)

export default OnboardingFlowAccCreateValidate
