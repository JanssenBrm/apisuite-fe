import { makeStyles } from '@material-ui/styles'
// import { config } from 'constants/global'

export default makeStyles(({
  root: {
    minHeight: '100%',
    paddingTop: 200,
    // backgroundColor: config.palette...,
    backgroundColor: 'white',
  },
  contentContainer: {
    maxWidth: 900,
    margin: '0 auto',
    transform: 'translateX(-8px)',
  },
  form: {
    display: 'flex',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    width: '65%',
  },
  aside: {
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100% - 65%)',
  },
  img: {
    width: 160,
    height: 160,
    borderRadius: '50%',
  },
}))
