import React, { Component } from 'react'
import { object, func, array, bool } from 'prop-types'
import Overview from './Overview'
import FirstUse from './FirstUse'
import Notification from 'components/Notification'
import CircularProgress from '@material-ui/core/CircularProgress'

class Dashboard extends Component {
  state = {
    notification: {},
    showNotification: false
  }

  static getDerivedStateFromProps (props, state) {
    if (props.notification !== state.notification) {
      return {
        notification: props.notification,
        showNotification: props.showNotification
      }
    }

    return null
  }

  componentDidMount () {
    const organizationId = this.props.user.organizations[0].id
    this.props.fetchApps(organizationId)
    this.props.fetchLatestNotification()
  }

  handleCloseNotification = () => {
    this.setState({
      showNotification: false
    })
  }

  notEmptyNotification = (notif) => (
    Object.getOwnPropertyNames(notif).length > 0 && notif.message
  )

  render () {
    const { user, history, openSupportModal, apps, theme, ui } = this.props
    const { fullName } = user
    const { showNotification, notification } = this.state
    const { tag, message, link } = notification

    return (
      <div className='dashboard'>
        {
          showNotification && this.notEmptyNotification(notification) &&
          <Notification tag={tag} message={message} url={link} handleClose={this.handleCloseNotification} />
        }
        <div className='header-wrapper'>
          <div className='header-light-rays'>
            <div className='header-light-ray w-200' />
            <div className='header-light-ray w-20' />
            <div className='header-light-ray w-129' />
            <div className='header-light-ray w-130' />
          </div>
          <FirstUse apps={apps} history={history} />
        </div>
        <Overview fullName={fullName} history={history} openSupportModal={openSupportModal} theme={theme} />
        {ui && ui.loading &&
          <div className='loading'>
            <CircularProgress className='loading-circle' />
          </div>
        }
      </div>
    )
  }
}

Dashboard.propTypes = {
  user: object.isRequired,
  history: object.isRequired,
  openSupportModal: func.isRequired,
  fetchApps: func.isRequired,
  apps: array.isRequired,
  theme: object.isRequired,
  fetchLatestNotification: func.isRequired,
  notification: object.isRequired,
  showNotification: bool.isRequired,
  ui: object
}

export default Dashboard
