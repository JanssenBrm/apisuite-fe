import { makeStyles } from '@material-ui/styles'

export default makeStyles({
  table: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    cursor: 'pointer',
    borderRadius: 4,
    backgroundColor: 'white',
    overflow: 'hidden',
    borderStyle: 'solid',
    borderColor: '#D1D1D1',
    border: 1,
    borderTopWidth: 0,
    marginBottom: 50,
  },
  header: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 42,
    paddingLeft: 10,
    color: '#ACACAC',
  },
  actions: {
    paddingRight: 30,
  },
})
