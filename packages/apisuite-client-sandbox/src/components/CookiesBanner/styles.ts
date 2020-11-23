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
    fontWeight: 400,
    margin: '0px 80px 12px 0px',
  },

  cookiesConsentParagraph: {
    fontSize: '16px',
    lineHeight: '22px',
    marginRight: '80px',

    '&:first-of-type': {
      marginBottom: '20px',
    },
  },
}))

export default useStyles
