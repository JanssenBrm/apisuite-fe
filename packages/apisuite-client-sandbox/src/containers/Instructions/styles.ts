import { makeStyles } from '@material-ui/styles'

export default makeStyles({
  root: {
    minHeight: '100%',
    paddingTop: 200,
    backgroundColor: '#E3E3E3',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    maxWidth: 900,
    margin: '0 auto',
    transform: 'translateX(-8px)',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 100,
    width: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    width: 688,
  },
  navigation: {
    display: 'flex',
    flexDirection: 'column',
    width: 300,
  },
  title: {
    fontSize: 26,
    fontWeight: 300,
  },
  stepTitle: {
    fontSize: 20,
    marginTop: -170,
    paddingTop: 170,
  },
  description: {
    display: 'flex',
    textAlign: 'justify',
    padding: 0,
    marginBottom: 20,
    marginTop: 0,
  },
  stepContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  codeBlock: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  noteContainer: {
    width: '100%',
    backgroundColor: '#00A7AA',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 20,
  },
  noteTitle: {
    fontSize: 16,
    color: 'black',
    fontWeight: 400,
  },
  note: {
    fontSize: 14,
    color: 'white',
  },
  noteContent: {
    backgroundColor: '#2DB7BA',
    padding: 20,
    marginLeft: 5,
  },
  iconRow: {
    display: 'flex',
    color: 'white',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#333333',
    height: 40,
    marginTop: 0,
    paddingLeft: 20,
    paddingRight: 20,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  clipboardIcon: {
    cursor: 'pointer',
    '&:hover': {
      color: '#2DB7BA',
    },
    zIndex: 1,
  },
  sideMenuContainer: {
    paddingLeft: 40,
    position: 'sticky',
    top: 180,
  },
})

export const codeStyle = {
  'hljs-string': {
    'color': '#2DB7BA',
  },
  'hljs-symbol': {
    'color': '#2DB7BA',
  },
  'hljs-bullet': {
    'color': '#2DB7BA',
  },
  'hljs-addition': {
    'color': '#2DB7BA',
  },
  'hljs': {
    display: 'block',
    overflowX: 'auto',
    background: '#333333',
    fontFamily: 'Roboto, sans-serif',
    fontSize: 14,
    color: '#D8D8D8',
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },
  'hljs-emphasis': {
    fontStyle: 'italic',
  },
  'hljs-strong': {
    fontWeight: 'bold',
  },
}
