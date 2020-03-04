import { makeStyles } from '@material-ui/styles'

export default makeStyles({
  root: {
    minHeight: '100%',
    paddingTop: 200,
    backgroundColor: '#E3E3E3',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    maxWidth: 900,
    margin: '0 auto',
    transform: 'translateX(-8px)',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 544,
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 300,
  },
  title: {
    fontSize: 26,
    fontWeight: 300,
  },
  description: {
    display: 'flex',
    textAlign: 'justify',
    paddingTop: 10,
    paddingBottom: 10,
  },
  navigation: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  btn: {
    display: 'flex',
    color: '#FFF',
    backgroundColor: '#2DB7BA',
    borderRadius: 4,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#64C5C7',
    },
  },
  heading: {
    display: 'flex',
    fontSize: 18,
    marginBottom: 10,
  },
  p1: {
    margin: 0,
  },
  a: {
    fontSize: 16,
    lineHeight: '14px',
    display: 'block',
    color: '#2DB7B9',
    paddingBottom: 15,
    textDecoration: 'underline',
  },
  actions: {
    fontSize: 12,
    marginTop: 20,
    marginBottom: 10,
    color: '#ACACAC',
  },
  sandboxCard: {
    display: 'flex',
    width: 300,
    height: 120,
    flexDirection: 'column',
    borderStyle: 'solid',
    borderColor: '#D1D1D1',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 21.58,
    backgroundColor: 'white',
    padding: 15,
  },
  cardTitle: {
    display: 'flex',
    alignSelf: 'flex-end',
    margin: 0,
    fontSize: 18,
  },
  cardInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 0,
    width: '100%',
  },
  units: {
    display: 'flex',
    alignSelf: 'flex-end',
    margin: 0,
    fontSize: 12,
    color: '#ACACAC',
  },
  unitsDays: {
    display: 'flex',
    fontSize: 26,
    color: '#14BC7D',
    margin: 0,
  },
  infoIcon: {
    color: '#14BC7D',
  },
})
