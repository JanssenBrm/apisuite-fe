import { makeStyles } from '@material-ui/styles'

export default makeStyles({
  root: {
    minHeight: '100%',
    paddingTop: 200,
    backgroundColor: '#E3E3E3',
  },
  contentContainer: {
    maxWidth: 900,
    margin: '0 auto',
    transform: 'translateX(-8px)',
  },
  title: {
    fontSize: 26,
    fontWeight: 300,
  },
  subscriptionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 100,
  },
  description: {
    display: 'flex',
    paddingTop: 10,
    paddingBottom: 10,
  },
  viewRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  viewIconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: 42,
    height: 42,
    color: '#646464',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#D1D1D1',
    borderStyle: 'solid',
    cursor: 'pointer',
  },
})
