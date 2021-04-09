import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

export default makeStyles(({
  actions: {
    paddingRight: 178,
  },

  auth: {
    color: config.palette.text.secondary,
    fontSize: 14,
  },

  btn: {
    backgroundColor: config.palette.greyScales[900],
    borderRadius: config.dimensions.borderRadius,
    color: config.palette.primaryContrastText,
    cursor: 'pointer',
    display: 'inline-block',
    fontWeight: 500,
    marginRight: 16,
    padding: '8px 24px',

    '&:disabled': {
      backgroundColor: config.palette.greyScales[400],
    },
  },

  contentContainer: {
    margin: '0 auto',
    maxWidth: 900,
    transform: 'translateX(-8px)',
  },

  emailTextfield: {
    backgroundColor: config.palette.background.default,
    borderRadius: config.dimensions.borderRadius,
    color: config.palette.greyScales[400],
    width: 220,
  },

  errorAlert: {
    alignItems: 'center',
    backgroundColor: config.palette.feedback.error,
    border: 'solid',
    borderColor: config.palette.feedback.error,
    borderRadius: config.dimensions.borderRadius,
    borderWidth: 1,
    color: config.palette.primaryContrastText,
    display: 'flex',
    fontSize: 13,
    minHeight: 20,
    padding: '2px 15px',
  },

  errorPlaceholder: {
    display: 'flex',
    marginTop: 10,
  },

  header: {
    alignItems: 'center',
    color: config.palette.greyScales[400],
    display: 'flex',
    flexDirection: 'row',
    height: 42,
    justifyContent: 'space-between',
    paddingLeft: 10,
    width: '100%',
  },

  inviteCard: {
    alignItems: 'center',
    backgroundColor: config.palette.background.default,
    border: 1,
    borderColor: config.palette.greyScales[300],
    borderRadius: config.dimensions.borderRadius,
    borderStyle: 'solid',
    cursor: 'pointer',
    display: 'flex',
    height: 82,
    justifyContent: 'space-between',
    marginTop: 24,
    overflow: 'hidden',
    padding: '12px 30px 12px 10px',
    width: '100%',
  },

  loading: {
    color: config.palette.primaryContrastText,
    opacity: 0.5,
    position: 'relative',
    top: 4,
  },

  loadingPage: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },

  name: {
    color: config.palette.text.primary,
    fontSize: 16,
  },

  nameTextfield: {
    backgroundColor: config.palette.background.default,
    borderRadius: config.dimensions.borderRadius,
    color: config.palette.greyScales[400],
    width: 220,
  },

  root: {
    backgroundColor: config.palette.greyScales[50],
    minHeight: '100%',
  },

  row: {
    borderTop: '1px solid ' + config.palette.greyScales[300],
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px 30px 16px 10px',
    width: '100%',
  },

  select: {
    width: 182,
  },

  table: {
    alignItems: 'center',
    backgroundColor: config.palette.background.default,
    border: 1,
    borderColor: config.palette.greyScales[300],
    borderRadius: config.dimensions.borderRadius,
    borderStyle: 'solid',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
  },

  title: {
    fontSize: 26,
    fontWeight: 300,
    marginBottom: 54,
  },
}))
