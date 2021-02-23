import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

const useStyles = makeStyles(({
  cookiesConsentBannerContainer: {
    backgroundColor: `${config.palette.primary} !important`,
    padding: '25px 45px',
  },

  cookiesConsentButton: {
    backgroundColor: `${config.palette.background.default} !important`,
    borderRadius: `${config.dimensions.borderRadius}px !important`,
    color: `${config.palette.primary} !important`,
    padding: '12px 20px !important',
    fontSize: '16px !important',
    fontWeight: 600,
  },

  cookiesConsentHeader: {
    color: config.palette.primaryContrastText,
    fontSize: '24px',
    fontWeight: 400,
    margin: '0px 80px 12px 0px',
  },

  cookiesConsentParagraph: {
    color: config.palette.primaryContrastText,
    fontSize: '16px',
    fontWeight: 300,
    lineHeight: '22px',
    marginRight: '80px',

    '&:first-of-type': {
      marginBottom: '20px',
    },
  },
}))

export default useStyles
