import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

export default makeStyles(({
  activeDocumentationAccessFilterButtonIcon: {
    color: config.palette.active,
  },

  activeFilterButtonContainer: {
    alignItems: 'center',
    backgroundColor: '#DCDFE3',
    border: `1px solid ${config.palette.label}`,
    borderLeft: 'none',
    cursor: 'pointer',
    display: 'flex',
    padding: '0px 6px',
  },

  activeProductionAccessFilterButtonIcon: {
    color: config.palette.primary,
  },

  activeSandboxAccessFilterButtonIcon: {
    color: config.palette.secondary,
  },

  allAPIProductsSection: {
    margin: '20px auto 0px auto',
    maxWidth: '900px',
    width: '100%',
  },

  apiCatalogContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  apiCatalogSectionContainer: {
    display: 'block',
    margin: '40px auto -40px auto',
    maxWidth: '900px',
    width: '100%',
  },

  apiProductButtons: {
    display: 'flex',
    height: '40px',
    marginBottom: '6px',
  },

  apiProductName: {
    color: config.palette.background.default,
    fontSize: '22px',
    fontWeight: 400,
    marginRight: '12px',
  },

  apiProductNameAndVersion: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: '12px',
    marginTop: '-5px',
  },

  apiProductOfflineStatus: {
    color: config.palette.background.default,
    fontSize: '14px',
    marginRight: '12px',
  },

  apiProductOnlineStatus: {
    color: config.palette.primary,
    fontSize: '14px',
    marginRight: '12px',
  },

  apiProductStatusAndAccessType: {
    display: 'flex',

    // Access type
    '& > :last-child': {
      color: config.palette.tertiary,
      fontSize: '14px',
      fontWeight: 300,
      textAlign: 'left',
    },
  },

  apiProductVersion: {
    color: config.palette.background.default,
    fontSize: '14px',
    fontWeight: 400,
  },

  documentationAccess: {
    backgroundColor: config.palette.active,
    borderRadius: `${config.dimensions.borderRadius}px`,
    padding: '4px 8px',
  },

  filtersContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  inactiveFilterButtonContainer: {
    alignItems: 'center',
    backgroundColor: config.palette.background.default,
    border: `1px solid ${config.palette.label}`,
    borderLeft: 'none',
    cursor: 'pointer',
    display: 'flex',
    padding: '0px 6px',
  },

  inactiveFilterButtonIcon: {
    color: config.palette.newGreyScales['400'],
  },

  lastFilterButtonContainer: {
    borderBottomRightRadius: '4px',
    borderTopRightRadius: '4px',
  },

  latestAPIProductDetails: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '560px',
    width: '100%',
  },

  latestAPIProductImage: {
    /* The 'box-shadow' property was not generating the
    intended shadow, so 'filter' was used instead. */
    filter: 'drop-shadow(0px 5px 2.5px rgba(0, 0, 0, 0.25))',
    height: '185px',
    marginRight: '40px',
    width: '320px',
  },

  latestAPIProductTitle: {
    color: config.palette.background.default,
    fontSize: '16px',
    fontWeight: 500,
  },

  latestAPIProductUpdateContainer: {
    display: 'flex',
    padding: '180px 60px 0px 60px',
  },

  latestAPIProductUpdateSection: {
    // First color is a fallback one - do not remove!
    background: '#7DD291 linear-gradient(270deg, rgba(125, 210, 145, 1) 0%, rgba(0, 125, 125, 1) 100%)',
    borderBottom: '4px solid rgba(20, 40, 60, 0.1)',
    height: '335px',
    marginBottom: '-280px',
    transform: 'translateY(-300px)',
    width: '100%',
  },

  productionAccess: {
    backgroundColor: config.palette.primary,
    borderRadius: `${config.dimensions.borderRadius}px`,
    padding: '4px 8px',
  },

  retrievingAPIProductMessageContainer: {
    textAlign: 'center',

    '& > :first-child': {
      color: config.palette.tertiary,
      fontSize: '16px',
      fontWeight: 300,
    },
  },

  sandboxAccess: {
    backgroundColor: config.palette.secondary,
    borderRadius: `${config.dimensions.borderRadius}px`,
    padding: '4px 8px',
  },

  subscribeButton: {
    backgroundColor: config.palette.background.default,
    borderRadius: `${config.dimensions.borderRadius}px`,
    color: `${config.palette.primary} !important`,
    fontSize: '16px',
    fontWeight: 500,
    padding: '12px 20px',
    textDecoration: 'none',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: config.palette.background.default,
    },
  },

  textFilter: {
    backgroundColor: config.palette.background.default,
    border: `1px solid ${config.palette.label}`,
    borderBottomRightRadius: '0px',
    borderRadius: `${config.dimensions.borderRadius}px`,
    borderTopRightRadius: '0px',
    maxWidth: '325px',
    padding: '2.5px 12px',
    width: '100%',

    '& > :first-child': {
      fontSize: '16px',
      fontWeight: 300,
    },

    '& > :last-child': {
      color: config.palette.label,
    },
  },

  viewDetailsButton: {
    backgroundColor: config.palette.tertiary,
    borderRadius: `${config.dimensions.borderRadius}px`,
    color: `${config.palette.primaryContrastText} !important`,
    fontSize: '16px',
    fontWeight: 500,
    marginRight: '12px',
    padding: '12px 20px',
    textDecoration: 'none',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: config.palette.tertiary,
    },
  },
}))
