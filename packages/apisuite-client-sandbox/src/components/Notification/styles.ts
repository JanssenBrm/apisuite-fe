import { makeStyles } from '@material-ui/styles'
import { Theme } from 'themes/types'
import { colorPicker } from 'util/colorPicker'

export default makeStyles((theme: Theme) => ({
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
    borderRadius: theme.shape.borderRadius,
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
    backgroundColor: colorPicker(theme.palette.primary, 700, '#2DB7BA'),
    color: 'white',
  },
  error: {
    backgroundColor: theme.palette.error,
    color: 'white',
  },
}))
