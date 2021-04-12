import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

export default makeStyles({
  hideNotificationCardContentsContainer: {
    alignItems: 'center',
    backgroundColor: config.palette.background.default,
    borderRadius: `${config.dimensions.borderRadius}px`,
    boxShadow: `0px 3px 10px -3px ${config.palette.newGreyScales['100']}`,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 'auto',
    maxWidth: '900px',
    opacity: 0,
    padding: '20px 40px',
    transition: 'opacity 0.35s',
    width: '100%',
  },

  notificationCardButton: {
    backgroundColor: config.palette.primary,
    borderRadius: `${config.dimensions.borderRadius}px`,
    boxShadow: 'none',
    color: `${config.palette.primaryContrastText} !important`,
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: 600,
    padding: '12px 20px',
    position: 'relative',
    textAlign: 'center',
    textDecoration: 'none',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: config.palette.primary,
    },
  },

  notificationCardCloseButton: {
    color: config.palette.newGreyScales['300'],
    cursor: 'pointer',
    height: '24px',
    width: '24px',
  },

  notificationCardText: {
    color: config.palette.newGreyScales['400'],
    fontSize: '20px',
    fontWeight: 300,
    maxWidth: '542.5px',
    width: '100%',
  },

  notificationCardTitle: {
    color: config.palette.tertiary,
    fontSize: '27px',
    fontWeight: 400,
    marginBottom: '12px',
    maxWidth: '542.5px',
    width: '100%',
  },

  showNotificationCardContentsContainer: {
    alignItems: 'center',
    backgroundColor: config.palette.background.default,
    borderRadius: `${config.dimensions.borderRadius}px`,
    boxShadow: `0px 3px 10px -3px ${config.palette.newGreyScales['100']}`,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 'auto',
    maxWidth: '900px',
    opacity: 1,
    padding: '20px 40px',
    transition: 'opacity 0.35s',
    width: '100%',
  },
})
