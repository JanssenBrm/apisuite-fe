import React, { FC } from 'react'
import { Overlay } from 'react-portal-overlay'
import CloseIcon from '@material-ui/icons/Close'
import AmpStoriesRoundedIcon from '@material-ui/icons/AmpStoriesRounded'
import useStyles from './overlay.styles'
import { OverlayProps } from './overlay.types'

const $Overlay: FC<OverlayProps> = ({
  children,
  showLogo,
  noTopBg,
  blankLogo,
  title,
  onClose,
  ...rest
}) => {
  const classes = useStyles(rest)

  return (
    <Overlay className={classes.overlay} {...rest}>
      <div
        className={`${classes.nav} ${showLogo ? 'spaced' : ''} ${
          noTopBg ? 'transparent' : ''
        }`}
      >
        <div className={classes.logoContainer}>
          {showLogo && (
            <>
              <div className={`${classes.logo} ${blankLogo ? 'blank' : ''}`}>
                <AmpStoriesRoundedIcon className="big-logo" />
              </div>
              {title}
            </>
          )}
        </div>
        <div className={classes.clickable} onClick={() => onClose()}>
          <div className={classes.close}>close</div>
          <CloseIcon />
        </div>
      </div>
      <div className={classes.container}>{children}</div>
    </Overlay>
  )
}

export default $Overlay
