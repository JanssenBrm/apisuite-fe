import React, { Component } from 'react'
import { object, array, func } from 'prop-types'
import { Typography } from '@material-ui/core'

class RecoveryCodes extends Component {
  state = {
    codes: [],
  }

  componentWillMount () {
    const { history, signup, codes } = this.props

    if (!codes.length && !signup.user.codes) {
      history.push('/')
    }

    this.setState({ codes: signup.user.codes || codes })
  }

  componentWillReceiveProps (nextProps) {
    const { codes, signup } = nextProps

    if (this.props.codes !== codes || this.props.signup.user.codes !== signup.user.codes) {
      this.setState({ codes })
    }
  }

  componentWillUnmount () {
    this.props.cleanCodes()
  }

  render () {
    const { intl, theme } = this.props
    const { codes } = this.state
    const title = intl.formatMessage({ id: 'recoverycodes.title' })
    const helpText = intl.formatMessage({ id: 'recoverycodes.help' })

    return (
      <div className='recoveryCodes'>
        <div className='container'>
          <div className='header'>
            <img className='logo' src={theme.recoveryLogo} />
          </div>
          <div className='content'>
            <Typography variant='display3' gutterBottom>{title}</Typography>
            <div className='list'>
              {codes.length > 0 && codes.map(code =>
                <p key={code} className='item'>{code}</p>
              )}
            </div>
          </div>
        </div>
        <div className='helper-container'>
          <p className='small'>{helpText}</p>
        </div>
      </div>
    )
  }
}

RecoveryCodes.propTypes = {
  intl: object.isRequired,
  signup: object.isRequired,
  history: object.isRequired,
  theme: object.isRequired,
  codes: array.isRequired,
  cleanCodes: func.isRequired,
}

export default RecoveryCodes
