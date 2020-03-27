import { makeStyles } from '@material-ui/styles'
import { Theme } from 'themes/types'
import { colorPicker } from 'util/colorPicker'

export default makeStyles((theme: Theme) => ({
  menuItem: {
    fontSize: 16,
    '& a': {
      textDecoration: 'none',
    },
    paddingBottom: 10,
    paddingLeft: 10,
    borderStyle: 'solid',
    borderLeftWidth: 1,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: colorPicker(theme.palette.grey, 500, '#8B8B8B'),
    color: theme.palette.text.primary,
    fontWeight: 500,
  },
  selected: {
    color: theme.palette.text.secondary,
    borderColor: colorPicker(theme.palette.primary, 700, '#2DB7BA'),
    borderLeftWidth: 3,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
}))
