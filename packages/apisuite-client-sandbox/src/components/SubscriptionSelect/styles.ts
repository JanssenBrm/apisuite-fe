import { makeStyles } from '@material-ui/styles'

export default makeStyles({
  subSelect: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  endAdornment: {
    display: 'flex',
  },
  chip: {
    display: 'flex',
    margin: 4,
    borderRadius: 3,
    background: 'linear-gradient(270deg, #2DB7BA 0%, #14DE2D 100%)',
  },
  chips: {
    display: 'flex',
    flexDirection: 'row',
  },
  loading: {
    color: 'white',
    opacity: 0.5,
  },
})
