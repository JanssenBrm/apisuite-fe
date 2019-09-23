import React, { Component } from 'react'
import { object, func } from 'prop-types'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import qs from 'qs'
import CircularProgress from '@material-ui/core/CircularProgress'

class InvitationPage extends Component {
  state = {
    loading: true,
  }

  componentDidMount () {
    const query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
    const token = query.ticket
    if (token) this.props.getInvitation(token)
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    if (nextProps.invitation !== this.props.invitation || nextProps.invitation.error) {
      this.setState({
        loading: false,
      })
    }
  }

  handleJoin = () => {
    const { location, invitation, history, acceptInvitation, skipStep } = this.props
    const query = qs.parse(location.search, { ignoreQueryPrefix: true })
    const invitationToken = query.ticket

    if (invitation.isRegistered) {
      acceptInvitation(invitationToken)
    } else {
      history.push('/signup')
      // Move to the second step in the registration by invitation flow
      skipStep()
    }
  }

  remindMeLater = () => {
    const { location } = this.props
    const query = qs.parse(location.search, { ignoreQueryPrefix: true })
    const invitationToken = query.ticket
    this.props.postponeInvitation(invitationToken)
  }

  render () {
    const { intl, invitation, error } = this.props
    const invitationText2 = intl.formatMessage({ id: 'signup.invitation.text.2' })
    const joinBtn = intl.formatMessage({ id: 'signup.invitation.join' })
    const remindBtn = intl.formatMessage({ id: 'signup.invitation.remind' })
    const unnamedLabel = intl.formatMessage({ id: 'signup.invitation.unnamed' })

    return (
      <div className='signup-center'>
        <div className='signup-invitation'>
          {this.state.loading
            ? <CircularProgress className='signup-loading-circle' />
            : error ? (
              <div>
                <Typography variant='display4' gutterBottom>
                  <FormattedMessage
                    id='signup.invitation.notfound'
                  />
                </Typography>
                <p>
                  <FormattedMessage
                    id='signup.invitation.notfound.text'
                  />
                </p>
              </div>
            ) : (
              <div>
                <Typography variant='display4' gutterBottom>
                  <FormattedMessage
                    id='signup.invitation.title'
                    values={{
                      organisation: (
                        <span>{invitation.organization_name || unnamedLabel}</span>
                      ),
                    }}
                  />
                </Typography>
                <p>
                  <FormattedMessage
                    id='signup.invitation.text.1'
                    values={{
                      organisation: (
                        <strong>{invitation.organization_name}</strong>
                      ),
                    }}
                  />
                </p>
                <p>{invitationText2}</p>
                <div className='invitation-actions'>
                  <Button
                    className='signup-join'
                    id='invitation-join-btn'
                    testid='invitation-join-btn'
                    variant='contained'
                    color='primary'
                    onClick={this.handleJoin}
                  >
                    {joinBtn}
                  </Button>
                  <Button
                    className='signup-remind'
                    id='invitation-remind-btn'
                    testid='invitation-remind-btn'
                    variant='outlined'
                    color='primary'
                    onClick={this.remindMeLater}
                  >
                    {remindBtn}
                  </Button>
                </div>
              </div>
            )}
          {invitation.isRegistered &&
            <div className='invitation-info'>
              <FormattedMessage id='signup.invitation.info' />
            </div>}
        </div>
      </div>
    )
  }
}

InvitationPage.propTypes = {
  intl: object.isRequired,
  location: object.isRequired,
  history: object.isRequired,
  invitation: object.isRequired,
  getInvitation: func.isRequired,
  acceptInvitation: func.isRequired,
  postponeInvitation: func.isRequired,
  skipStep: func.isRequired,
  error: object,
}

export default InvitationPage
