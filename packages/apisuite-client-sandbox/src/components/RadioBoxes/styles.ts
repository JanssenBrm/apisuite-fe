import { makeStyles } from '@material-ui/styles'
import { Theme } from 'themes/types'

export default makeStyles((theme: Theme) => ({
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginTop: 8,
    marginBottom: 4,
  },
  controlWrapper: {
    border: '1px solid rgba(0,0,0,0.23)',
    marginRight: 8,
    paddingRight: 12,
    borderRadius: theme.shape,
    cursor: 'pointer',
  },
  controlLabel: {
    margin: 0,
  },
  unselected: {
    backgroundColor: '#EEEEEE',
    border: '1px solid #EEEEEE',
  },
  desc: {
    fontSize: 12,
    width: 234,
    lineHeight: '18px',
    color: '#8B8B8B',
    paddingLeft: 42,
    marginTop: 0,
    marginBottom: 24,
  },
}))
