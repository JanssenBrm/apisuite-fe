import React, { Component } from 'react'
import { object, func } from 'prop-types'
import apiAccountInfo from 'assets/api_products_slider.svg'
import apiFeature from 'assets/api_feature_icon.svg'
import { FormattedMessage } from 'react-intl'
import Badge from 'components/Badge'
import Card from 'components/Card'
import { Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

class ApiDetail extends Component {
  state = {
    product: {},
  }

  componentDidMount () {
    const { productId } = this.props.match.params
    this.props.getApiProduct(productId)
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { product } = nextProps

    if (this.props.product !== product) {
      this.setState({ product })
    }
  }

  render () {
    const { product } = this.state
    const { theme, ui } = this.props

    return (
      <div className='api-detail-container'>
        {product.version &&
          <>
            <div className='detail-header-wrapper'>
              <div className='detail-header-content'>
                <div className='account-info'>
                  <div className='account-info-title'>
                    <Typography variant='display4' gutterBottom>{product.longname}</Typography>
                    <div className='content-badge'>
                      <Badge type='teal' text={product.version} />
                    </div>
                  </div>
                  <p>{product.description}</p>
                </div>
                <img src={theme.apiDetail || apiAccountInfo} className='account-info-logo' />
              </div>
              <div className='header-light-rays'>
                <div className='header-light-ray w-200' />
                <div className='header-light-ray w-20' />
                <div className='header-light-ray w-129' />
                <div className='header-light-ray w-130' />
              </div>
            </div>
            <div className='api-detail-usage'>
              <Typography variant='display4' gutterBottom><FormattedMessage id='landing.apiDetail-bnp-aisp.usage.title' /></Typography>
              <div className='section-container'>
                {product.usecases.map((usecase, idx) =>
                  <div key={`usage-${idx}`} className='usage-section'>
                    <Typography variant='display3' gutterBottom>{usecase.title}</Typography>
                    <p>{usecase.description}</p>
                  </div>
                )}
              </div>
            </div>
            <div className='api-features-container'>
              <div className='api-features-wrapper'>
                <Typography variant='display4' gutterBottom><FormattedMessage id='landing.apiDetail-bnp-aisp.features.title' /></Typography>
                <div className='api-features-paper'>
                  <Card
                    scope='api-detail'
                    children={
                      product.features.map((feature, idx) => (
                        <div key={`feature-${idx}`} className='api-feature'>
                          <img src={theme.accountDetails || apiFeature} className='api-feature-icon' />
                          <div className='api-feature-content'>
                            <div className='api-feature-title'>{feature.title}</div>
                            <div className='api-feature-text'>{feature.description}</div>
                          </div>
                        </div>
                      ))
                    }
                  />
                </div>
              </div>
            </div>
          </>}
        {ui.loading &&
          <div className='loading'>
            <CircularProgress className='loading-circle' />
          </div>}
      </div>
    )
  }
}

ApiDetail.propTypes = {
  theme: object.isRequired,
  match: object.isRequired,
  ui: object.isRequired,
  product: object.isRequired,
  getApiProduct: func.isRequired,
}

export default ApiDetail
