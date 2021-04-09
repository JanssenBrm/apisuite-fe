import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

export default makeStyles(({
  container: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    margin: '36px 0 76px 0',
    position: 'relative',
    width: '100%',
  },

  progress: {
    height: '4px',
    width: '90px',
    '-webkit-appearance': 'none',
    '-moz-appearance': 'none',

    '&::-webkit-progress-bar': {
      backgroundColor: config.palette.primary,
      backgroundImage: config.palette.greyScales[100],
    },

    '&::-moz-progress-bar': {
      backgroundColor: config.palette.primary,
      backgroundImage: config.palette.greyScales[100],
    },
  },

  progressAfter: {
    '&::-webkit-progress-bar': {
      backgroundColor: config.palette.greyScales[100],
    },

    '&::-moz-progress-bar': {
      backgroundColor: config.palette.greyScales[100],
    },
  },

  progressCurrent: {
    '&::-webkit-progress-bar': {
      backgroundColor: config.palette.greyScales[100],
    },

    '&::-moz-progress-bar': {
      backgroundColor: config.palette.greyScales[100],
    },
  },

  stepCircle: {
    border: '3px solid ' + config.palette.greyScales[100],
    borderRadius: '50%',
    display: 'block',
    height: '20px',
    width: '20px',
  },

  stepCircleBefore: {
    border: '3px solid ' + config.palette.primary,
    color: config.palette.greyScales[500],
  },

  stepCircleCurrent: {
    fontWeight: 'bold',
  },

  stepProgress: {
    alignItems: 'center',
    display: 'flex',
  },

  stepTitle: {
    borderRadius: '50%',
    color: config.palette.greyScales[300],
    display: 'flex',
    fontSize: '14px',
    fontWeight: 'normal',
    height: '100%',
    lineHeight: '18px',
    position: 'absolute',
    textAlign: 'center',
    transform: 'translateY(24px) translateX(60px)',
    width: '80px',
  },

  stepTitleCurrent: {
    borderRadius: '50%',
    color: config.palette.tertiary,
    display: 'flex',
    fontSize: '14px',
    fontWeight: 'normal',
    height: '100%',
    lineHeight: '18px',
    position: 'absolute',
    textAlign: 'center',
    transform: 'translateY(24px) translateX(60px)',
    width: '80px',
  },
}))
