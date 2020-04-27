import { makeStyles } from '@material-ui/styles'
import { Theme } from 'themes/types'
import { colorPicker } from 'util/colorPicker'

export default makeStyles((theme: Theme) => ({
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginTop: 8,
    marginBottom: 4,
  },
  controlWrapper: {
    border: `1px solid ${colorPicker(theme.palette.grey, 900, '#131313')}`,
    marginRight: 8,
    paddingRight: 12,
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
  },
  controlLabel: {
    margin: 0,
  },
  unselected: {
    backgroundColor: colorPicker(theme.palette.grey, 50, '#EEEEEE'),
    border: `1px solid ${colorPicker(theme.palette.grey, 50, '#EEEEEE')}`,
  },
  desc: {
    fontSize: 12,
    width: 234,
    lineHeight: '18px',
    color: colorPicker(theme.palette.grey, 500, '#8B8B8B'),
    paddingLeft: 42,
    marginTop: 0,
    marginBottom: 24,
  },
}))
