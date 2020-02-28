import { makeStyles } from '@material-ui/styles'

export default makeStyles({
  container: {
    display: 'flex',
    borderStyle: 'solid',
    borderColor: '#E3E3E3',
    borderWidth: 1,
    borderRadius: 4,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 182,
    height: 114,
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderStyle: 'solid',
    borderColor: '#E3E3E3',
    borderTopWidth: 1,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  icon: {
    display: 'flex',
    width: '100%',
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  property: {
    display: 'flex',
    fontSize: 16,
    paddingTop: 10,
  },
  gray: {
    color: '#D1D1D1',
  },
  info: {
    fontSize: 12,
    lineHeight: '14px',
    '& a': {
      display: 'block',
      color: '#2DB7B9',
    },
    paddingBottom: 10,
  },
  entries: {
    fontSize: 22,
    paddingBottom: 10,
  },
  rightBorder: {
    borderStyle: 'solid',
    borderColor: '#E3E3E3',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRightWidth: 1,
    borderLeftWidth: 0,
  },
})
