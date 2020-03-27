import { makeStyles } from '@material-ui/styles'
import { Theme } from 'themes/types'
import { colorPicker } from 'util/colorPicker'

export default makeStyles((theme: Theme) => ({
  authPage: {
    backgroundColor: theme.palette.common.white,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    zInndex: 10000,
  },
  authLeftWrapper: {
    flex: 1,
  },
  authRightWrapper: {
    flex: 1,
    backgroundColor: colorPicker(theme.palette.primary, 900, '#035E86'),
  },
  contentWrapper: {
    flexBasis: 1170,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
  },
  authContentRight: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: colorPicker(theme.palette.primary, 900, '#035E86'),
  },
  authContentLeft: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
}))
