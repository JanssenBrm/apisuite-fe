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
    marginRight: '12px',
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
  },

  dialogText: {
    color: '#2F4152',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '20px',
  },

  dialogSubText: {
    color: config.palette.newGreyScales['400'],
    fontSize: '14px',
    fontWeight: 300,
    lineHeight: '20px',
  },

  dialogTitleContainer: {
    alignItems: 'center',
    backgroundColor: config.palette.newGreyScales['25'],
    display: 'flex',
    padding: '15px 25px',

    // Dialog's optional title icon
    '& > :first-child': {
      marginRight: '10px',
    },

    // Dialog's title
    '& > :last-child': {
      color: config.palette.tertiary,
      fontSize: '24px',
      fontWeight: 500,
      padding: '0px',
    },
  },

  dialogTitleInfoIcon: {
    color: '#46B5EF',
  },

  dialogTitleWarningIcon: {
    color: config.palette.warning,
  },
})

export default useStyles
