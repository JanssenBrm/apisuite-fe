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
  avatar: {
    fontSize: 26,
    fontWeight: 300,
    background: 'linear-gradient(270deg, #14BC7D 0%, #14DE2D 100%)',
    //  background: 'linear-gradient config',
    width: 124,
    height: 124,
  },
}))
