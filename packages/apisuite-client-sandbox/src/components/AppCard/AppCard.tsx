import * as React from 'react'
import clsx from 'clsx'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import SvgIcon from 'components/SvgIcon'

import useStyles from './styles'
import { AppCardProps } from './types'

const AppCard: React.FC<AppCardProps> = ({ addVariant = false, name, className, ...rest }) => {
  const classes = useStyles()

  if (addVariant) {
    return (
      <div className={clsx(classes.card, classes.cardAdd, className)} {...rest}>
        <SvgIcon name='plus' size={40} />
      </div>
    )
  }

  const splitName = name.split(' ')
  const initials = splitName.length >= 2
    ? `${splitName[0].charAt(0)}${splitName[1].charAt(0)}` : splitName[0].slice(0, 2)

  const [anchorEl, setAnchorEl] = React.useState(null)

  function handleMenuClick (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation()

    setAnchorEl((event as any).currentTarget)
  }

  function handleClose (event: any) {
    event.stopPropagation()

    setAnchorEl(null)
  }

  return (

    <div className={clsx(classes.card, className)} {...rest}>
      <Avatar className={classes.avatar}>{initials.toLocaleUpperCase()}</Avatar>

      <div className={classes.actions}>
        <div className={classes.actionsInfo}>
          <h1 className={classes.title}>{name}</h1>
          <div className={classes.caption}>
            <SvgIcon name='circle' color='#2DB7B9' size={12} style={{ display: 'inline-block' }} />
            &nbsp;&nbsp;
            <span>Sandbox Access</span>
          </div>
        </div>

        <IconButton size='small' onClick={handleMenuClick}>
          <SvgIcon name='dots-vrtical' size={24} />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>App details</MenuItem>
          <MenuItem onClick={handleClose}>Open in console</MenuItem>
          <MenuItem onClick={handleClose}>View activity</MenuItem>
          <MenuItem onClick={handleClose}>Remove</MenuItem>
        </Menu>
      </div>
    </div>
  )
}

export default AppCard
