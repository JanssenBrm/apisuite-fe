import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

const useStyles = makeStyles({
  cancelButton: {
    backgroundColor: config.palette.background.default,
    border: `1px solid ${config.palette.label}`,
    borderRadius: `${config.dimensions.borderRadius}px`,
    color: `${config.palette.active} !important`,
    fontSize: '16px',
    fontWeight: 500,
    marginRight: '24px',
    padding: '6px 21px',
    textDecoration: 'none',
    textTransform: 'none',
    width: 'auto',

    '&:hover': {
      backgroundColor: config.palette.background.default,
    },
  },

  confirmButton: {
    backgroundColor: config.palette.error,
    border: `1px solid ${config.palette.error}`,
    borderRadius: config.dimensions.borderRadius,
    color: `${config.palette.primaryContrastText} !important`,
    fontSize: '16px',
    fontWeight: 500,
    padding: '6px 21px',
    textDecoration: 'none',
    textTransform: 'none',
    width: 'auto',

    '&:hover': {
      backgroundColor: config.palette.error,
    },
  },

  dialogActionsContainer: {
    display: 'flex',
    padding: '0px 24px 20px 24px',
  },

  dialogContentContainer: {
    padding: '20px 24px',

    '& > :first-child': {
      color: config.palette.newGreyScales['400'],
      fontSize: '16px',
      fontWeight: 400,
    },
  },

  dialogTitleContainer: {
    backgroundColor: config.palette.newGreyScales['100'],

    '& > :first-child': {
      color: config.palette.tertiary,
      fontSize: '24px',
      fontWeight: 500,
    },
  },
})

export default useStyles
