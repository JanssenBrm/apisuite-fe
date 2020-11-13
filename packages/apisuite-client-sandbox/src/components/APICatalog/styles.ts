import { makeStyles } from '@material-ui/styles'

export default makeStyles({
  apiCatalogEntry: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #BAC0C6',
    borderRadius: '4px',
    display: 'flex',
    height: '215px',
    marginBottom: '20px',
    width: '440px',
  },

  apiCatalogEntryAvatar: {
    padding: '24px 18px 24px 24px',
    width: '110px',

    '& > div': {
      height: '60px',
      margin: 'auto',
      width: '60px',
    },
  },

  apiCatalogEntryName: {
    color: '#14283C',
    fontSize: '22px',
    fontWeight: 400,
    marginBottom: '8px',
  },

  apiCatalogEntryText: {
    padding: '32px 0px 0px 0px',
    width: '310px',

    '& > div': {
      height: '60px',
      width: '60px',
    },
  },

  apiCatalogEntryDescription: {
    color: '#85909A',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '20px',
  },

  apiCatalogEntryVersion: {
    borderRadius: '4px',
    marginRight: '8px',
    padding: '5px 10px',
  },

  apiCatalogEntryVersionAndAccess: {
    color: '#85909A',
    fontSize: '14px',
    fontWeight: 400,
    marginBottom: '8px',
  },

  colorsOfAPIDocumentation: {
    backgroundColor: '#51606E',
    color: '#FFFFFF',
  },

  colorsOfProductionAPI: {
    backgroundColor: '#19B3EE',
    color: '#FFFFFF',
  },

  colorsOfSandboxAPI: {
    backgroundColor: '#32C896',
    color: '#FFFFFF',
  },
})
