import React, { Component } from 'react'
import { object, array, func } from 'prop-types'
import Card from 'components/Card'
// import Button from '@material-ui/core/Button'
import Badge from 'components/Badge'
import caretRightIcon from 'assets/caret_right.svg'
import apiDefaultHeader from 'assets/graphic_placeholder.svg'
import { FormattedMessage } from 'react-intl'
import { Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import requireIfExists from 'util/requireIfExists'

class ApiReferences extends Component {
  componentDidMount () {
    this.props.fetchApiProducts()
  }

  goToDetail = (route) => {
    this.props.history.push(`api-detail/${route}`)
  }

  goToApi = (route) => {
    this.props.history.push(`api/${route}`)
  }

  render () {
    const { products, brands, ui, theme } = this.props
    products.sort((p1, p2) => p1.brand_id - p2.brand_id)
    return (
      <div className='api-references-container'>
        <div className='api-references-wrapper'>
          <div className='api-references-apis'>
            {!ui.loading && products.length > 0 &&
              <Card
                scope='api-references'
                children={
                  products.filter(api => api.version).map(api =>
                    <div className='api-reference-api'>
                      <img
                        src={(theme.name === 'bnpp' && requireIfExists(brands.find(br => br.id === api.brand_id).logo)) || apiDefaultHeader}
                      />
                      <div className='api-reference-title' onClick={() => this.goToApi(`${encodeURIComponent(brands.filter(brand => brand.id === api.brand_id)[0].name.toLowerCase())}/${api.id}/${api.role}/${api.version.match(/[\d.]+/gmi)}`)}>
                        <Typography variant='display1'>
                          {api.longname}
                        </Typography>
                        <div className='api-caret'>
                          <img src={caretRightIcon} />
                        </div>
                      </div>
                      <div className='api-references-detail'>
                        <p><FormattedMessage id='docs.apireferences.apiversion' /></p>
                        <Badge type='teal' text={api.version} />
                        {/* <Badge type='green' text='version 1' /> */}
                        {/* <Badge type='grey' text='beta' /> */}
                      </div>
                      <div className='api-references-info'>
                        <p>Also: <a className='info-link' onClick={() => this.goToDetail(api.id)}>
                          <FormattedMessage id='docs.apireferences.productinfo' />
                        </a>
                        </p>
                      </div>
                    </div>
                  )
                }
              />}
            {ui.loading &&
              <div className='loading'>
                <CircularProgress className='loading-circle' />
              </div>}
          </div>

          <div className='api-references-description'>
            <Typography variant='display3' gutterBottom>
              <FormattedMessage id='docs.apireferences.title' />
            </Typography>
            <p>
              <FormattedMessage id='docs.apireferences.text' />
            </p>
            <br />
            {/* <Button
              id='your-subscriptions'
              key='your-subscriptions'
              variant='outlined'
              disabled
            >
              <FormattedMessage id='docs.apireferences.yoursubscriptions' />
            </Button> */}

            {/* <Button
              id='status-page'
              key='status-page'
              variant='outlined'
              disabled
            >
              <FormattedMessage id='docs.apireferences.statuspage' />
            </Button> */}
          </div>
        </div>
      </div>
    )
  }
}

ApiReferences.propTypes = {
  history: object.isRequired,
  theme: object.isRequired,
  ui: object.isRequired,
  products: array.isRequired,
  brands: array.isRequired,
  fetchApiProducts: func.isRequired,
}

export default ApiReferences
