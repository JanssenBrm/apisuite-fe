import { makeStyles } from '@material-ui/styles'

export default makeStyles({
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 42,
    backgroundColor: '#EEEEEE',
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
    fontSize: 14,
  },
  apiName: {
    width: '35%',
  },
  apiVersion: {
    width: '25%',
    color: '#ACACAC',
  },
  apiApps: {
    display: 'flex',
    flexDirection: 'row',
    width: '25%',
  },
})
