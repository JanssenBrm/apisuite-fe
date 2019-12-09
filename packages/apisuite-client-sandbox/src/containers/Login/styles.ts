import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles ({
    loginContainer: {
      zIndex: 1000,
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      backgroundColor: '#2DB7BA'
    },
    content: {
      display: 'flex',
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%'
    },
    emailTextfield: {
      backgroundColor: 'white',
      borderRadius: 4,
      color: '#ACACAC',
      height: '5px'
    },
    nameTextfield: {
      backgroundColor: 'white',
      borderRadius: 4,
      color: '#ACACAC',
      height: '5px'
    },
    passPhrasefield: {
      backgroundColor: 'white',
      borderRadius: 4,
      color: '#ACACAC',
      height: '5px'
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
      paddingLeft: 10
    },
    fieldTitle: {
      margin: 0,
      color: 'white',
      fontSize: 14,
      fontWeight: 300
    },
    fieldContainer: {
      marginTop: 20,
      marginBottom: 20 
    }
})

export default useStyles
