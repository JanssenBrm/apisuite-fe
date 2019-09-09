import React, { Component } from 'react'
import { object, array } from 'prop-types'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import classnames from 'classnames'
import { FormattedMessage } from 'react-intl'
import { Typography } from '@material-ui/core'

const tasks = [
  {
    title: 'dashboard.firstuse.1.title',
    content: 'dashboard.firstuse.1.content',
    route: '/apps',
  },
  {
    title: 'dashboard.firstuse.2.title',
    content: 'dashboard.firstuse.2.content',
    route: '/api-subscriptions',
  },
  {
    title: 'dashboard.firstuse.3.title',
    content: 'dashboard.firstuse.3.content',
    route: '/testdata',
  },
]

class FirstUse extends Component {
  navigate = route => event => this.props.history.push(route)

  render () {
    const { apps } = this.props
    const active = apps.length > 0 ? 1 : 0

    return (
      <div className='first-use-section'>
        {tasks.map((task, idx) =>
          <div key={`task-${idx}`} className='task-container'>
            <div className={classnames('task-step', { locked: active !== idx })}>
              <span>{idx + 1}</span>
              {active === idx && <div className='task-button' testid={`task-btn-${idx + 1}`} onClick={this.navigate(task.route)}><KeyboardArrowRightIcon /></div>}
            </div>
            <Typography variant='display3' className='task-title'><FormattedMessage id={task.title} /></Typography>
            <div className='task-content'><FormattedMessage id={task.content} /></div>
          </div>
        )}
      </div>
    )
  }
}

FirstUse.propTypes = {
  /**
   * Browser history session
   */
  history: object.isRequired,
  /**
   * User apps
   */
  apps: array.isRequired,
}

export default FirstUse
