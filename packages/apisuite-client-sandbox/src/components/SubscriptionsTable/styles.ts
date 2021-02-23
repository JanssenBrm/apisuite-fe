import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

export default makeStyles(({
  apiAppsContainer: {
    alignItems: 'center',
    borderLeft: `1px solid ${config.palette.newGreyScales['100']}`,
    display: 'flex',
    width: '405px',
  },

  apiDetailsLinkContainer: {
    alignItems: 'center',
    borderLeft: `1px solid ${config.palette.newGreyScales['100']}`,
    display: 'flex',
    justifyContent: 'center',
    width: '40px',

    '& > a': {
      color: config.palette.active,
      height: '24px',
      transform: 'scaleX(-1)',
      width: '24px',
    },
  },

  apiName: {
    alignItems: 'center',
    color: config.palette.active,
    display: 'flex',
    fontSize: '16px',
    fontWeight: 400,
    paddingLeft: '40px',
  },

  apiNameAndAppsContainer: {
    backgroundColor: config.palette.background.default,
    borderTop: `1px solid ${config.palette.newGreyScales['100']}`,
    display: 'flex',
    height: '40px',
    justifyContent: 'space-between',
    width: '100%',
  },

  apiNameContainer: {
    alignItems: 'center',
    display: 'flex',
    width: '455px',
  },

  apiVersionDetailsContainer: {
    alignItems: 'center',
    borderTop: `1px solid ${config.palette.newGreyScales['100']}`,
    display: 'flex',
    height: '35px',
    justifyContent: 'space-between',
    padding: '0px 7.5px 00px 40px',
  },

  apiVersionIconsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '300px',
  },

  apiVersionLink: {
    textDecoration: 'none',
  },

  apiVersionName: {
    color: config.palette.newGreyScales['400'],
    fontSize: '14px',
    fontWeight: 300,
    textAlign: 'center',
    width: '300px',
  },

  apiVersionNumber: {
    color: config.palette.tertiary,
    fontSize: '14px',
    fontWeight: 300,
    textAlign: 'left',
    width: '300px',
  },

  appNameIcon: {
    backgroundColor: config.palette.primary,
    borderRadius: '4px',
    color: config.palette.primaryContrastText,
    fontSize: '14px',
    fontWeight: 300,
    justifyContent: 'center',
    marginLeft: '12px',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: '35px',
  },

  chevronIcon: {
    color: config.palette.newGreyScales['400'],
  },

  deprecatedIcon: {
    backgroundColor: config.palette.warning,
    borderRadius: '4px',
    color: config.palette.primaryContrastText,
    marginRight: '20px',
    padding: '5px',
  },

  mostRecentAPIVersionLink: {
    color: config.palette.active,
    height: '24px',
    textDecoration: 'none',
    transform: 'scaleX(-1)',
    width: '24px',
  },

  noSubsMessage: {
    color: config.palette.newGreyScales['400'],
    fontSize: '14px',
    fontWeight: 300,
    padding: '10px 0px 10px 12px',
  },

  tableBody: {
    backgroundColor: config.palette.newGreyScales['25'],
    border: `1px solid ${config.palette.newGreyScales['300']}`,
    borderBottomLeftRadius: `${config.dimensions.borderRadius}px`,
    borderBottomRightRadius: `${config.dimensions.borderRadius}px`,
    borderTop: 'none',
    width: '100%',
  },

  tableContentsContainer: {
    width: '900px',
  },

  tableHeader: {
    backgroundColor: config.palette.background.default,
    border: `1px solid ${config.palette.newGreyScales['300']}`,
    borderTopLeftRadius: `${config.dimensions.borderRadius}px`,
    borderTopRightRadius: `${config.dimensions.borderRadius}px`,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 47.5px 10px 40px',
    width: '100%',

    '& > :first-child': {
      color: config.palette.active,
      fontSize: '16px',
      fontWeight: 300,
    },

    '& > :last-child': {
      color: config.palette.newGreyScales['400'],
      fontSize: '16px',
      fontWeight: 300,
    },
  },
}))
