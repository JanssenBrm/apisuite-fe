import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

const useStyles = makeStyles(({
  textField: {
    // Input's 'label'
    '& label': {
      color: config.palette.label,
    },

    '& label.Mui-focused': {
      color: config.palette.focus,
    },

    // Input's 'input' section
    '& div > input': {
      color: `${config.palette.active} !important`,
    },

    // Input's 'outline'
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: config.palette.greyScales[600],
      },

      '&.Mui-focused fieldset': {
        borderColor: config.palette.focus,
      },
    },
  },
}))

export default useStyles
