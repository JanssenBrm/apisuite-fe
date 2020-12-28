import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

export default makeStyles(({
  /* 1. Modal */

  modalContentsContainer: {
    backgroundColor: config.palette.background.default,
    borderRadius: '4px',
    boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.3)',
    height: '100%',
    /* The 'outline' property is necessary to remove
    an annoying orange border that Material UI adds
    to modals by default. Do NOT remove. */
    outline: 'none',
    /* The 'overflow' property is necessary to allow
    for scrolling on Material UI modals. Do NOT remove. */
    overflow: 'scroll',
    padding: '25px 80px',
    width: '100%',
  },

  /* 1.1 Modal's header */

  closeModalButtonContainer: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',

    '& > p': {
      color: config.palette.label,
      fontSize: '14px',
      fontWeight: 300,
      marginRight: '15px',
      textDecoration: 'underline',
    },

    '& > svg': {
      color: config.palette.active,
      height: '25px',
      width: '25px',
    },
  },

  logoAndNameContainer: {
    alignItems: 'center',
    display: 'flex',
  },

  modalHeaderContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 auto',
    maxWidth: '900px',
    width: '100%',
  },

  portalLogo: {
    color: config.palette.primary,
    height: 'auto',
    /* This property makes it so that the logo is
    left-aligned with the remaining content.
    Do NOT remove. */
    marginLeft: '-7px',
    marginRight: '7px',
    width: '55px',
  },

  portalName: {
    color: config.palette.tertiary,
    fontSize: '24px',
    fontWeight: 500,
  },

  /* 1.2 Modal's body */

  header: {
    color: config.palette.tertiary,
    fontSize: '22px',
    fontWeight: 400,
    margin: '20px 0px 0px 0px',
  },

  modalBodyContainer: {
    display: 'block',
    margin: '0 auto',
    maxWidth: '900px',
    width: '100%',
  },

  sectionSeparator: {
    border: `1px solid ${config.palette.newGreyScales['100']}`,
    borderRadius: config.dimensions.borderRadius,
    margin: '25px 0px',
    width: '100%',
  },

  /* 1.2.1 'Steps' section */

  stepsContainer: {
    color: config.palette.active,
    fontSize: '20px',
    fontWeight: 200,
    lineHeight: '30px',
    margin: '25px 0px 0px 0px',
    paddingLeft: '19.25px',

    '& li': {
      paddingLeft: '7.5px',
    },
  },

  /* 1.2.2 'Client applications' section */

  clientAppNotificationContainer: {
    maxWidth: '400px',
    width: '100%',

    '& > :first-child': {
      color: config.palette.newGreyScales['400'],
      fontSize: '14px',
      fontWeight: 400,
      marginBottom: '25px',
    },
  },

  clientAppSelectorContainer: {
    marginRight: '40px',
    maxWidth: '420px',
    width: '100%',

    '& > :first-child': {
      color: config.palette.tertiary,
      fontSize: '16px',
      fontWeight: 500,
      marginBottom: '25px',
    },

    '& > :last-child': {
      color: config.palette.active,
      border: `1px solid ${config.palette.newGreyScales['400']}`,
      borderRadius: '4px',
      height: '40px',
      maxWidth: '420px',
      width: '100%',

      /* Overriding Material UI's styles for the 'Select' component */

      '& > .MuiSelect-select.MuiSelect-select': {
        alignSelf: 'flex-end',
        padding: '10px 50px 10px 10px',
      },

      '& > .MuiSelect-icon': {
        color: config.palette.active,
        marginRight: '15px',
      },
    },
  },

  clientAppsContainer: {
    display: 'flex',
  },

  infoBox: {
    alignItems: 'center',
    backgroundColor: config.palette.alert.success.background,
    borderRadius: '4px',
    display: 'flex',
    height: '55px',
    textAlign: 'left',
  },

  infoBoxIcon: {
    fill: '#46b5ef',
    transform: 'translate(7px, -7px)',
  },

  infoBoxText: {
    color: '#035E86',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '18px',
    margin: '0px 10px 0px 15px',
  },

  warningBox: {
    alignItems: 'center',
    backgroundColor: '#FFDCB9',
    borderRadius: '4px',
    display: 'flex',
    height: '55px',
    textAlign: 'left',
  },

  warningBoxIcon: {
    fill: config.palette.warning,
    transform: 'translate(7px, -7px)',
  },

  warningBoxText: {
    color: '#80460B',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '18px',
    margin: '0px 10px 0px 15px',
  },

  /* 1.2.3 'API product subscriptions' section */

  alternativeAPIProductDetailsContainer: {
    alignItems: 'center',
    backgroundColor: 'none',
    borderBottom: `1px solid ${config.palette.newGreyScales['50']}`,
    display: 'flex',
    height: '40px',
    justifyContent: 'space-between',
    padding: '10px 16.75px 10px 40px',
    width: '100%',
  },

  apiProductName: {
    color: config.palette.active,
    fontSize: '16px',
    fontWeight: 500,
  },

  apiProductVersion: {
    color: config.palette.newGreyScales['400'],
    fontSize: '14px',
    fontWeight: 300,
    marginRight: '14.75px',
  },

  apiProductVersionAndSelectionContainer: {
    alignItems: 'center',
    display: 'flex',
  },

  apiProductsSubsContainer: {
    display: 'block',
  },

  apiProductsSubsTable: {
    maxWidth: '900px',
  },

  noAPIProductsToShow: {
    alignItems: 'center',
    display: 'flex',
    height: '160px',
    justifyContent: 'center',
    width: '100%',

    '& > :first-child': {
      color: '#85909A',
      fontSize: '16px',
      fontWeight: 300,
    },
  },

  notSelectedAPIProduct: {
    color: config.palette.newGreyScales['400'],
  },

  regularAPIProductDetailsContainer: {
    alignItems: 'center',
    backgroundColor: config.palette.background.default,
    borderBottom: `1px solid ${config.palette.newGreyScales['50']}`,
    display: 'flex',
    height: '40px',
    justifyContent: 'space-between',
    padding: '10px 16.75px 10px 40px',
    width: '100%',
  },

  selectedAPIProduct: {
    color: config.palette.primary,
  },

  tableBody: {
    backgroundColor: config.palette.newGreyScales['25'],
    border: `1px solid ${config.palette.newGreyScales['300']}`,
    borderBottomLeftRadius: `${config.dimensions.borderRadius}px`,
    borderBottomRightRadius: `${config.dimensions.borderRadius}px`,
    borderTop: 'none',
    width: '100%',
  },

  tableHeader: {
    backgroundColor: config.palette.background.default,
    border: `1px solid ${config.palette.newGreyScales['300']}`,
    borderTopLeftRadius: `${config.dimensions.borderRadius}px`,
    borderTopRightRadius: `${config.dimensions.borderRadius}px`,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 55px 10px 40px',
    width: '100%',

    '& > :first-child': {
      color: config.palette.active,
      fontSize: '16px',
      fontWeight: 400,
    },

    '& > :last-child': {
      color: config.palette.newGreyScales['400'],
      fontSize: '16px',
      fontWeight: 300,
    },
  },

  titleAndSubtitleContainer: {
    display: 'flex',

    '& > :first-child': {
      color: config.palette.tertiary,
      fontSize: '16px',
      fontWeight: 500,
      marginBottom: '25px',
      marginRight: '40px',
      maxWidth: '420px',
      width: '100%',
    },

    '& > :last-child': {
      color: config.palette.newGreyScales['400'],
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '18px',
      marginBottom: '25px',
      maxWidth: '400px',
      width: '100%',
    },
  },

  /* 1.2.4 'Buttons' section */

  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  disabledOtherButtons: {
    backgroundColor: config.palette.background.default,
    border: `1px solid ${config.palette.label}`,
    borderRadius: `${config.dimensions.borderRadius}px`,
    color: `${config.palette.active} !important`,
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 500,
    marginLeft: '25px',
    opacity: 0.5,
    padding: '12px 21px',
    pointerEvents: 'none',
    textDecoration: 'none',
  },

  disabledRequestAccessButton: {
    backgroundColor: config.palette.primary,
    border: `1px solid ${config.palette.primary}`,
    borderRadius: `${config.dimensions.borderRadius}px`,
    color: `${config.palette.background.default} !important`,
    fontSize: '16px',
    fontWeight: 500,
    opacity: 0.5,
    padding: '12px 21px',
    pointerEvents: 'none',
    textDecoration: 'none',
  },

  disabledRevokeAccessButton: {
    backgroundColor: config.palette.warning,
    border: `1px solid ${config.palette.warning}`,
    borderRadius: `${config.dimensions.borderRadius}px`,
    color: `${config.palette.background.default} !important`,
    fontSize: '16px',
    fontWeight: 500,
    opacity: 0.5,
    padding: '12px 21px',
    pointerEvents: 'none',
    textDecoration: 'none',
  },

  enabledOtherButtons: {
    backgroundColor: config.palette.background.default,
    border: `1px solid ${config.palette.label}`,
    borderRadius: `${config.dimensions.borderRadius}px`,
    color: `${config.palette.active} !important`,
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 500,
    marginLeft: '25px',
    padding: '12px 21px',
    textDecoration: 'none',
  },

  enabledRequestAccessButton: {
    backgroundColor: config.palette.primary,
    border: `1px solid ${config.palette.primary}`,
    borderRadius: `${config.dimensions.borderRadius}px`,
    color: `${config.palette.background.default} !important`,
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 500,
    opacity: 1,
    padding: '12px 21px',
    textDecoration: 'none',
  },

  enabledRevokeAccessButton: {
    backgroundColor: config.palette.warning,
    border: `1px solid ${config.palette.warning}`,
    borderRadius: `${config.dimensions.borderRadius}px`,
    color: `${config.palette.background.default} !important`,
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 500,
    opacity: 1,
    padding: '12px 21px',
    textDecoration: 'none',
  },

  leftSideButtonsContainer: {
    display: 'flex',
    marginBottom: '50px',
    marginTop: '7.5px',
  },

  rightSideButtonsContainer: {
    display: 'flex',
    marginBottom: '50px',
    marginTop: '7.5px',
  },
}))
