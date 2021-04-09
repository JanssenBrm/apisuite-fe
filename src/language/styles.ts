import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

export default makeStyles(({
  languageSelector: {
    backgroundColor: config.palette.newGreyScales['400'],
    borderColor: config.palette.newGreyScales['400'],
    borderRadius: `${config.dimensions.borderRadius}px`,
    color: `${config.palette.primaryContrastText} !important`,
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
      backgroundColor: config.palette.newGreyScales['400'],
    },

    '&:hover': {
      backgroundColor: config.palette.newGreyScales['400'],
    },

    '&::after': {
      content: 'none',
    },

    '&::before': {
      content: 'none',
    },
  },
}))
