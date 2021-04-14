import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

export default makeStyles({
  greetingCardButton: {
    backgroundColor: config.palette.tertiary,
    borderRadius: `${config.dimensions.borderRadius}px`,
    boxShadow: 'none',
    color: `${config.palette.tertiaryContrastText} !important`,
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: 600,
    padding: '12px 20px',
    position: 'relative',
    textAlign: 'center',
    textDecoration: 'none',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: config.palette.tertiary,
    },
  },

  greetingCardContentsContainer: {
    alignItems: 'center',
    backgroundColor: config.palette.background.default,
    borderRadius: `${config.dimensions.borderRadius}px`,
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
