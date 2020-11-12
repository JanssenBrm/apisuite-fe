import * as React from 'react'

import ReactSlidy from 'react-slidy/lib'

import 'react-slidy/lib/index.scss'

import Button from 'components/Button'

import Fade from '@material-ui/core/Fade'

import RadioButtonCheckedRoundedIcon from '@material-ui/icons/RadioButtonCheckedRounded'
import RadioButtonUncheckedRoundedIcon from '@material-ui/icons/RadioButtonUncheckedRounded'

import { CarouselSlideProps, NewCarouselProps } from './types'

import useStyles from './styles'

// Carousel slides

const CarouselSlide: React.FC<CarouselSlideProps> = ({
  carouselSlideButton,
  carouselSlideButtonCustomStyling,
  carouselSlideButtonLabel,
  carouselSlideButtonOnClick,
  carouselSlideContentsPlacement,
  carouselSlideImage,
  carouselSlideText,
}) => {
  const classes = useStyles()

  return (
    <div
    className={
    `
    ${classes.carouselSlideOuterContainer}
    ${carouselSlideContentsPlacement && carouselSlideContentsPlacement === 'side-by-side'
    ? classes.sideBySideSlideContentsPlacement
    : classes.topToBottomSlideContentsPlacement
    }
    `
    }
    >
      {
        carouselSlideImage &&
          <div className={classes.carouselSlideInnerContainer}>
            <img alt='Slide image' src={carouselSlideImage} />
          </div>
      }

      <div className={classes.carouselSlideInnerContainer}>
        <p className={classes.carouselSlideText}>{carouselSlideText}</p>

        {
          carouselSlideButton &&
            <Button
              className={
                carouselSlideButtonCustomStyling || classes.carouselSlideButtonStyling
              }
              label={carouselSlideButtonLabel}
              onClick={carouselSlideButtonOnClick}
            />
        }
      </div>
    </div>
  )
}

// Carousel

const NewCarousel: React.FC<NewCarouselProps> = ({
  carouselBackgroundColor,
  carouselBackgroundImage,
  carouselFadeIn,
  carouselFadeInDuration,
  iconsOfSliderButtonsArray,
  initialSlide,
  slidesArray,
  slidesAutoPlay,
  slidingAnimationDuration,
  timeBetweenSlides,
}) => {
  const classes = useStyles()

  const [slideNumber, setSlideNumber] = React.useState(initialSlide || 0)
  const amountOfSlides = slidesArray.length

  const handleCarouselSlideChange = (newSlideNumber: number) => {
    setSlideNumber(newSlideNumber)
  }

  const carouselSlides = slidesArray.map((slide, index) =>
    <div
      key={`slide_${index}`}
    >
      <CarouselSlide
        carouselSlideButton={slide.slideButton}
        carouselSlideButtonLabel={slide.slideButtonLabel}
        carouselSlideContentsPlacement={slide.slideContentsPlacement}
        carouselSlideImage={slide.slideForegroundImage}
        carouselSlideText={slide.slideText}
      />
    </div>,
  )

  const carouselSliderButtons = iconsOfSliderButtonsArray ? (iconsOfSliderButtonsArray.map((icon, index) =>
    <button
      className={
        index === slideNumber
          ? classes.selectedCarouselSliderButton
          : classes.notSelectedCarouselSliderButton
      }
      key={`slider_button_${index}`}
      onClick={() => handleCarouselSlideChange(index)}
    >
      {icon}
    </button>,
  )) : (slidesArray.map((_, index) =>
    <button
      className={
        index === slideNumber
          ? classes.selectedCarouselSliderButton
          : classes.notSelectedCarouselSliderButton
      }
      key={`slider_button_${index}`}
      onClick={() => handleCarouselSlideChange(index)}
    >
      {
        index === slideNumber ? <RadioButtonCheckedRoundedIcon /> : <RadioButtonUncheckedRoundedIcon />
      }
    </button>,
  ))

  if (slidesAutoPlay) {
    /*
    If we want our slides to 'autoplay', we do the following:

    1) We set up an effect that fires every time the 'slideNumber' variable is manipulated
    (initialization included);
    2) Every time that effect fires, we set a timer for 'X' seconds (or 'X,xxx' milliseconds) - once that
    time is up, we manipulate the 'slideNumber' variable;
    3) Before the component is inevitably re-rendered, we execute the 'clearInterval' method so as to avoid
    stacking timeouts.

    This behavior repeats itself ad nauseam.
    */
    React.useEffect(() => {
      const scheduledCarouselSlideChange = setTimeout(() => {
        if (slideNumber < (amountOfSlides - 1)) {
          const newSlideNumber = slideNumber + 1

          setSlideNumber(newSlideNumber)
        } else {
          setSlideNumber(0)
        }
      }, timeBetweenSlides || 1000)

      return () => clearInterval(scheduledCarouselSlideChange)
    }, [slideNumber])
  }

  return (
    <>
      <Fade
        className={classes.carouselSlider}
        in={carouselFadeIn || true}
        timeout={carouselFadeInDuration || 2500}
      >
        <div
          style={
            carouselBackgroundImage
              ? {
                background: `url(${carouselBackgroundImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }
              : { backgroundColor: carouselBackgroundColor || '#374858' }
          }
        >
          <ReactSlidy
            initialSlide={initialSlide || 0}
            slide={slideNumber}
            slideSpeed={slidingAnimationDuration || 1000}
          >
            {carouselSlides}
          </ReactSlidy>
        </div>
      </Fade>

      <Fade
        className={classes.carouselSliderButtons}
        in={carouselFadeIn || true}
        timeout={1000}
      >
        <div>
          {carouselSliderButtons}
        </div>
      </Fade>
    </>
  )
}

export default NewCarousel
