
import React, { Component } from 'react'
import classnames from 'classnames'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import DataPrivacy from './Topics/DataPrivacy'

const topics = [
  {
    title: '1. Which personal data do we use about you?',
    key: 'personaldata',
  },
  {
    title: '2. Why and on which basis do we use your personal data?',
    key: 'basis',
  },
  {
    title: '3. Who do we share your personal data with?',
    key: 'share',
  },
  {
    title: '4. Transfers of personal data outside the European Economic Area (“EEA”)',
    key: 'transfer',
  },
  {
    title: '5. How long do we keep your personal data for?',
    key: 'howlong',
  },
  {
    title: '6. What are your rights and how can you exercise them?',
    key: 'rights',
  },
  {
    title: '7. How can you keep up with changes to this Privacy Notice?',
    key: 'keepupchanges',
  },
  {
    title: '8. How to contact us?',
    key: 'contactus',
  },
]

class Privacy extends Component {
  state = {
    component: DataPrivacy,
  }

  handleClick = item => () => {
    this.setState({ component: item.key })

    const scrollingElement = document.getElementById(item.key)
    if (scrollingElement) {
      const top = scrollingElement.offsetTop - 175
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  downloadPDF = () => {
    // Download pdf action
  }

  render () {
    const { component } = this.state

    return (
      <div className='privacy-container'>
        <List
          component='nav'
          classes={{ root: 'privacy-side-menu' }}
        >
          {topics.map((item) =>
            <ListItem
              key={item.key}
              button
              onClick={this.handleClick(item)}
              className={classnames(
                'privacy-nested-menu',
                { selected: component === item.key }
              )}
            >
              <ListItemText primary={item.title} />
            </ListItem>
          )}
          {/* <div className='bottom-btn' onClick={this.downloadPDF}>
            <p><img className='icon' src={attachedImg} /><FormattedMessage id='signup.terms.downloadPDF' /></p>
          </div> */}
        </List>
        <div id='privacy-content' className='privacy-content'>
          <DataPrivacy />
        </div>
      </div>
    )
  }
}

export default Privacy
