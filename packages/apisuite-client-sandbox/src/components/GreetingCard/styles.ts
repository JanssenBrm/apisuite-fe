import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

export default makeStyles({
  greetingCardContentsContainer: {
    alignItems: 'center',
    backgroundColor: config.palette.background.default,
    borderRadius: '4px',
    boxShadow: `0px 3px 10px -3px ${config.palette.newGreyScales['100']}`,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 'auto',
    maxWidth: '900px',
    padding: '20px 40px',
    width: '100%',
  },

  greetingCardText: {
    fontSize: '20px',
    fontWeight: 200,
    paddingRight: '20px',
    width: '625px',
  },
})
