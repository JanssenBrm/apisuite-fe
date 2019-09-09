import React, { Component } from 'react'
import { string, func, object, bool } from 'prop-types'
import { injectIntl } from 'react-intl'
import PopMessage from 'components/PopMessage'

class NotificationManager extends Component {
  handleClose = (event, reason) => {
    if (reason === 'clickaway') { return }
    this.props.hideNotification()
  }

  render () {
    const { variant, message, show, intl, fromAPI } = this.props
    const formatedMessage = message ? fromAPI ? message : intl.formatMessage({ id: message }) : null
    return (
      <PopMessage
        open={show}
        variant={variant}
        message={formatedMessage}
        handleClose={this.handleClose}
      />
    )
  }
}

NotificationManager.propTypes = {
  hideNotification: func.isRequired,
  intl: object.isRequired,
  show: bool,
  variant: string,
  message: string,
  fromAPI: bool,
}

export default injectIntl(NotificationManager)
