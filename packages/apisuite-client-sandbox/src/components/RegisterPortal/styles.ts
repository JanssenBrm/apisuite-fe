import { makeStyles } from '@material-ui/styles'
import { Theme } from 'themes/types'

const useStyles = makeStyles((theme: Theme) => ({
  registerContainer: {
    // zIndex: 1000,
    // position: 'fixed',
    width: '100%',
    height: '100%',
    // top: 0,
    // left: 0,
    // backgroundColor: '#2DB7BA',
  },
  content: {
    // display: 'flex',
    // position: 'relative',
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: '100%',
    // height: '100%',
  },
  emailTextfield: {
    backgroundColor: 'white',
    borderRadius: theme.shape,
    color: '#ACACAC',
    // height: '5px',
  },
  nameTextfield: {
    backgroundColor: 'white',
    borderRadius: theme.shape,
    color: '#ACACAC',
    // height: '5px',
  },
  passPhrasefield: {
    backgroundColor: 'white',
    borderRadius: theme.shape,
    color: '#ACACAC',
    // height: '5px',
  },
  passPhraseContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  fieldTitle: {
    margin: 0,
    color: 'white',
    fontSize: 14,
    fontWeight: 300,
  },
  fieldContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  shuffleIcon: {
    color: 'white',
  },
  visibilityIcon: {
    color: 'white',
  },
  alert: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '4px',
    backgroundColor: '#F2DEDE',
    border: 'solid',
    height: '25px',
    borderWidth: '1px',
    borderRadius: theme.shape,
    borderColor: '#A94442',
    color: '#A94442',
    fontSize: '13px',
    paddingLeft: 6,
    paddingRight: 6,
  },
  bigAlert: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '4px',
    backgroundColor: '#F2DEDE',
    border: 'solid',
    height: '40px',
    borderWidth: '1px',
    borderRadius: theme.shape,
    borderColor: '#A94442',
    color: '#A94442',
    fontSize: '13px',
    paddingLeft: 6,
    paddingRight: 6,
    lineHeight: '110%',
  },
}))

export default useStyles
