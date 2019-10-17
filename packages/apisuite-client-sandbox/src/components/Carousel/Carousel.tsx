import * as React from 'react'
import autoPlay from 'react-swipeable-views-utils/lib/autoPlay'
import virtualize from 'react-swipeable-views-utils/lib/virtualize'
import bindKeyboard from 'react-swipeable-views-utils/lib/bindKeyboard'
import SwipeableViews from 'react-swipeable-views'
import Dots from 'material-ui-dots'
import { makeStyles } from '@material-ui/styles'
import { CarouselProps, RendererProps } from './types'

const VirtualizeSwipeViews = bindKeyboard(virtualize(SwipeableViews))
const VirtualizeAutoPlaySwipeViews = autoPlay(VirtualizeSwipeViews)

// modulo that supports negative numbers (so that e.g. -5 % 4 = 3)
const modulo = (a: number, n: number) => ((a % n) + n) % n

const carouselSlideRenderer = (children: React.ReactNodeArray) =>
  ({ index, key }: RendererProps) => React.cloneElement(children[modulo(index, children.length)] as any, { key })

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  dots: {
    paddingTop: 36,
    margin: '0 auto',
  },
})

const Carousel: React.FC<CarouselProps> = ({ children, autoplay, ...other }) => {
  if (children == null) {
    return null
  }

  const slideRenderer = carouselSlideRenderer(children)
  const classes = useStyles()
  const [slideIndex, setSlideIndex] = React.useState(0)

  function handleChange (slideIndex: number) {
    setSlideIndex(slideIndex)
  }

  const Views = autoplay ? (
    <VirtualizeAutoPlaySwipeViews
      {...other}
      slideRenderer={slideRenderer}
      index={slideIndex}
      onChangeIndex={handleChange}
    />
  ) : (
    <VirtualizeSwipeViews
      {...other}
      slideRenderer={slideRenderer}
      index={slideIndex}
      onChangeIndex={handleChange}
    />
  )

  return (
    <div className={classes.root}>
      {Views}

      <Dots
        count={children.length}
        index={modulo(slideIndex, children.length)}
        className={classes.dots}
        onDotClick={handleChange}
      />
    </div>
  )
}

export default Carousel
