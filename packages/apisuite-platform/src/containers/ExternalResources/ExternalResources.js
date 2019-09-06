import React, { Component } from 'react'
import { object, func } from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Typography } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import ShareIcon from '@material-ui/icons/Launch'
import themeVariables from 'styles/variables.scss'
import SvgIcon from 'components/SvgIcon'
import Pagination from 'components/Pagination'

class ExternalResources extends Component {
  componentDidMount () {
    this.props.fetchResources()
  }

  handleChangePage = page => {
    this.props.fetchResources(page)
  }

  render () {
    const { intl, resources } = this.props
    const resourcesHeader = intl.formatMessage({id: 'docs.external.resources.header'})
    const linksHeader = intl.formatMessage({id: 'docs.external.link.header'})
    const kpiTitle = intl.formatMessage({id: 'docs.external.kpi.title'})
    const kpiSubtitle = intl.formatMessage({id: 'docs.external.kpi.subtitle'})

    return (
      <div className='external-container'>
        <div className='top-wrapper'>
          <div className='text-content'>
            <Typography variant='display4' gutterBottom><FormattedMessage id='docs.external.title' /></Typography>
            <FormattedMessage id='docs.external.text' />
          </div>
          <div className='kpi-container'>
            <div className='kpi-header'>
              <div className='kpi-title'>{kpiTitle}</div>
              <div className='kpi-subtitle'>{kpiSubtitle}</div>
            </div>
            <div className='kpi-content'>
              <div className='kpi-value'><Typography variant='display4'>{resources.pagination.rowCount}</Typography></div>
              <IconButton className='kpi-share' color='primary'>
                <a target='_blank' rel='noopener noreferrer' href={resources.source_account}>
                  <SvgIcon name='github' size={24} color={themeVariables.mainColor} />
                </a>
              </IconButton>
            </div>
          </div>
        </div>

        <div className='resources-list'>
          <table>
            <thead>
              <tr>
                <th className='resource-th'>{resourcesHeader}</th>
                <th className='link-th'>{linksHeader}</th>
                <th className='icon-th' />
              </tr>
            </thead>
            <tbody>
              {resources.external_resources.map((r, idx) => (
                <tr key={`resource-${idx}`} className='resource-row'>
                  <td className='resource-info'>
                    <span className='resource-name'>{r.name}</span>
                    <span className='resource-description'>{r.description}</span>
                  </td>
                  <td className='external-link'>
                    <a target='_blank' rel='noopener noreferrer' href={r.commit_url}>
                      {`latest: ${r.commit_sha}`}
                    </a>
                  </td>
                  <td className='link-icon'>
                    <IconButton className='kpi-share' color='primary'>
                      <a target='_blank' rel='noopener noreferrer' href={r.url}>
                        <ShareIcon />
                      </a>
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {resources.pagination &&
          <Pagination
            items={resources.external_resources}
            pager={resources.pagination}
            onChangePage={this.handleChangePage}
          />
        }
      </div>
    )
  }
}

ExternalResources.propTypes = {
  intl: object.isRequired,
  resources: object.isRequired,
  fetchResources: func.isRequired
}

export default ExternalResources
