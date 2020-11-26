import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'

export default makeStyles(({
  root: {
    backgroundColor: config.palette.background.default,
    minHeight: '100%',
  },

  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: '0 auto',
    maxWidth: 900,
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
    marginBottom: 20,
    marginTop: 0,
    padding: 0,
    textAlign: 'justify',
  },

  stepContainer: {
    marginBottom: 20,
    marginTop: 20,
  },

  codeBlock: {
    borderBottomLeftRadius: config.dimensions.borderRadius,
    borderBottomRightRadius: config.dimensions.borderRadius,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },

  noteContainer: {
    backgroundColor: config.palette.secondary,
    borderRadius: config.dimensions.borderRadius,
    marginBottom: 20,
    overflow: 'hidden',
    width: '100%',
  },

  noteTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: 400,
  },

  note: {
    color: 'white',
    fontSize: 14,
  },

  noteContent: {
    backgroundColor: config.palette.primary,
    marginLeft: 5,
    padding: 20,
  },

  iconRow: {
    alignItems: 'flex-end',
    backgroundColor: config.palette.text.primary,
    color: 'white',
    display: 'flex',
    height: 40,
    justifyContent: 'flex-end',
    marginTop: 0,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: config.dimensions.borderRadius,
    borderTopLeftRadius: config.dimensions.borderRadius,
  },

  clipboardIcon: {
    cursor: 'pointer',
    zIndex: 1,

    '&:hover': {
      color: config.palette.primary,
    },
  },

  sideMenuContainer: {
    paddingLeft: 40,
    position: 'sticky',
    top: 180,
  },
}))

export const codeStyle = {
  'hljs-string': {
    'color': config.palette.primary,
  },

  'hljs-symbol': {
    'color': config.palette.primary,
  },

  'hljs-bullet': {
    'color': config.palette.primary,
  },

  'hljs-addition': {
    'color': config.palette.primary,
  },

  'hljs': {
    background: config.palette.text.primary,
    color: '#D8D8D8',
    display: 'block',
    fontFamily: 'Roboto, sans-serif',
    fontSize: 14,
    marginTop: 0,
    overflowX: 'auto',
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 0,
  },

  'hljs-emphasis': {
    fontStyle: 'italic',
  },

  'hljs-strong': {
    fontWeight: 'bold',
  },
}
