import { makeStyles } from '@material-ui/styles'
import { Theme } from 'themes/types'
import { colorPicker } from 'util/colorPicker'

const useStyles = makeStyles((theme: Theme) => ({
  registerContainer: {
    width: '100%',
    height: '100%',
  },
  emailTextfield: {
    backgroundColor: 'white',
    borderRadius: theme.shape.borderRadius,
    color: colorPicker(theme.palette.grey, 400, '#ACACAC'),
  },
  nameTextfield: {
    backgroundColor: 'white',
    borderRadius: theme.shape.borderRadius,
    color: colorPicker(theme.palette.grey, 400, '#ACACAC'),
  },
  passPhrasefield: {
    backgroundColor: 'white',
    borderRadius: theme.shape.borderRadius,
    color: colorPicker(theme.palette.grey, 400, '#ACACAC'),
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
    paddingLeft: 10,
  },
  fieldTitle: {
    margin: 0,
    color: 'white',
    fontSize: 14,
    fontWeight: 300,
  },
  fieldContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  shuffleIcon: {
    color: 'white',
  },
  visibilityIcon: {
    color: 'white',
  },
}))

export default useStyles
