import styled from 'styled-components'
import { Overlay } from 'react-portal-overlay'
import { OverlayProps } from './overlay.types'
import { theme } from '../theme'

export const $Overlay = styled(Overlay)<OverlayProps>`
  &.overlay {
    display: flex;
    background-color: ${theme.palette.background.default};
    width: 100%;
    padding: 30px;
    flex-direction: column;
  }
`

export const $Nav = styled.div`
  top: 0;
  padding-top: 20px;
  background-color: ${theme.palette.background.default};
  display: flex;
  justify-content: flex-end;
  position: fixed;
  width: inherit;
  flex-direction: rows;

  &.transparent {
    background-color: transparent !important;
  }

  &.spaced {
    justify-content: space-between !important;
  }
`

export const $LogoContainer = styled.div`
  color: ${theme.palette.greyScales[900]};
  height: auto;
  display: flex;
  align-items: center;
  flex-direction: row;
`

export const $Logo = styled.div`
  color: ${theme.palette.primary};
  height: auto;
  margin-right: 20px;
  width: 60px;

  &.blank {
    color: #ffffff;
  }

  .big-logo {
    font-size: 4em;
  }
`

export const $Clickable = styled.div`
  color: ${theme.palette.newGreyScales[400]};
  display: flex;
  cursor: pointer;
  align-self: center;

  :hover {
    text-decoration: underline;
  }
`

export const $Close = styled.div`
  font-size: 0.9em;
  margin-right: 10px;
  align-self: center;
`

export const $Container = styled.div`
  margin-top: 50px;
  margin-bottom: 100px;
`
