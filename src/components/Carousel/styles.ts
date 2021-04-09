import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

export default makeStyles({
  carouselSlideButtonStyling: {
    backgroundColor: config.palette.primary,
    borderRadius: `${config.dimensions.borderRadius}px`,
    color: `${config.palette.primaryContrastText} !important`,
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 500,
    margin: '0px auto',
    padding: '17px 40px',
    textDecoration: 'none',
    width: '200px',
  },

  carouselSlideInnerContainer: {
    display: 'block',
    textAlign: 'center',
  },

  carouselSlideOuterContainer: {
    alignItems: 'center',
    display: 'flex',
    height: 'auto',
    justifyContent: 'center',
  },

  carouselSlideText: {
    color: config.palette.background.default,
    fontSize: '22px',
    fontWeight: 300,
    marginBottom: '30px',
  },

  carouselSlider: {
    alignItems: 'center',
    display: 'flex',
    height: '670px',
    justifyContent: 'center',
    width: '100%',

    // Hides the slider's 'previous' and 'next' buttons
    '& > div > span': {
      display: 'none',
    },

    // Makes the slider truly full-width (do NOT remove)
    '& .react-Slidy': {
      height: '550px',
      width: '100%',
    },
  },

  carouselSliderIconButtons: {
    display: 'flex',
    justifyContent: 'center',
    transform: 'translateY(-20px)',

    '& > :first-child': {
      borderBottomLeftRadius: `${config.dimensions.borderRadius}px`,
      borderTopLeftRadius: `${config.dimensions.borderRadius}px`,
    },

    '& > :last-child': {
      borderBottomRightRadius: `${config.dimensions.borderRadius}px`,
      borderTopRightRadius: `${config.dimensions.borderRadius}px`,
    },
  },

  notSelectedCarouselSliderIconButton: {
    backgroundColor: config.palette.background.default,
    border: `1px solid ${config.palette.newGreyScales['300']}`,
    color: '#6A7884',
    height: '40px',
    width: '40px',
  },

  selectedCarouselSliderIconButton: {
    backgroundColor: '#DCDFE3',
    border: `1px solid ${config.palette.focus}`,
    color: config.palette.focus,
    height: '40px',
    width: '40px',
  },

  sideBySideSlideContentsPlacement: {
    flexDirection: 'row',
    minHeight: '550px',

    '& > :nth-child(1)': {
      padding: '165px 25px 0px 0px',
    },

    '& > :nth-child(2)': {
      paddingTop: '165px',
    },
  },

  topToBottomSlideContentsPlacement: {
    flexDirection: 'column',
    minHeight: '550px',

    '& > :nth-child(1)': {
      paddingBottom: '40px',
      paddingTop: '165px',
    },
  },
})
