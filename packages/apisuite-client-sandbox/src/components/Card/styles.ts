import { makeStyles } from '@material-ui/styles'

export default makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'flex-end',
    marginBottom: 15,
    marginTop: 5,
    paddingBottom: 10,
    overflow: 'hidden',
    borderStyle: 'solid',
    borderColor: '#D1D1D1',
    borderWidth: 1,
    borderRadius: 4,
  },
  top: {
    display: 'flex',
    width: '100%',
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: '15%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    display: 'flex',
    fontSize: 12,
    width: '85%',
    paddingRight: 15,
  },
  title: {
    display: 'flex',
    fontSize: 16,
    width: '85%',
  },
})
