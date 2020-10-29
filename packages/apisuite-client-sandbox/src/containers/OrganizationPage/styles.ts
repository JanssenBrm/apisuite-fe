import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'

export default makeStyles(({
  root: {
    minHeight: '100%',
    backgroundColor: config.palette.background.default,
  },
  contentContainer: {
    maxWidth: 900,
    margin: '0 auto',
    transform: 'translateX(-8px)',
    paddingBottom: 100,
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
    backgroundColor: '#333333',
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
    color: '#646464',
    border: '1px solid #646464',
  },
  errorPlaceholder: {
    display: 'flex',
    marginTop: 10,
    width: '70%',
  },
  errorAlert: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: config.palette.feedback.error,
    border: 'solid',
    borderWidth: 1,
    borderColor: config.palette.feedback.error,
    fontSize: 13,
    color: '#FFF',
    padding: '2px 15px',
    borderRadius: config.dimensions.borderRadius,
    minHeight: 20,
  },
}))
