import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

const useStyles = makeStyles(({
  btnsContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 10,
  },

  emailTextfield: {
    backgroundColor: config.palette.background.default,
    borderRadius: config.dimensions.borderRadius,
    color: config.palette.greyScales[400],
  },

  fieldContainer: {
    marginBottom: 20,
    marginTop: 20,
  },

  fieldTitle: {
    color: config.palette.primaryContrastText,
    fontSize: 14,
    fontWeight: 300,
    margin: 0,
  },

  registerContainer: {
    height: '100%',
    width: '100%',
  },

  nameTextfield: {
    backgroundColor: config.palette.background.default,
    borderRadius: config.dimensions.borderRadius,
    color: config.palette.greyScales[400],
  },

  passPhrasefield: {
    backgroundColor: config.palette.background.default,
    borderRadius: config.dimensions.borderRadius,
    color: config.palette.greyScales[400],
  },

  passPhraseContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },

  shuffleIcon: {
    color: config.palette.primaryContrastText,
  },

  visibilityIcon: {
    color: config.palette.primaryContrastText,
  },
}))

export default useStyles
