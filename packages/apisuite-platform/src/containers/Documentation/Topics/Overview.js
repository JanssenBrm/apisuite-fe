import React from 'react'
import { func, object } from 'prop-types'
import { FormattedMessage } from 'react-intl'
import knowledgeBaseSvg from 'assets/knowledge_base.svg'
import caretRight from 'assets/caret_right.svg'
import { Typography } from '@material-ui/core'

const Overview = ({ onLinkClick, theme }) => (
  <div className='topic-container'>
    <div className='topic-row'>
      <div className='topic-left'>
        <Typography variant='display3' gutterBottom><FormattedMessage id='navigation.docs.overview.title' /></Typography>
        <FormattedMessage id='navigation.docs.overview.text1' />
        <br /><br />
        <a onClick={onLinkClick(0, 0, '/docs/started')} className='docs-link getting-started-link'>
          <FormattedMessage id='navigation.docs.overview.gettingstarted' />
          <img src={caretRight} />
        </a>
      </div>
      <div className='topic-right'>
        {theme.docOverview
          ? <img src={theme.docOverview} className='api-feature-icon' />
          : <div className='overview-knowledge-container'>
            <img src={knowledgeBaseSvg} className='api-feature-icon' />
            <h3 className='headline'>
              <FormattedMessage id='navigation.docs.knowledgebase' />
            </h3>
          </div>
        }
      </div>
    </div>
  </div>
)

Overview.propTypes = {
  onLinkClick: func.isRequired,
  theme: object.isRequired
}

export default Overview
