import { makeStyles } from '@material-ui/styles'

export default makeStyles({
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 42,
    backgroundColor: 'white',
    paddingLeft: 10,
    borderBottomWidth: 0,
    borderTopWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#D1D1D1',
    borderStyle: 'solid',
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  apiName: {
    width: '50%',
  },
  apiVersion: {
    width: '25%',
  },
  apiApps: {
    display: 'flex',
    flexDirection: 'row',
    width: '25%',
  },
  icons: {
    display: 'flex',
    alignItems: 'center',
    width: 42,
    height: 42,
    color: '#646464',
  },
  avatarContainer: {
    width: 35,
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },
  avatar: {
    fontSize: 12,
    fontWeight: 300,
    background: 'linear-gradient(270deg, #14BC7D 0%, #14DE2D 100%)',
    width: 28,
    height: 28,
  },
})
