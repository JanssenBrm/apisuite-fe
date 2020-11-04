import { makeStyles } from '@material-ui/styles'

export default makeStyles({
  carouselSlideButtonStyling: {
    backgroundColor: '#32C896',
    borderRadius: '4px',
    color: '#FFFFFF',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 500,
    margin: '0px auto',
    padding: '17px 40px',
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
    color: '#FFFFFF',
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
      width: '100%',
    },
  },

  carouselSliderButtons: {
    display: 'flex',
    justifyContent: 'center',
    transform: 'translateY(-20px)',

    '& > :first-child': {
      borderBottomLeftRadius: '4px',
      borderTopLeftRadius: '4px',
    },

    '& > :last-child': {
      borderBottomRightRadius: '4px',
      borderTopRightRadius: '4px',
    },
  },

  notSelectedCarouselSliderButton: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #BAC0C6',
    color: '#6a7884',
    height: '40px',
    width: '40px',
  },

  selectedCarouselSliderButton: {
    backgroundColor: '#DCDFE3',
    border: '1px solid #19B3EE',
    color: '#19B3EE',
    height: '40px',
    width: '40px',
  },

  sideBySideSlideContentsPlacement: {
    flexDirection: 'row',

    '& > :nth-child(1)': {
      padding: '165px 25px 0px 0px',
    },

    '& > :nth-child(2)': {
      paddingTop: '165px',
    },
  },

  topToBottomSlideContentsPlacement: {
    flexDirection: 'column',

    '& > :nth-child(1)': {
      paddingBottom: '40px',
      paddingTop: '165px',
    },
  },
})
