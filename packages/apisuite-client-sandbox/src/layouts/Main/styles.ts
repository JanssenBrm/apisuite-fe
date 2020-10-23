import { makeStyles } from '@material-ui/styles'

export default makeStyles(({
  root: {},
  container: {
    '& .page-container': {
      padding: '40px 0 80px 0',
    },
  },
  contractible: {
    '& .page-container': {
      paddingTop: 300,
    },
  },
}))
