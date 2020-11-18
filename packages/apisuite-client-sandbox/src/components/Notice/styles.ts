import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

export default makeStyles({
  noticeContentsContainer: {
    backgroundColor: config.palette.alert.success.background,
    border: `1px solid ${config.palette.alert.success.background}`,
    borderRadius: `${config.dimensions.borderRadius}px`,
    display: 'flex',
    padding: '12px',
    width: '100%',
  },

  noticeIcon: {
    alignItems: 'center',
    color: config.palette.info,
    display: 'flex',
    justifyContent: 'center',
    marginRight: '10px',
  },

  noticeText: {
    '& > p': {
      color: '#035E86',
      fontSize: '14px',
      fontWeight: 400,

      '& > a': {
        textDecoration: 'none',
      },
    },
  },
})
