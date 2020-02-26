import { makeStyles } from '@material-ui/styles'

export default makeStyles({
  root: {
    minHeight: '100%',
    paddingTop: 200,
    backgroundColor: '#E3E3E3',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    maxWidth: 900,
    margin: '0 auto',
    transform: 'translateX(-8px)',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 544,
  },
  actionsContainer: {
    display: 'flex',
    width: 300,
  },
  title: {
    fontSize: 26,
    fontWeight: 300,
  },
  description: {
    display: 'flex',
    textAlign: 'justify',
    paddingTop: 10,
    paddingBottom: 10,
  },
})
