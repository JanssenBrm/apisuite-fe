import React, { FC } from 'react'
import {
  $Overlay,
  $Nav,
  $Logo,
  $LogoContainer,
  $Clickable,
  $Close,
  $Container,
} from './overlay.styles'
import { OverlayProps } from './overlay.types'
import CloseIcon from '@material-ui/icons/Close'
import AmpStoriesRoundedIcon from '@material-ui/icons/AmpStoriesRounded'

const Overlay: FC<OverlayProps> = ({
  children,
  showLogo,
  noTopBg,
  blankLogo,
  title,
  onClose,
  ...rest
}) => {
  return (
    <$Overlay className="overlay" {...rest}>
      <$Nav
        className={`${showLogo ? 'spaced' : ''} ${
          noTopBg ? 'transparent' : ''
        }`}
      >
        <$LogoContainer>
          {showLogo && (
            <>
              <$Logo className={`${blankLogo ? 'blank' : ''}`}>
                <AmpStoriesRoundedIcon className="big-logo" />
              </$Logo>
              {title}
            </>
          )}
        </$LogoContainer>
        <$Clickable onClick={() => onClose()}>
          <$Close>close</$Close>
          <CloseIcon />
        </$Clickable>
      </$Nav>
      <$Container>{children}</$Container>
    </$Overlay>
  )
}

export default Overlay
