import { makeStyles } from '@material-ui/styles'

export default makeStyles({
  menuItem: {
    fontSize: 16,
    '& a': {
      textDecoration: 'none',
    },
    paddingBottom: 10,
    paddingLeft: 10,
    borderStyle: 'solid',
    borderLeftWidth: 1,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: '#979797',
    color: '#545454',
    fontWeight: 500,
  },
  selected: {
    color: '#2DB7BA',
    borderColor: '#2DB7BA',
  },
})
