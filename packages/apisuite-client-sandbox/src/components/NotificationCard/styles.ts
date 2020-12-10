import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

export default makeStyles({
  notificationCardCloseButton: {
    color: config.palette.newGreyScales['300'],
    height: '24px',
    width: '24px',
  },

  notificationCardContentsContainer: {
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

  notificationCardText: {
    color: config.palette.newGreyScales['400'],
    fontSize: '20px',
    fontWeight: 300,
    maxWidth: '542.5px',
    width: '100%',
  },

  notificationCardTitle: {
    color: config.palette.tertiary,
    fontSize: '27px',
    fontWeight: 400,
    marginBottom: '12px',
    maxWidth: '542.5px',
    width: '100%',
  },
})
