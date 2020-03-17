import { makeStyles } from '@material-ui/styles'

export default makeStyles({
  snackbar: {
    display: 'flex',
    position: 'relative',
    margin: 8,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 4,
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 24,
    marginRight: 10,
  },
  text: {
    margin: 0,
  },
  success: {
    backgroundColor: '#2DB7BA',
    color: 'white',
  },
  error: {
    backgroundColor: '#F59523',
    color: 'white',
  },
})
