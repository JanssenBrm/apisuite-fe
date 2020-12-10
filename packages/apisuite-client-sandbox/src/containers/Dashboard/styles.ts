import { makeStyles } from '@material-ui/styles'

import dashboardSpaceBackground from 'assets/dashboardSpaceBackground.svg'

import { config } from 'constants/global'

export default makeStyles(({
  // General JSS

  dashboardContentsContainer: {
    backgroundColor: config.palette.background.default,
    position: 'relative',
  },

  // JSS for the header image

  expandedHeaderImageSection: {
    background: 'url(' + dashboardSpaceBackground + ')',
    backgroundColor: config.palette.background.default,
    backgroundPosition: 'center -320px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '300px',
    position: 'absolute',
    top: 0,
    width: '100%',
  },

  regularHeaderImageSection: {
    background: 'url(' + dashboardSpaceBackground + ')',
    backgroundColor: config.palette.background.default,
    backgroundPosition: 'center -320px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '208.5px',
    position: 'absolute',
    top: 0,
    width: '100%',
  },

  // JSS for the 'Notification cards' section

  customNotificationCardButton: {
    backgroundColor: config.palette.primary,
    borderRadius: '5px',
    boxShadow: 'none',
    color: config.palette.primaryContrastText,
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: 600,
    padding: '12px 20px',
    position: 'relative',
    textAlign: 'center',
    textDecoration: 'none',

    '&:hover': {
      cursor: 'pointer',
    },

    '&:link, &:visited': {
      color: config.palette.primaryContrastText,
    },
  },

  notificationCardSection: {
    left: '50%',
    position: 'fixed',
    transform: 'translate(-50%, -90.75px)',
    width: '100%',
    zIndex: 4,
  },

  // JSS for the 'Actions Catalog' section

  actionsCatalogSectionWithNotificationCards: {
    marginBottom: '40px',
    marginTop: '80px',
  },

  actionsCatalogSectionWithoutNotificationCards: {
    marginBottom: '40px',
    marginTop: '-80px',
  },

  // JSS for the 'Greeting card' section

  customGreetingCardButton: {
    backgroundColor: config.palette.tertiary,
    borderRadius: '5px',
    boxShadow: 'none',
    color: config.palette.tertiaryContrastText,
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: 600,
    padding: '12px 20px',
    position: 'relative',
    textAlign: 'center',
    textDecoration: 'none',

    '&:hover': {
      cursor: 'pointer',
    },

    '&:link, &:visited': {
      color: config.palette.primaryContrastText,
    },
  },

  customGreetingCardText: {
    fontSize: '20px',
    fontWeight: 200,

    '&:first-of-type': {
      marginBottom: '20px',
    },
  },

  customGreetingCardTextContainer: {
    width: '625px',
    paddingRight: '15px',
  },

  greetingCardSection: {
    marginBottom: '45px',
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

  sectionIntroHeading: {
    color: config.palette.tertiary,
    fontSize: '32px',
    fontWeight: 300,
    margin: '40px 0px',
  },

  sectionSeparator: {
    border: `1px solid ${config.palette.newGreyScales['100']}`,
    borderRadius: '4px',
    maxWidth: '900px',
    width: '100%',
  },

  // JSS for the notice

  noticeContainer: {
    margin: '0px auto -30px auto',
    maxWidth: '900px',
  },

  // JSS for the notification banner

  customNotificationBannerParagraph: {
    color: config.palette.primaryContrastText,
    fontSize: '16px',
    fontWeight: 300,
    lineHeight: '22px',
    marginRight: '15px',
  },
}))
