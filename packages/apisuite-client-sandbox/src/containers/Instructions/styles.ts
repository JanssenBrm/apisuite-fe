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
    width: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 100,
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
  },
  description: {
    display: 'flex',
    textAlign: 'justify',
    padding: 0,
    marginBottom: 20,
    marginTop: 0,
  },
  codeBlock: {
    borderRadius: 4,
  },
  noteContainer: {
    width: '100%',
    backgroundColor: '#00A7AA',
    borderRadius: 4,
    overflow: 'hidden',
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
})

export const codeStyle = {
  'hljs-comment': {
    'color': '#B6B18B',
  },
  'hljs-quote': {
    'color': '#B6B18B',
  },
  'hljs-variable': {
    'color': '#EB3C54',
  },
  'hljs-template-variable': {
    'color': '#EB3C54',
  },
  'hljs-tag': {
    'color': '#EB3C54',
  },
  'hljs-name': {
    'color': '#EB3C54',
  },
  'hljs-selector-id': {
    'color': '#EB3C54',
  },
  'hljs-selector-class': {
    'color': '#EB3C54',
  },
  'hljs-regexp': {
    'color': '#EB3C54',
  },
  'hljs-deletion': {
    'color': '#EB3C54',
  },
  'hljs-number': {
    'color': '#E7CE56',
  },
  'hljs-built_in': {
    'color': '#E7CE56',
  },
  'hljs-builtin-name': {
    'color': '#E7CE56',
  },
  'hljs-literal': {
    'color': '#E7CE56',
  },
  'hljs-type': {
    'color': '#E7CE56',
  },
  'hljs-params': {
    'color': '#E7CE56',
  },
  'hljs-meta': {
    'color': '#E7CE56',
  },
  'hljs-link': {
    'color': '#E7CE56',
  },
  'hljs-attribute': {
    'color': '#EE7C2B',
  },
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
  'hljs-title': {
    'color': '#78BB65',
  },
  'hljs-section': {
    'color': '#78BB65',
  },
  'hljs-keyword': {
    'color': '#B45EA4',
  },
  'hljs-selector-tag': {
    'color': '#B45EA4',
  },
  'hljs': {
    'display': 'block',
    'overflowX': 'auto',
    'background': '#333333',
    'font-family': 'Roboto, sans-serif',
    'font-size': '14px',
    'color': '#D8D8D8',
    'padding': '20px',
  },
  'hljs-emphasis': {
    'fontStyle': 'italic',
  },
  'hljs-strong': {
    'fontWeight': 'bold',
  },
}
