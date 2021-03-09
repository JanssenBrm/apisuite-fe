import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

const useStyles = makeStyles(({
  textField: {
    '& label.Mui-focused': {
      color: `${config.palette.primary} !important`,
    },

    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: `${config.palette.greyScales['300']} !important`,
      },

      '&.Mui-focused fieldset': {
        borderColor: `${config.palette.primary} !important`,
      },
    },
  },
}))

export default useStyles
