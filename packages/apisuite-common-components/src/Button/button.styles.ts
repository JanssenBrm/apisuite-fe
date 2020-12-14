import { makeStyles } from '@material-ui/styles'
import { ButtonProps } from './button.types'
import { theme } from '../theme'

export default makeStyles({
  apisButton: {
    '&.MuiButton-contained': {
      backgroundColor: (props: ButtonProps) =>
        (props.btncolor === 'primary' && theme.palette.primary) ||
        (props.btncolor === 'secondary' && theme.palette.secondary) ||
        (props.btncolor === 'tertiary' && theme.palette.tertiary) ||
        (props.btncolor === 'warning' && theme.palette.warning) ||
        theme.palette.background.default,
      color: (props: ButtonProps) =>
        (props.btncolor === 'primary' && theme.palette.primaryContrastText) ||
        (props.btncolor === 'secondary' &&
          theme.palette.secondaryContrastText) ||
        (props.btncolor === 'tertiary' && theme.palette.tertiaryContrastText) ||
        (props.btncolor === 'warning' && theme.palette.primaryContrastText) ||
        theme.palette.newGreyScales[700],
      borderColor: (props: ButtonProps) =>
        (props.btncolor === 'primary' && theme.palette.primary) ||
        (props.btncolor === 'secondary' && theme.palette.secondary) ||
        (props.btncolor === 'tertiary' && theme.palette.tertiary) ||
        (props.btncolor === 'warning' && theme.palette.warning) ||
        theme.palette.newGreyScales[700],
    },

    '&:disabled': {
      '&.MuiButton-contained.Mui-disabled': {
        backgroundColor: theme.palette.newGreyScales['300'],
        cursor: 'default',
        opacity: '0.6',
      },
    },

    '&:hover': {
      '&.MuiButton-contained': {
        filter: 'brightness(90%)',
        backgroundColor: (props: ButtonProps) =>
          (props.btncolor === 'primary' && theme.palette.primary) ||
          (props.btncolor === 'secondary' && theme.palette.secondary) ||
          (props.btncolor === 'tertiary' && theme.palette.tertiary) ||
          (props.btncolor === 'warning' && theme.palette.warning) ||
          theme.palette.background.default,
      },
    },
  },
})
