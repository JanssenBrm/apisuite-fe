import React, { Component } from 'react'
import { object } from 'prop-types'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { FormattedMessage } from 'react-intl'
import classnames from 'classnames'
import { organizationStates } from 'constants/global'

class AppCard extends Component {
  state = {
    open: false
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }))
  }

  openAppDetails = id => event => {
    this.props.history.push(`/apps/${id}`)
    this.handleClose(event)
  }

  handleClose = event => {
    if (this.anchorEl && this.anchorEl.contains(event.target)) {
      return
    }

    this.setState({ open: false })
  }

  handleButtonRef = node => {
    this.anchorEl = node
  }

  render () {
    const { open } = this.state
    const { app, organization } = this.props

    const splitName = app.name.split(' ')
    const appInitials = splitName.length >= 2 ? `${splitName[0].charAt(0)}${splitName[1].charAt(0)}` : splitName[0].slice(0, 2)
    const organizationState = organization ? organization.state : null

    return (
      <div className='app-card'>
        <div className='app-card-logo-wrapper'>
          <div className='app-card-logo' onClick={this.openAppDetails(app.id)}>
            <span>{appInitials}</span>
          </div>
        </div>
        <div className='app-card-details'>
          <div>
            <div className='app-card-name'>{app.name}</div>
            <div className='app-card-description'>
              <div className={classnames(
                'app-card-badge',
                organizationState ? organizationStates[organizationState].slug : null
              )} />
              {app.description}
            </div>
          </div>
          <div className='app-card-actions'>
            <IconButton
              id='app-card-btn'
              testid='app-card-btn'
              buttonRef={this.handleButtonRef}
              onClick={this.handleToggle}
            >
              <MoreVertIcon />
            </IconButton>

            <Popper open={open} anchorEl={this.anchorEl} transition disablePortal placement='bottom-end' className='popper'>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id='menu-list-grow'
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={this.handleClose}>
                      <MenuList>
                        <MenuItem id='app-details' classes={{root: 'app-card-menu-item'}} testid='app-card-details-btn' onClick={this.openAppDetails(app.id)}>{<FormattedMessage id='appsPage.action.details' />}</MenuItem>
                        <MenuItem classes={{root: 'app-card-menu-item'}} disabled testid='app-card-console-btn' onClick={this.handleClose}>{<FormattedMessage id='appsPage.action.console' />}</MenuItem>
                        <MenuItem classes={{root: 'app-card-menu-item'}} disabled testid='app-card-publish-btn' onClick={this.handleClose}>{<FormattedMessage id='appsPage.action.publish' />}</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </div>
      </div>
    )
  }
}
AppCard.propTypes = {
  /**
   * Current App object
   */
  app: object,
  /**
   * User Organization
   */
  organization: object,
  /**
   * Browser history session
   */
  history: object.isRequired
}

export default AppCard
