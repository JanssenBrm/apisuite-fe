import React from 'react'
import { func, object, array } from 'prop-types'
import apiDefaultHeader from 'assets/graphic_placeholder.svg'
import circleCaretRight from 'assets/circle_caret_right.svg'
import Badge from 'components/Badge'
import { FormattedMessage } from 'react-intl'
import { Typography } from '@material-ui/core'
import classnames from 'classnames'
import requireIfExists from 'util/requireIfExists'
import Carousel from 'nuka-carousel'
import caretRightIcon from 'assets/caret_right.svg'

export const leftControl = ({ previousSlide }) => (
  <div className='product-left-caret' onClick={previousSlide}>
    <img src={caretRightIcon} />
  </div>
)

export const rightControl = ({ nextSlide }) => (
  <div className='product-right-caret' onClick={nextSlide}>
    <img src={caretRightIcon} />
  </div>
)

export default class SectionApis extends React.Component {
  state = {
    autoplay: false,
    autoplayInterval: 8000,
    easing: 'easeExpInOut',
    swiping: true,
    wrapAround: true,
    renderCenterLeftControls: leftControl,
    renderCenterRightControls: rightControl,
    slidesToShow: 3,
    renderBottomCenterControls: null,
    heightMode: 'max',
  }

  componentDidMount () {
    const apiWrapper = document.getElementsByClassName('apis-wrapper')[0]
    if (apiWrapper && apiWrapper.offsetWidth) {
      this.state.slidesToShow = Math.round(apiWrapper.offsetWidth / 400)
    }
  }

  getProductsByBrand (brandId) {
    const { products } = this.props
    return products.filter(p => p.brand_id === brandId)
  }

  renderProduct (product, idx) {
    const { goToApi } = this.props
    return (
      <div className='product-api-item'>
        <div className='apis-api-block-content'>
          <Typography variant='display3'>
            {product.name}
          </Typography>
          <p>
            {product.intro}
          </p>
        </div>
        <div className='apis-api-block-footer'>
          <div
            className={classnames(
              'apis-api-block-action',
              { disabled: !product.version }
            )}
            testid={`api-block-${idx}`}
            onClick={() => goToApi(product.id)}
          >
            <img src={circleCaretRight} />
            <span><FormattedMessage id='landing.apis.back' /></span>
          </div>
          <div className='apis-api-block-badge'>
            <Badge
              type={product.version ? 'teal' : 'grey'}
              text={product.version || <FormattedMessage id='landing.apis.comingSoon' />}
            />
          </div>
        </div>
      </div>
    )
  }

  renderProducts (products) {
    if (products && products.length > 0) {
      return (
        <ul className='product-apis'>
          {
            products.map((product, idx) => {
              const { goToApi } = this.props
              return (
                <li key={`product-${idx}`} className='product-api-item'>
                  <Typography variant='display3'>
                    {product.name}
                  </Typography>
                  <p>
                    {product.intro}
                  </p>
                  <div className='apis-api-block-footer'>
                    <div
                      className={classnames(
                        'apis-api-block-action',
                        { disabled: !product.version }
                      )}
                      testid={`api-block-${idx}`}
                      onClick={() => goToApi(product.id)}
                    >
                      <img src={circleCaretRight} />
                      <span><FormattedMessage id='landing.apis.back' /></span>
                    </div>
                    <hr />
                    <Badge
                      type={product.version ? 'teal' : 'grey'}
                      text={product.version || <FormattedMessage id='landing.apis.comingSoon' />}
                    />
                  </div>
                </li>
              )
            })
          }
        </ul>
      )
    }
  }

  renderBrands () {
    const { products, brands, theme } = this.props
    if (products && products.length > 0) {
      products.sort((p1, p2) => p1.brand_id - p2.brand_id)
      return (
        <Carousel
          {...this.state}
        >
          {
            products.map((product, idx) =>
              <div key={`api-${idx}`} className='apis-api-block'>
                <div className='apis-api-block-content'>
                  <div className='apis-api-block-header'>
                    <img
                      src={(theme.name === 'bnpp' && requireIfExists(brands.find(br => br.id === product.brand_id).logo)) || apiDefaultHeader}
                    />
                  </div>
                  <div className='product-api'>
                    {this.renderProduct(product, idx)}
                  </div>
                </div>
              </div>
            )
          }
        </Carousel>
      )
    }
  }

  render () {
    return (
      <div className='section apis-section'>
        <div className='section-content'>
          <div className='apis-section-top'>
            <Typography variant='display3'><FormattedMessage id='landing.apis.title' /></Typography>
            <p>
              <FormattedMessage
                id='landing.apis.text'
                values={{
                  psd2bold: (
                    <strong>
                      <FormattedMessage
                        id='landing.apis.psd2bold'
                      />
                    </strong>
                  ),
                }}
              />
            </p>
          </div>
        </div>
        <div className='apis-section-bottom'>
          <div className='apis-wrapper'>
            {this.renderBrands()}
          </div>
        </div>
      </div>
    )
  }
}

SectionApis.propTypes = {
  goToApi: func.isRequired,
  theme: object.isRequired,
  products: array.isRequired,
  brands: array.isRequired,
}
