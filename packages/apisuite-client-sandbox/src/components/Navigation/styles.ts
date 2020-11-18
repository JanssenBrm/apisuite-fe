import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

export default makeStyles(({
  activeTab: {
    '& > span': {
      fontWeight: 600,
    },
  },

  alternativeLogo: {
    color: config.palette.primary,
    height: 'auto',
    marginRight: '20px',
    width: '60px',
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

  opaqueMenuUserAvatar: {
    border: `2px solid ${config.palette.primary}`,
    height: '33px',
    width: '33px',
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

  subTabsAndBackButton: {
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

  transparentMenuUserAvatar: {
    border: '2px solid #FFFFFF',
    height: '33px',
    width: '33px',
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
