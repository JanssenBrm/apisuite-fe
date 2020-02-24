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
    maxWidth: 900,
    margin: '0 auto',
    transform: 'translateX(-8px)',
  },
  tableContainer: {
    display: 'flex',
    width: 544,
    height: 674,
  },
  actionsContainer: {
    display: 'flex',
    width: 300,
    height: 546,
  },
})
