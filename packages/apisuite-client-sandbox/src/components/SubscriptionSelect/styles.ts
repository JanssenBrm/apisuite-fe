import { makeStyles } from '@material-ui/styles'
import { Theme } from 'themes/types'
import { colorPicker } from 'util/colorPicker'

export default makeStyles((theme: Theme) => ({
  subSelect: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: colorPicker(theme.palette.grey, 400, '#ACACAC'),
  },
  dropdown: {
    display: 'flex',
    width: '100%',
    fontSize: 14,
    margin: 4,
    cursor: 'pointer',
  },
  chip: {
    display: 'flex',
    margin: 4,
    borderRadius: theme.shape.borderRadius,
    background: 'linear-gradient(270deg, #2DB7BA 0%, #14DE2D 100%)',
  },
  chips: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  loading: {
    color: 'white',
    opacity: 0.5,
  },
  icon: {
    cursor: 'pointer',
  },
}))
