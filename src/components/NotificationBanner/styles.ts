import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

const useStyles = makeStyles(({
  notificationBannerCloseButton: {
    color: config.palette.primaryContrastText,
    height: '24px',
    width: '24px',
  },

  notificationBannerContentsContainer: {
    backgroundColor: config.palette.primary,
    bottom: 0,
    display: 'flex',
    padding: '25px 60px 45px 60px',
    position: 'sticky',
  },

  notificationBannerHeader: {
    color: config.palette.primaryContrastText,
    fontSize: '24px',
    fontWeight: 400,
    margin: '0px 15px 15px 0px',
  },

  notificationBannerParagraph: {
    color: config.palette.primaryContrastText,
    fontSize: '16px',
    fontWeight: 300,
    lineHeight: '22px',
    marginRight: '15px',
  },

  notificationBannerTextContainer: {
    width: '100%',
  },
}))

export default useStyles
