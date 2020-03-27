import { makeStyles } from '@material-ui/styles'
import { Theme } from 'themes/types'
import { colorPicker } from 'util/colorPicker'

export default makeStyles((theme: Theme) => ({
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 42,
    backgroundColor: theme.palette.background.default,
    paddingLeft: 10,
    borderBottomWidth: 0,
    borderTopWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: colorPicker(theme.palette.grey, 300, '#D1D1D1'),
    borderStyle: 'solid',
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    fontSize: 14,
  },
  apiName: {
    width: '35%',
  },
  apiVersion: {
    width: '25%',
    color: colorPicker(theme.palette.grey, 400, '#ACACAC'),
  },
  apiApps: {
    display: 'flex',
    flexDirection: 'row',
    width: '25%',
  },
}))
