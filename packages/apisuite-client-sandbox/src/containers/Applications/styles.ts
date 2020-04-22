import { makeStyles } from '@material-ui/styles'
import { Theme } from 'themes/types'

export default makeStyles((theme: Theme) => ({
  root: {
    minHeight: '100%',
    paddingTop: 200,
    backgroundColor: theme.palette.background.default,
  },
  contentContainer: {
    maxWidth: 900,
    margin: '0 auto',
  },
}))
