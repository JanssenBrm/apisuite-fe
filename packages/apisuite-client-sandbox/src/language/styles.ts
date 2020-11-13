import { makeStyles } from '@material-ui/styles'

export default makeStyles(({
  languageSelector: {
    backgroundColor: '#85909A',
    borderColor: '#85909A',
    borderRadius: '4px',
    color: '#FFFFFF !important',
    fontSize: '14px',
    fontWeight: 300,
    overflow: 'hidden !important',
    padding: '5px 0px',
    position: 'relative',
    textIndent: '10px',
    textOverflow: 'ellipsis',
    textTransform: 'none',
    whiteSpace: 'nowrap',
    width: '180px',

    '&:disabled': {
      backgroundColor: '#85909A',
    },

    '&:hover': {
      backgroundColor: '#85909A',
    },

    '&::after': {
      content: 'none',
    },

    '&::before': {
      content: 'none',
    },
  },
}))
