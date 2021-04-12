import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

export default makeStyles(({
  content: {
    alignItems: 'center',
    borderRadius: `${config.dimensions.borderRadius}px`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },

  error: {
    backgroundColor: config.palette.feedback.error,
    color: config.palette.primaryContrastText,
  },

  icon: {
    alignItems: 'center',
    display: 'flex',
    fontSize: 24,
    marginRight: 10,
  },

  snackbar: {
    display: 'flex',
    margin: 8,
    position: 'relative',
  },

  success: {
    backgroundColor: config.palette.primary,
    color: config.palette.primaryContrastText,
  },

  text: {
    margin: 0,
  },
}))
