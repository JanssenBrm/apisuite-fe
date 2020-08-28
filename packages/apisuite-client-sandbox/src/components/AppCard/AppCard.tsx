import * as React from 'react'
import clsx from 'clsx'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import SvgIcon from 'components/SvgIcon'

import useStyles from './styles'
import { AppCardProps } from './types'
import CustomizableDialog from 'components/CustomizableDialog/CustomizableDialog'

const AppCard: React.FC<AppCardProps> = (
  { history, addVariant = false, deleteApp, appId, userId, name, className, ...rest }) => {
  const classes = useStyles()
  const [openDialog, setOpenDialog] = React.useState(false)

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

  function handleClose (event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    event.stopPropagation()

    setAnchorEl(null)
  }

  function handleVoid (event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    event.stopPropagation()
  }

  function handleOpenDialog () {
    setOpenDialog(true)
  }

  function handleCloseDialog () {
    setAnchorEl(null)

    setOpenDialog(false)
  }

  function handleDelete () {
    if (appId && userId) {
      deleteApp(appId, userId)
    }

    handleCloseDialog()
  }

  function handleOpenApp (event: React.MouseEvent<HTMLElement, MouseEvent>) {
    event.stopPropagation()

    if (history) {
      history.push(`/dashboard/apps/detail/${appId}`)
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className={clsx(classes.card, className)} {...rest}>
      <Avatar className={classes.avatar} onClick={handleOpenApp}>{initials.toLocaleUpperCase()}</Avatar>

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
          <MenuItem onClick={handleOpenApp}>App details</MenuItem>
          <MenuItem onClick={handleVoid} className={classes.disabled}>Open in console</MenuItem>
          <MenuItem onClick={handleVoid} className={classes.disabled}>View activity</MenuItem>
          <MenuItem onClick={handleOpenDialog}>Remove</MenuItem>
        </Menu>
      </div>

      {
        openDialog &&
          <CustomizableDialog
            open={openDialog}
            providedTitle='Delete app'
            providedText='Are you sure you want to delete this app? This action is not reversible.'
            closeDialogCallback={handleCloseDialog}
            confirmButtonLabel='Delete'
            confirmButtonCallback={handleDelete}
          />
      }
    </div>
  )
}

export default AppCard
