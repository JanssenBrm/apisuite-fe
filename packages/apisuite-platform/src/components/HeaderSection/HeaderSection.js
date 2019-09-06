import React, { Component, Fragment } from 'react'
import { object } from 'prop-types'
import classnames from 'classnames'
import apiProductSlider from 'assets/api_products_slider.svg'
import Carousel from 'nuka-carousel'
import { FormattedMessage } from 'react-intl'
import Badge from 'components/Badge'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core'

export const sliderControls = ({ slideCount, currentSlide, goToSlide }) =>
  Array.apply(null, Array(slideCount)).map((slide, index) =>
    <div
      key={`slider-bullet-${index}`}
      className={classnames(
        'slider-bullet',
        {'active': index === currentSlide}
      )}
      testid={`slider-bullet-${index}`}
      onClick={() => goToSlide(index)}
    />
  )

const sandboxVersion = 1

const slides = [
  {
    title: 'landing.header.1.title',
    action: 'scrollToApis',
    link: null,
    text: 'landing.header.1.text'
  },
  {
    title: 'landing.header.2.title',
    action: 'scrollToApis',
    link: null,
    text: 'landing.header.2.text'
  },
  {
    title: 'landing.header.3.title',
    action: null,
    link: 'assets/docs/Our_Open_Banking_Program.pdf',
    text: 'landing.header.3.text'
  }
]

class HeaderSection extends Component {
  state = {
    autoplay: true,
    autoplayInterval: 8000,
    easing: 'easeExpInOut',
    swiping: true,
    wrapAround: true,
    renderCenterLeftControls: null,
    renderCenterRightControls: null,
    renderBottomCenterControls: sliderControls,
    heightMode: 'max'
  }

  scrollToApis = () => {
    window.scrollTo({ top: 1200, behavior: 'smooth' })
  }

  render () {
    const { theme } = this.props
    return (
      <div className='header-wrapper'>
        <div className='header-content'>
          <Carousel
            {...this.state}
          >
            {slides.map((slide, idx) => (
              <div key={`slide-${idx}`} className='header-slide'>
                <div className='header-slide-wrapper'>
                  <img src={theme[`apiSlider${idx + 1}`] || apiProductSlider} className='devices-logo' />
                  <div className='slide-content'>
                    <div className='content-title'>
                      <Typography variant='display3' gutterBottom className='slider-title'><FormattedMessage id={slide.title} /></Typography>
                      <div className='content-badge'>
                        {slide.badge &&
                          <Badge
                            text={
                              <Fragment>
                                <FormattedMessage id={slide.badge} />
                                <span>{`${sandboxVersion}`}</span>
                              </Fragment>
                            }
                          />
                        }
                      </div>
                    </div>
                    <div className='slide-text'>
                      <FormattedMessage id={slide.text} />
                    </div>
                    {slide.action &&
                      <Button
                        id='readmore-btn'
                        testid='readmore-btn'
                        className='header-button'
                        variant='outlined'
                        onClick={slide.action ? () => this[slide.action]() : null}
                      >
                        <FormattedMessage id='landing.readmore.button' />
                      </Button>
                    }
                    {slide.link &&
                      <a
                        className='header-link'
                        variant='outlined'
                        href='assets/docs/Our_Open_Banking_Program.pdf'
                        target='_blank'
                      >
                        <FormattedMessage id='landing.readmore.button' />
                      </a>
                    }
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        <div className='header-light-rays'>
          <div className='header-light-ray w-200' />
          <div className='header-light-ray w-20' />
          <div className='header-light-ray w-129' />
          <div className='header-light-ray w-130' />
        </div>
      </div>
    )
  }
}

HeaderSection.propTypes = {
  theme: object.isRequired
}

export default HeaderSection
