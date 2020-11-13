import { makeStyles } from '@material-ui/styles'

export default makeStyles(({
  // General JSS

  root: {
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    paddingBottom: 45,
    width: '100%',
  },

  section: {
    maxWidth: 900,
    margin: '0 auto',
  },

  sectionIntroHeading: {
    color: '#14283C',
    fontSize: '32px',
    fontWeight: 300,
    margin: '40px 0px',
  },

  sectionSeparator: {
    color: '#BAC0C6',
    maxWidth: '900px',
    width: '100%',
  },

  // JSS for the 'Slideshow' section

  slideShowSectionContainer: {
    height: '670px',
    marginBottom: '-280px',
    transform: 'translateY(-300px)',
  },

  // JSS for the 'Steps' section

  individualStepsContainer: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #BAC0C6',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'row',
  },

  individualStepsDivider: {
    borderRight: '1px solid #BAC0C6',
  },

  individualStep: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 18px',
    width: '200px',

    '& > h1': {
      fontSize: '42px',
      fontWeight: '700',
      marginBottom: '30px',
    },

    '& > h3': {
      marginBottom: '20px',
      fontSize: '20px',
      fontWeight: 300,
      textAlign: 'center',
    },

    '& > p': {
      color: '#85909A',
      fontSize: '14px',
      height: '100px',
      lineHeight: '18px',
      textAlign: 'center',
      marginBottom: '55px',

      '& > span': {
        display: 'block',
        margin: '0px 0px 15px 0px',
      },
    },
  },

  individualStepButton: {
    backgroundColor: '#BAC0C6',
    borderColor: '#BAC0C6',
    borderRadius: '4px',
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: 500,
    textTransform: 'inherit',
    width: '100%',

    '&:active': {
      backgroundColor: '#BAC0C6',
      borderColor: '#BAC0C6',
      borderRadius: '4px',
      color: '#FFFFFF',
    },

    '&:hover': {
      backgroundColor: '#BAC0C6',
      borderColor: '#BAC0C6',
      borderRadius: '4px',
      color: '#FFFFFF',
    },
  },

  stepsSectionContainer: {
    display: 'block',
    margin: '0 auto 40px auto',
    maxWidth: '900px',
    width: '100%',
  },

  stepsDescriptionContainerOne: {
    display: 'block',
    marginRight: '40px',
    maxWidth: '260px',
    width: '100%',
  },

  stepsDescriptionContainerTwo: {
    display: 'block',
    maxWidth: '600px',
    width: '100%',
  },

  stepsDescriptionRegisterButton: {
    backgroundColor: '#14283C',
    borderColor: '#14283C',
    borderRadius: '4px',
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: 500,
    textTransform: 'inherit',
    width: '135px',

    '&:active': {
      backgroundColor: '#14283C',
      borderColor: '#14283C',
      borderRadius: '4px',
      color: '#FFFFFF',
    },

    '&:hover': {
      backgroundColor: '#14283C',
      borderColor: '#14283C',
      borderRadius: '4px',
      color: '#FFFFFF',
    },
  },

  stepsSectionDescriptionsContainer: {
    display: 'flex',
    maxWidth: '900px',
    width: '100%',
  },

  stepsDescriptionHeading: {
    color: '#14283C',
    fontSize: '24px',
    fontWeight: 500,
    margin: '0px 0px 12px 0px',
  },

  stepsDescriptionParagraphOne: {
    color: '#51606E',
    fontSize: '20px',
    fontWeight: 300,
    margin: '12px 0px',
  },

  stepsDescriptionParagraphTwo: {
    color: '#85909A',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '20px',
    margin: '12px 0px',

    '& > span': {
      display: 'block',
      margin: '12px 0px',
    },
  },

  // JSS for the 'API Catalog' section

  apiCatalogContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  apiCatalogSectionContainer: {
    display: 'block',
    margin: '40px auto 20px auto',
    maxWidth: '900px',
    width: '100%',
  },

  // JSS for the 'notice'

  noticeContainer: {
    margin: '0px auto -30px auto',
    maxWidth: '900px',
  },
}))
