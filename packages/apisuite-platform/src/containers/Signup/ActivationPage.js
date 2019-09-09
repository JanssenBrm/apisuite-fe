import React, { Component } from 'react'
import { object, func } from 'prop-types'
import Button from '@material-ui/core/Button'
import checkImage from 'assets/check_shadow_3.svg'
import closeImage from 'assets/close.svg'
import { Typography } from '@material-ui/core'

class ActivationPage extends Component {
  resendEmail = () => {
    const { sendActivationEmail, auth } = this.props
    const { email, id } = auth.user
    sendActivationEmail({ email, userID: id })
  }

  render () {
    const { intl } = this.props

    const headerTitle = intl.formatMessage({ id: 'signup.activation.header' })
    const confirmationTitle1 = intl.formatMessage({ id: 'signup.activation.title1' })
    const confirmationDescription1 = intl.formatMessage({ id: 'signup.activation.description1.1' })
    const confirmationDescription2 = intl.formatMessage({ id: 'signup.activation.description1.2' })
    const confirmationDescription3 = intl.formatMessage({ id: 'signup.activation.description1.3' })
    const toBeActivatedTitle = intl.formatMessage({ id: 'signup.activation.title2' })
    const toBeActivatedDescription = intl.formatMessage({ id: 'signup.activation.description2' })
    const resendBtn = intl.formatMessage({ id: 'signup.activation.resend' })

    return (
      <div className='activation-container'>
        <div className='signup-steps-wrapper'>
          <div className='signup-activation header'>
            <div className='signup-success-item'>
              <div className='item-img' />
              <div className='item-content'>
                <Typography variant='display4' gutterBottom>{headerTitle}</Typography>
              </div>
            </div>
          </div>
        </div>
        <div className='signup-activation'>
          <div className='signup-success-item'>
            <div className='item-img'>
              <img src={checkImage} />
            </div>
            <div className='item-content'>
              <Typography variant='display3' gutterBottom className='item-title confirmation'>{confirmationTitle1}</Typography>
              <p>
                {confirmationDescription1} {confirmationDescription2} {confirmationDescription3}
              </p>
              <Button
                id='resend-btn'
                className='signup-submit resend'
                variant='contained'
                onClick={this.resendEmail}
              >
                {resendBtn}
              </Button>
            </div>
          </div>
          <div className='signup-success-item'>
            <div className='item-img'>
              <img src={closeImage} />
            </div>
            <div className='item-content'>
              <Typography variant='display3' gutterBottom className='item-title activate'>{toBeActivatedTitle}</Typography>
              <p>
                {toBeActivatedDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ActivationPage.propTypes = {
  intl: object.isRequired,
  openLoginModal: func.isRequired,
  sendActivationEmail: func.isRequired,
  auth: object.isRequired,
}

export default ActivationPage
