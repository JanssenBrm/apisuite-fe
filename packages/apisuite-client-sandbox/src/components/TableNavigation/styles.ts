import { makeStyles } from '@material-ui/styles'

export default makeStyles({
  container: {
    display: 'flex',
    backgroundColor: 'white',
    overflow: 'hidden',
    borderStyle: 'solid',
    borderColor: '#D1D1D1',
    borderWidth: 1,
    borderRadius: 4,
  },
  page: {
    display: 'flex',
    borderStyle: 'solid',
    borderColor: '#D1D1D1',
    borderRadius: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRightWidth: 1,
  },
  labelLeft: {
    display: 'flex',
    textTransform: 'none',
    borderStyle: 'solid',
    borderColor: '#D1D1D1',
    borderRadius: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRightWidth: 1,
  },
  labelRight: {
    display: 'flex',
    textTransform: 'none',
  },
})
