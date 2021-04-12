import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'

export default makeStyles(({
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginTop: 8,
    marginBottom: 4,
  },
  controlWrapper: {
    border: `1px solid ${config.palette.greyScales[900]}`,
    borderRadius: `${config.dimensions.borderRadius}px`,
    cursor: 'pointer',
    marginRight: 8,
    paddingRight: 12,
  },
  controlLabel: {
    margin: 0,
  },
  unselected: {
    backgroundColor: config.palette.greyScales[50],
    border: `1px solid ${config.palette.greyScales[50]}`,
  },
  desc: {
    fontSize: 12,
    width: 234,
    lineHeight: '18px',
    color: config.palette.greyScales[500],
    paddingLeft: 42,
    marginTop: 0,
    marginBottom: 24,
  },
}))
