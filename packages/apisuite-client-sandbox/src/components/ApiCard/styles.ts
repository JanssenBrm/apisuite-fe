import { makeStyles } from '@material-ui/styles'

export default makeStyles({
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 438,
    width: 289,
    backgroundColor: 'white',
    borderRadius: 4,
    borderStyle: 'solid',
    borderColor: '#D1D1D1',
    borderWidth: 1,
    overflow: 'hidden',
  },
  apiDetail: {
    height: '100%',
    padding: 15,
  },
  cardTitle: {
    fontSize: 22,
    margin: 0,
  },
  description: {
    fontSize: 16,
  },
  appsContainer: {
    display: 'flex',
    flexDirection: 'row',
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
  apiCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 36,
    padding: 15,
    backgroundColor: '#EEEEEE',
    borderTopWidth: 1,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderStyle: 'solid',
    borderColor: '#D1D1D1',
  },
})
