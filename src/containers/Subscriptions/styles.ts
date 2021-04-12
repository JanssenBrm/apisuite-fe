import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

export default makeStyles(({
  addSubscriptionButton: {
    backgroundColor: config.palette.primary,
    borderRadius: `${config.dimensions.borderRadius}px`,
    color: `${config.palette.primaryContrastText} !important`,
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 500,
    padding: '12px 21px',
    textDecoration: 'none',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: config.palette.primary,
    },
  },

  addSubscriptionButtonContainer: {
    marginBottom: '30px',
  },

  dataToShowContentContainer: {
    margin: '0px auto',
    maxWidth: '900px',
    width: '100%',
  },

  dataToShowDescription: {
    color: config.palette.newGreyScales['400'],
    fontSize: '16px',
    fontWeight: 300,
    marginBottom: '24px',
  },

  dataToShowSubscriptionsTable: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '35px',
  },

  dataToShowTitle: {
    color: config.palette.tertiary,
    fontSize: '32px',
    fontWeight: 300,
    marginBottom: '12px',
  },

  infoBox: {
    alignItems: 'center',
    backgroundColor: config.palette.alert.success.background,
    borderRadius: `${config.dimensions.borderRadius}px`,
    display: 'flex',
    height: '75px',
    marginLeft: 'auto',
    textAlign: 'left',
    width: '435px',
  },

  infoBoxIcon: {
    fill: '#46B5EF',
    transform: 'translate(7px, -17.5px)',
  },

  infoBoxText: {
    color: '#035E86',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '18px',
    margin: '0px 10px 0px 15px',
  },

  noDataToShowContentContainer: {
    margin: '70px auto',
    maxWidth: '900px',
    textAlign: 'center',
    width: '100%',
  },

  noDataToShowImage: {
    filter: 'grayscale(100%)',
    height: '185px',
    opacity: 0.35,
  },

  noDataToShowImageContainer: {
    marginBottom: '40px',
  },

  noDataToShowLink: {
    color: `${config.palette.newGreyScales['300']} !important`,
    marginTop: '15px',
  },
}))
