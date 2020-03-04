import { makeStyles } from '@material-ui/styles'

export default makeStyles({
  root: {
    minHeight: '100%',
    paddingTop: 200,
    backgroundColor: 'white',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    maxWidth: 900,
    margin: '0 auto',
    transform: 'translateX(-8px)',
  },
  avatarContainer: {
    width: 200,
    height: 200,
    marginLeft: 40,
  },
  sideForm: {
    minWidth: 542,
    height: 275,
  },
  top: {
    display: 'flex',
    borderColor: '#E3E3E3',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  bottom: {
    display: 'flex',
    marginTop: 25,
  },
  info: {
    fontSize: 12,
    lineHeight: '14px',
    '& a': {
      display: 'block',
      color: '#2DB7B9',
    },
  },
  upload: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 160,
    height: 160,
    border: '1px dashed #646464',
    backgroundColor: '#E3E3E3',
    borderRadius: '50%',
    margin: '4px 0',
    opacity: 0.5,
  },
  uploadDesc: {
    width: 160,
    margin: 0,
    textAlign: 'center',
    opacity: 0.5,
  },
  btn: {
    display: 'inline-block',
    backgroundColor: '#333333',
    color: 'white',
    padding: '8px 24px',
    borderRadius: 4,
    cursor: 'pointer',
    fontWeight: 500,
    marginRight: 16,
  },
  btn2: {
    backgroundColor: 'white',
    color: '#646464',
    border: '1px solid #646464',
  },
  btn3: {
    minWidth: 120,
  },
  marginButtons: {
    marginBottom: 8,
    marginTop: 30,
  },
})
