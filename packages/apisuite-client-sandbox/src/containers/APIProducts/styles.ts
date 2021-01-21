import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

export default makeStyles(({
  latestAPIProductUpdateSection: {
    // First color is a fallback one - do not remove!
    background: '#7DD291 linear-gradient(270deg, rgba(125, 210, 145, 1) 0%, rgba(0, 125, 125, 1) 100%)',
    borderBottom: '4px solid rgba(20, 40, 60, 0.1)',
    height: '335px',
    marginBottom: '-280px',
    transform: 'translateY(-300px)',
    width: '100%',
  },
  latestAPIProductUpdateContainer: {
    display: 'flex',
    padding: '180px 60px 0px 60px',
  },
  latestAPIProductImage: {
    height: '185px',
    marginRight: '40px',
    width: '320px',
    /* The 'box-shadow' property was not generating the
    intended shadow, so 'filter' was used instead. */
    filter: 'drop-shadow(0px 5px 2.5px rgba(0, 0, 0, 0.25))',
  },
  latestAPIProductDetails: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '560px',
    width: '100%',
  },
  latestAPIProductTitle: {
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: 500,
  },
  apiProductNameAndVersion: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: '20px',
    marginTop: '-5px',
  },
  apiProductName: {
    color: '#FFFFFF',
    fontSize: '22px',
    fontWeight: 400,
    marginRight: '12px',
  },
  apiProductVersion: {
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: 400,
  },
  documentationAccess: {
    backgroundColor: '#51606E',
    borderRadius: '4px',
    padding: '4px 8px',
  },
  productionAccess: {
    backgroundColor: '#32C896',
    borderRadius: '4px',
    padding: '4px 8px',
  },
  sandboxAccess: {
    backgroundColor: '#19B3EE',
    borderRadius: '4px',
    padding: '4px 8px',
  },
  apiProductButtons: {
    display: 'flex',
    marginBottom: '12px',
  },
  viewDetailsButton: {
    backgroundColor: '#14283C',
    borderRadius: '4px',
    color: '#FFFFFF !important',
    fontSize: '16px',
    fontWeight: 500,
    marginRight: '12px',
    padding: '12px 20px',
    textDecoration: 'none',
  },
  subscribeButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: '4px',
    color: '#32C896 !important',
    fontSize: '16px',
    fontWeight: 500,
    padding: '12px 20px',
    textDecoration: 'none',
  },
  /* TODO: Temporary until we move on from the simplified API subscription model,
  where APIs are automatically associated to any and all apps. */
  disabledSubscribeButton: {
    color: '#51606E !important',
    padding: '12px 20px',
    fontSize: '16px',
    fontWeight: 500,
    borderRadius: '4px',
    textDecoration: 'none',
    backgroundColor: '#BAC0C6',
    pointerEvents: 'none',
  },
  apiProductStatusAndAccessType: {
    display: 'flex',
    // Access type
    '& > :last-child': {
      color: '#14283C',
      fontSize: '14px',
      fontWeight: 300,
      textAlign: 'left',
    },
  },
  apiProductOnlineStatus: {
    color: config.palette.primary,
    fontSize: '14px',
    marginRight: '12px',
  },
  apiProductOfflineStatus: {
    color: '#FFFFFF',
    fontSize: '14px',
    marginRight: '12px',
  },
  filtersContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  textFilter: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #BAC0C6',
    borderRadius: '4px',
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
    maxWidth: '325px',
    width: '100%',
    padding: '2.5px 12px',
    '& > :first-child': {
      fontSize: '16px',
      fontWeight: 300,
    },
    '& > :last-child': {
      color: '#BAC0C6',
    },
  },
  inactiveFilterButtonContainer: {
    border: '1px solid #BAC0C6',
    borderLeft: 'none',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    padding: '0px 6px',
    cursor: 'pointer',
  },
  activeFilterButtonContainer: {
    border: '1px solid #BAC0C6',
    borderLeft: 'none',
    backgroundColor: '#DCDFE3',
    display: 'flex',
    alignItems: 'center',
    padding: '0px 6px',
    cursor: 'pointer',
  },
  lastFilterButtonContainer: {
    borderTopRightRadius: '4px',
    borderBottomRightRadius: '4px',
  },
  inactiveFilterButtonIcon: {
    color: '#85909A',
  },
  activeProductionAccessFilterButtonIcon: {
    color: '#32C896',
  },
  activeSandboxAccessFilterButtonIcon: {
    color: '#19B3EE',
  },
  activeDocumentationAccessFilterButtonIcon: {
    color: '#51606E',
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
  allAPIProductsSection: {
    maxWidth: '900px',
    width: '100%',
    margin: '20px auto 0px auto',
  },
  retrievingAPIProductMessageContainer: {
    textAlign: 'center',

    '& > :first-child': {
      color: '#14283C',
      fontSize: '16px',
      fontWeight: 300,
    },
  },
}))
