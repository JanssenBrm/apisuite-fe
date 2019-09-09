import React, { Component } from 'react'
import { object, func } from 'prop-types'
import checkImage1 from 'assets/check_shadow_1.svg'
import checkImage2 from 'assets/check_shadow_2.svg'
import checkImage3 from 'assets/check_shadow_3.svg'
import { Typography } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'

class SuccessPage extends Component {
  componentWillMount () {
    const { user, history } = this.props
    if (!user.codes) {
      history.push('/')
    }
  }

  getRecoveryCodes = () => {
    this.props.history.push('/recovery-codes')
  }

  render () {
    const { intl, invitation } = this.props
    const isInvitation = invitation.invitationCode
    const profileTitle = intl.formatMessage({ id: 'signup.success.profile.created' })
    const profileText = intl.formatMessage({ id: 'signup.success.profile.text' })
    const securityTitle = intl.formatMessage({ id: 'signup.success.security.enabled' })
    const securityText2 = intl.formatMessage({ id: 'signup.success.security.text2' })
    const securityText3 = intl.formatMessage({ id: 'signup.success.security.text3' })
    const emailTitle = intl.formatMessage({ id: 'signup.success.email.sent' })
    const emailText1 = intl.formatMessage({ id: 'signup.success.email.text1' })

    return (
      <div className='signup-success'>
        <div className='signup-success-item'>
          <div className='item-img'>
            <img src={checkImage1} />
          </div>
          <div className='item-content'>
            <Typography variant='display3' gutterBottom className='item-title profile'>{profileTitle}</Typography>
            <p>
              {profileText}
            </p>
          </div>
        </div>
        <div className='signup-success-item'>
          <div className='item-img'>
            <img src={checkImage2} />
          </div>
          <div className='item-content'>
            <Typography variant='display3' gutterBottom className='item-title security'>{securityTitle}</Typography>
            <p>
              <FormattedMessage id='signup.success.security.text1' />
              <strong>
                <FormattedMessage id='signup.success.security.text1.bold' />
              </strong>
              <a onClick={this.getRecoveryCodes} className='recovery-codes-link link'>{securityText2}</a>{securityText3}
            </p>
          </div>
        </div>
        {!isInvitation &&
          <div className='signup-success-item'>
            <div className='item-img'>
              <img src={checkImage3} />
            </div>
            <div className='item-content'>
              <Typography variant='display3' gutterBottom className='item-title confirmation'>{emailTitle}</Typography>
              <p>{emailText1}</p>
            </div>
          </div>}
      </div>
    )
  }
}

SuccessPage.propTypes = {
  intl: object.isRequired,
  openLoginModal: func.isRequired,
  sendActivationEmail: func.isRequired,
  user: object.isRequired,
  history: object.isRequired,
  invitation: object.isRequired,
}

export default SuccessPage
