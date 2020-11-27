import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { $ButtonProps } from './button.types'
import { theme } from '../theme'

export const $Button = styled(Button)<$ButtonProps>`
  &.MuiButton-contained {
    background-color: ${({ btncolor }) =>
      (btncolor === 'primary' && theme.palette.primary) ||
      (btncolor === 'secondary' && theme.palette.secondary) ||
      (btncolor === 'tertiary' && theme.palette.tertiary) ||
      (btncolor === 'warning' && theme.palette.warning) ||
      theme.palette.background.default};
    color: ${({ btncolor }) =>
      (btncolor === 'primary' && theme.palette.primaryContrastText) ||
      (btncolor === 'secondary' && theme.palette.secondaryContrastText) ||
      (btncolor === 'tertiary' && theme.palette.tertiaryContrastText) ||
      theme.palette.newGreyScales[700]};
    border-color: ${({ btncolor }) =>
      (btncolor === 'primary' && theme.palette.primary) ||
      (btncolor === 'secondary' && theme.palette.secondary) ||
      (btncolor === 'tertiary' && theme.palette.tertiary) ||
      (btncolor === 'warning' && theme.palette.warning) ||
      theme.palette.newGreyScales[700]};
  }

  :disabled {
    &.MuiButton-contained.Mui-disabled {
      background-color: ${theme.palette.newGreyScales['300']};
      cursor: default;
      opacity: 0.6;
      boxshadow: '0 2px 5px 0 rgba(0,0,0,0.05) !important';
    }
  }

  :hover {
    &.MuiButton-contained {
      boxshadow: '0 4px 6px 0 rgba(0,0,0,0.35) !important';
      background-color: ${({ btncolor }) =>
        (btncolor === 'primary' && theme.palette.primary) ||
        (btncolor === 'secondary' && theme.palette.secondary) ||
        (btncolor === 'tertiary' && theme.palette.tertiary) ||
        (btncolor === 'warning' && theme.palette.warning) ||
        theme.palette.background.default};
    }
  }
`
