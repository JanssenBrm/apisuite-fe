
import React, { Component } from 'react'
import classnames from 'classnames'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TermsAndConditions from './Topics/TermsAndConditions'
import { FormattedMessage } from 'react-intl'

const topics = [
  {
    title: 'Introduction',
    key: 'introduction'
  },
  {
    titleIntlId: 'terms.topic1.title',
    key: 'provisions'
  },
  {
    titleIntlId: 'terms.topic2.title',
    key: 'registration'
  },
  {
    titleIntlId: 'terms.topic3.title',
    key: 'visit'
  },
  {
    titleIntlId: 'terms.topic4.title',
    key: 'editor'
  },
  {
    titleIntlId: 'terms.topic5.title',
    key: 'content'
  },
  {
    titleIntlId: 'terms.topic6.title',
    key: 'intelectual'
  },
  {
    titleIntlId: 'terms.topic7.title',
    key: 'trademarks'
  },
  {
    titleIntlId: 'terms.topic8.title',
    key: 'privacy'
  },
  {
    titleIntlId: 'terms.topic9.title',
    key: 'confidentiality'
  },
  {
    titleIntlId: 'terms.topic10.title',
    key: 'suspension'
  },
  {
    titleIntlId: 'terms.topic11.title',
    key: 'liability'
  },
  {
    titleIntlId: 'terms.topic12.title',
    key: 'law'
  },
  {
    titleIntlId: 'terms.topic13.title',
    key: 'miscellaneous'
  }
]

class Terms extends Component {
  state = {
    component: TermsAndConditions
  }

  handleClick = item => e => {
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
      <div className='terms-container'>
        <List
          component='nav'
          classes={{root: 'terms-side-menu'}}
        >
          {topics.map((item) =>
            <ListItem
              key={item.key}
              button
              onClick={this.handleClick(item)}
              className={classnames(
                'terms-nested-menu',
                { 'selected': component === item.key }
              )}
            >
              <ListItemText primary={item.title ? item.title : <FormattedMessage id={item.titleIntlId} />} />
            </ListItem>
          )}
          {/* <div className='bottom-btn' onClick={this.downloadPDF}>
            <p><img className='icon' src={attachedImg} /><FormattedMessage id='signup.terms.downloadPDF' /></p>
          </div> */}
        </List>
        <div id='terms-content' className='terms-content'>
          <TermsAndConditions />
        </div>
      </div>
    )
  }
}

export default Terms
