import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'

export default makeStyles(({
  root: {
    minHeight: '100%',
    paddingTop: 200,
    backgroundColor: config.palette.background.default,
  },
  contentContainer: {
    maxWidth: 900,
    margin: '0 auto',
    transform: 'translateX(-8px)',
  },
  form: {
    display: 'flex',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    width: '65%',
  },
  aside: {
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100% - 65%)',
  },
  img: {
    width: 160,
    height: 160,
    borderRadius: '50%',
  },
  avatar: {
    fontSize: 26,
    fontWeight: 300,
    background: 'linear-gradient(270deg, #14BC7D 0%, #14DE2D 100%)',
    width: 160,
    height: 160,
  },
  textField: {
    '& label.Mui-focused': {
      color: config.palette.primary,
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: config.palette.greyScales[600],
      },
      '&.Mui-focused fieldset': {
        borderColor: config.palette.primary,
      },
    },
  },
  disabled: {
    opacity: 0.5,
    pointerEvents: 'none',
  },
  btn: {
    display: 'inline-block',
    color: 'white',
    padding: '8px 24px',
    borderRadius: config.dimensions.borderRadius,
    cursor: 'pointer',
    fontWeight: 500,
    marginRight: 16,
    marginTop: 36,
    width: '60%',
  },
  btn2: {
    backgroundColor: 'white',
    color: config.palette.greyScales[700],
    border: '1px solid ' + config.palette.greyScales[700],
  },
}))
