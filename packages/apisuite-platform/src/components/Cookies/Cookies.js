
import React, { Component } from 'react'
import classnames from 'classnames'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import DataCookies from './Topics/DataCookies'

const topics = [
  {
    title: 'Introduction',
    key: 'introduction'
  },
  {
    title: 'What is a Cookie?',
    key: 'cookie'
  },
  {
    title: 'Cookies on this Portal',
    key: 'cookiesonportal'
  },
  {
    title: 'Responsible for the cookies',
    key: 'responsibility'
  },
  {
    title: 'Your rights as a visitor on our Portal',
    key: 'rights'
  }
]

class Cookies extends Component {
  state = {
    component: DataCookies
  }

  handleClick = item => e => {
    this.setState({ component: item.key })

    const scrollingElement = document.getElementById(item.key)

    if (scrollingElement) {
      scrollingElement.scrollIntoView(true)
      document.getElementById('cookies-content').scrollTop -= 25
    }
  }

  downloadPDF = () => {
    // Download pdf action
  }

  render () {
    const { component } = this.state

    return (
      <div className='cookies-container'>
        <List
          component='nav'
          classes={{root: 'cookies-side-menu'}}
        >
          {topics.map((item) =>
            <ListItem
              key={item.key}
              button
              onClick={this.handleClick(item)}
              className={classnames(
                'cookies-nested-menu',
                { 'selected': component === item.key }
              )}
            >
              <ListItemText primary={item.title} />
            </ListItem>
          )}
        </List>
        <div id='cookies-content' className='cookies-content'>
          <DataCookies />
        </div>
      </div>
    )
  }
}

export default Cookies
