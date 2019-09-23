
import React, { Component } from 'react'
import { object, func } from 'prop-types'
import themeVariables from 'styles/variables.scss'
import { RedocStandalone } from 'redoc'
import CircularProgress from '@material-ui/core/CircularProgress'

class Api extends Component {
  state = {
    apidocs: {},
  }

  componentDidMount () {
    const { brand, productId, role, version } = this.props.match.params
    this.props.getApiDocs(brand, productId, role, version)
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { apidocs } = nextProps

    if (this.props.apidocs !== apidocs) {
      this.setState({ apidocs })
    }
  }

  render () {
    const { apidocs } = this.state
    const { ui } = this.props

    let sandboxSpec
    try {
      sandboxSpec = JSON.parse(apidocs.swagger)
    } catch (error) {
      sandboxSpec = null
    }

    return (
      <div className='api-container'>
        {sandboxSpec && (
          <RedocStandalone
            options={{
              scrollYOffset: 160,
              nativeScrollbars: true,
              // hideDownloadButton: true,
              theme: {
                colors: {
                  tonalOffset: 0,
                  primary: {
                    main: themeVariables.grey,
                  },
                },
                typography: {
                  fontWeightRegular: '400',
                  fontWeightBold: '600',
                  fontWeightLight: '300',
                  headings: {
                    fontFamily: 'Roboto, sans-serif',
                  },
                },
                rightPanel: {
                  backgroundColor: themeVariables.primaryColor,
                },
              },
            }}
            spec={sandboxSpec}
          />
        )}

        {ui.loading && (
          <div className='api-loading'>
            <div className='loading'>
              <CircularProgress className='loading-circle' />
            </div>
          </div>
        )}
      </div>
    )
  }
}

Api.propTypes = {
  match: object.isRequired,
  apidocs: object.isRequired,
  ui: object.isRequired,
  getApiDocs: func.isRequired,
}

export default Api
