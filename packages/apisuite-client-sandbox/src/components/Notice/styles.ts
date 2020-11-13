import { makeStyles } from '@material-ui/styles'

export default makeStyles({
  noticeContentsContainer: {
    backgroundColor: '#BBECFF',
    border: '1px solid #BBECFF',
    borderRadius: '4px',
    display: 'flex',
    padding: '12px',
    width: '100%',
  },

  noticeIcon: {
    alignItems: 'center',
    color: '#19B3EE',
    display: 'flex',
    justifyContent: 'center',
    marginRight: '10px',
  },

  noticeText: {
    '& > p': {
      color: '#035E86',
      fontSize: '14px',
      fontWeight: 400,

      '& > a': {
        textDecoration: 'none',
      },
    },
  },
})
