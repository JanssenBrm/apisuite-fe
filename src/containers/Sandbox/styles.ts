import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

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
    color: config.palette.tertiary,
    fontSize: '32px',
    fontWeight: 300,
    margin: '40px 0px',
  },

  sectionSeparator: {
    border: `1px solid ${config.palette.newGreyScales['300']}`,
    borderRadius: config.dimensions.borderRadius,
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
    backgroundColor: config.palette.background.default,
    border: `1px solid ${config.palette.newGreyScales['300']}`,
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'row',
  },

  individualStepsDivider: {
    borderRight: `1px solid ${config.palette.newGreyScales['300']}`,
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
      color: config.palette.newGreyScales['400'],
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
    backgroundColor: config.palette.tertiary,
    borderColor: config.palette.tertiary,
    borderRadius: `${config.dimensions.borderRadius}px`,
    color: config.palette.background.default,
    fontSize: '16px',
    fontWeight: 500,
    textTransform: 'inherit',
    width: '100%',

    '&:active, &:hover, &:link, &:visited': {
      backgroundColor: config.palette.tertiary,
      borderColor: config.palette.tertiary,
      borderRadius: `${config.dimensions.borderRadius}px`,
      color: config.palette.background.default,
    },

    '&.MuiButton-root.Mui-disabled': {
      backgroundColor: config.palette.newGreyScales['300'],
      borderColor: config.palette.newGreyScales['300'],
      borderRadius: `${config.dimensions.borderRadius}px`,
      color: config.palette.background.default,
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

  stepsDescriptionContactSupportButton: {
    backgroundColor: config.palette.warning,
    borderColor: config.palette.warning,
    borderRadius: `${config.dimensions.borderRadius}px`,
    color: config.palette.background.default,
    fontSize: '16px',
    fontWeight: 500,
    textTransform: 'inherit',
    width: '160px',

    '&:active, &:hover, &:link, &:visited': {
      backgroundColor: config.palette.warning,
      borderColor: config.palette.warning,
      borderRadius: `${config.dimensions.borderRadius}px`,
      color: config.palette.background.default,
    },
  },

  stepsDescriptionRegisterButton: {
    backgroundColor: config.palette.tertiary,
    borderColor: config.palette.tertiary,
    borderRadius: `${config.dimensions.borderRadius}px`,
    color: config.palette.background.default,
    fontSize: '16px',
    fontWeight: 500,
    textTransform: 'inherit',
    width: '135px',

    '&:active, &:hover, &:link, &:visited': {
      backgroundColor: config.palette.tertiary,
      borderColor: config.palette.tertiary,
      borderRadius: `${config.dimensions.borderRadius}px`,
      color: config.palette.background.default,
    },
  },

  stepsSectionDescriptionsContainer: {
    display: 'flex',
    maxWidth: '900px',
    width: '100%',
  },

  stepsDescriptionHeading: {
    color: config.palette.tertiary,
    fontSize: '24px',
    fontWeight: 500,
    margin: '0px 0px 12px 0px',
  },

  stepsDescriptionParagraphOne: {
    color: config.palette.active,
    fontSize: '20px',
    fontWeight: 200,
    margin: '12px 0px',
  },

  stepsDescriptionParagraphTwo: {
    color: config.palette.newGreyScales['400'],
    fontSize: '16px',
    fontWeight: 300,
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
