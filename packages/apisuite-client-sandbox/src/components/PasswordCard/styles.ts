import { makeStyles } from '@material-ui/styles'

export default makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderStyle: 'solid',
    borderColor: '#E3E3E3',
    borderWidth: 1,
    borderRadius: 4,
  },
  top: {
    display: 'flex',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderStyle: 'solid',
    borderColor: '#E3E3E3',
    borderBottomWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  bottom: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: 20,
  },
  iconsContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
  },
  text: {
    paddingLeft: 20,
    fontSize: 14,
    color: '#ACACAC',
  },
  text2: {
    fontSize: 12,
    color: '#ACACAC',
    paddingTop: 10,
  },
  icon: {
    padding: 0,
    margin: 0,
    height: 40,
    width: 40,
    borderStyle: 'solid',
    borderColor: '#E3E3E3',
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 1,
    borderTopWidth: 0,
    borderRadius: 0,
  },
  password: {
    height: 40,
  },
})
