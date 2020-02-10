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
  },
  cards: {
    
  },
  apiCategoryContainer: {
    width: '100%',
  },
  apiTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 42,
    paddingLeft: 10,
    fontSize: 14,
    backgroundColor: '#EEEEEE',
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderColor: '#D1D1D1',
  },
})
