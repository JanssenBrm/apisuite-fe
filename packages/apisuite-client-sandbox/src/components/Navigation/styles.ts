import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

export default makeStyles(({
  activeTab: {
    '& > span': {
      fontWeight: 600,
    },
  },

  alternativeAssistantAmountOfNotifications: {
    backgroundColor: config.palette.primary,
    borderRadius: '4px',
    height: '24px',
    pointerEvents: 'none',
    textAlign: 'center',
    transform: 'translate(-7px, -13.5px)',
    width: '24px',

    '& > p': {
      color: config.palette.text.primary,
      fontSize: '14px',
      fontWeight: 400,
      height: '24px',
      lineHeight: '24px',
      width: '24px',
    },
  },

  alternativeAssistantButton: {
    backgroundColor: 'transparent',
    borderRadius: '50%',
    color: config.palette.active,
    cursor: 'pointer',
    height: '32px',
    paddingTop: '1.5px',
    textAlign: 'center',
    width: '32px',
  },

  alternativeLogo: {
    color: config.palette.primary,
    height: 'auto',
    marginRight: '20px',
    width: '60px',
  },

  assistantContainer: {
    display: 'flex',
  },

  goBackButton: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',

    '& > svg': {
      marginRight: '8px',
    },
  },

  headerContentsContainer: {
    display: 'flex',
    alignItems: 'center',
  },

  linkToProfile: {
    alignSelf: 'center',
    textDecoration: 'none',
  },

  logOutIcon: {
    cursor: 'pointer',
    marginLeft: '12px',
  },

  logoAndNameContainer: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },

  opaqueMenuActiveTabOverLine: {
    backgroundColor: config.palette.primary,
    height: '3px',
    top: 0,
    transition: 'none !important',
  },

  opaqueMenuTab: {
    color: '#FFFFFF',
    fontSize: '18px',
    fontWeight: 300,
    minWidth: 'unset',
    opacity: 1,
    padding: '40px 16px',
    textTransform: 'none',
  },

  opaqueMenuUserNameAndAvatarContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'relative',
    right: 0,
  },

  opaqueSubMenuActiveTabUnderLine: {
    backgroundColor: config.palette.tertiary,
    height: '3px',
    transition: 'none !important',
  },

  portalName: {
    fontSize: '24px',
    fontWeight: 400,
  },

  regularAssistantAmountOfNotifications: {
    backgroundColor: config.palette.primary,
    borderRadius: '4px',
    height: '24px',
    pointerEvents: 'none',
    textAlign: 'center',
    transform: 'translate(-7px, -13.5px)',
    width: '24px',

    '& > p': {
      color: config.palette.background.default,
      fontSize: '14px',
      fontWeight: 400,
      height: '24px',
      lineHeight: '24px',
      width: '24px',
    },
  },

  regularAssistantButton: {
    backgroundColor: config.palette.background.default,
    borderRadius: '50%',
    color: config.palette.tertiary,
    cursor: 'pointer',
    height: '32px',
    paddingTop: '1.5px',
    textAlign: 'center',
    width: '32px',
  },

  regularLogo: {
    color: '#FFFFFF',
    height: 'auto',
    marginRight: '20px',
    width: '60px',
  },

  subTab: {
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: 300,
    minWidth: 'unset',
    opacity: 1,
    padding: '16px',
    textTransform: 'none',
  },

  subTabs: {
    display: 'flex',
  },

  subTabsAndExtraButton: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },

  transparentMenuActiveTabOverLine: {
    backgroundColor: config.palette.background.default,
    height: '3px',
    top: 0,
    transition: 'none !important',
  },

  transparentMenuTab: {
    color: '#FFFFFF',
    fontSize: '18px',
    fontWeight: 300,
    minWidth: 'unset',
    opacity: 1,
    padding: '16px',
    textTransform: 'none',
  },

  userAvatar: {
    border: '2px solid #FFFFFF',
    height: '33px',
    width: '33px',

    '&:hover': {
      border: `2px solid ${config.palette.primary}`,
    },
  },

  transparentMenuUserNameAndAvatarContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 0,
  },

  transparentSubMenuActiveTabUnderLine: {
    backgroundColor: config.palette.focus,
    height: '3px',
    transition: 'none !important',
  },

  userName: {
    fontSize: '18px',
    fontWeight: 300,
    marginRight: '20px',
  },

  yetToLogIn: {
    display: 'none',
  },
}))
