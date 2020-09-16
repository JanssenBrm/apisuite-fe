import * as React from 'react'
import clsx from 'clsx'
import FormField, { parseErrors, isValidURL, isValidEmail } from 'components/FormField'
import CustomizableDialog from 'components/CustomizableDialog/CustomizableDialog'
import Button from '@material-ui/core/Button'
import SvgIcon from 'components/SvgIcon'
import InputLabel from '@material-ui/core/InputLabel'
import Avatar from '@material-ui/core/Avatar'
import Select from 'components/Select'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useTranslation } from 'react-i18next'
import i18n from 'i18next'

import { selectOptions } from './config'
import useCommonStyles from '../styles'
import useStyles from './styles'
import { AppDetailProps } from './types'
import { RouteParams, AppData } from '../types'
import { useParams } from 'react-router'
import { FormFieldEvent } from 'components/FormField/types'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const AppDetail: React.FC<AppDetailProps> = (
  {
    history,
    updateApp,
    getAppDetails,
    currentApp,
    deleteApp,
    user,
    resUpdate,
    resDelete,
    toggleInform,
  }) => {
  const commonClasses = useCommonStyles()
  const classes = useStyles()
  const [t] = useTranslation()
  const appId = parseInt(useParams<RouteParams>().id)
  const [initialInput, setInitialInput] = React.useState()
  const [currentInput, setCurrentInput] = React.useState<AppData>({
    appId: currentApp.appId,
    name: currentApp.name,
    description: currentApp.description,
    redirectUrl: currentApp.redirectUrl,
    logo: currentApp.logo,
    visibility: currentApp.visibility,
    userId: currentApp.userId,
    subscriptions: currentApp.subscriptions,
    pubUrls: currentApp.pubUrls,
    enable: true,
    clientId: currentApp.clientId,
    clientSecret: currentApp.clientSecret,
  })
  const [inputsHaveChanged, setInputsHaveChanged] = React.useState(false)
  const [errors, setErrors] = React.useState()
  const [isFormValid, setFormValid] = React.useState(false)
  const [openDialog, setOpenDialog] = React.useState(false)

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }
  const splitName = currentApp.name.split(' ')
  const initials = splitName.length >= 2
    ? `${splitName[0][0] + splitName[1][0]}` : splitName[0].slice(0, 2)

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [isActiveMenuItems, setActiveMenuItems] = React.useState([false, false, false, false])

  function handleMenuClick (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation()

    setAnchorEl((event as any).currentTarget)
  }

  function handleClose (event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    event.stopPropagation()

    setAnchorEl(null)
  }

  function handleAddOtherFormField (event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    event.stopPropagation()

    const selectedMenuItem = event.currentTarget
    const selectedMenuItemText = selectedMenuItem.textContent
    let newActiveMenuItems = [...isActiveMenuItems]

    if (selectedMenuItemText === 'Terms of service URL') {
      newActiveMenuItems[0] = true
    } else if (selectedMenuItemText === 'Policy URL') {
      newActiveMenuItems[1] = true
    } else if (selectedMenuItemText === 'Support URL') {
      newActiveMenuItems[2] = true
    } else {
      newActiveMenuItems[3] = true
    }

    setActiveMenuItems(newActiveMenuItems)
    setAnchorEl(null)
  }

  function handleRemoveOtherFormField (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation()

    const fieldToRemove = event.currentTarget.parentElement
    let newActiveMenuItems = [...isActiveMenuItems]
    let newPubUrls = [...currentInput.pubUrls]

    if (fieldToRemove!.id === 'tosUrlFieldWrapper') {
      newActiveMenuItems[0] = false
      newPubUrls[1].url = ''
    } else if (fieldToRemove!.id === 'policyUrlFieldWrapper') {
      newActiveMenuItems[1] = false
      newPubUrls[2].url = ''
    } else if (fieldToRemove!.id === 'supportUrlFieldWrapper') {
      newActiveMenuItems[2] = false
      newPubUrls[3].url = ''
    } else {
      newActiveMenuItems[3] = false
      newPubUrls[4].url = ''
    }

    setActiveMenuItems(newActiveMenuItems)
    setCurrentInput({ ...currentInput, pubUrls: newPubUrls })
    setAnchorEl(null)
  }

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    /* The BE can't handle 'url' fields in 'pub_urls' that are NOT filled in,
    so we filter those out before requesting the creation of a new app. */
    const finalPubUrls = currentInput.pubUrls.filter((pubUrl) => pubUrl.url !== '')

    updateApp({
      appId: appId,
      name: currentInput.name,
      description: currentInput.description,
      redirectUrl: currentInput.redirectUrl,
      logo: currentInput.logo,
      visibility: 'private',
      userId: currentInput.userId,
      subscriptions: currentInput.subscriptions,
      pubUrls: finalPubUrls,
      enable: true,
      clientId: '',
      clientSecret: '',
    })
  }

  function handleOpenDialog () {
    setOpenDialog(true)
  }

  function handleCloseDialog () {
    setOpenDialog(false)
  }

  function handleDeleteApp () {
    setOpenDialog(false)

    deleteApp(appId)

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  function handleInputs (e: FormFieldEvent, err: any) {
    let newPubUrls = [...currentInput.pubUrls]

    /* Updating inputs */

    // Inputs related to 'pubUrls'
    if (e.target.name === 'clientUrl') {
      newPubUrls[0].url = e.target.value

      setCurrentInput({ ...currentInput, pubUrls: newPubUrls })
    } else if (e.target.name === 'tosUrl') {
      newPubUrls[1].url = e.target.value

      setCurrentInput({ ...currentInput, pubUrls: newPubUrls })
    } else if (e.target.name === 'policyUrl') {
      newPubUrls[2].url = e.target.value

      setCurrentInput({ ...currentInput, pubUrls: newPubUrls })
    } else if (e.target.name === 'supportUrl') {
      newPubUrls[3].url = e.target.value

      setCurrentInput({ ...currentInput, pubUrls: newPubUrls })
    } else if (e.target.name === 'supportEmail') {
      newPubUrls[4].url = e.target.value

      setCurrentInput({ ...currentInput, pubUrls: newPubUrls })
    }
    // All other kinds of input (e.g., 'App Name', 'Description', ...)
    else {
      setCurrentInput({
        ...currentInput,
        [e.target.name]: e.target.value,
      })
    }

    /* Comparing current inputs with those received (stored in 'currentApp') */

    const inputChangesDetected = (JSON.stringify(initialInput) !== JSON.stringify(currentInput))

    inputChangesDetected ? setInputsHaveChanged(true) : setInputsHaveChanged(false)

    const eventTarget = e.target

    // @ts-ignore
    setErrors((old: string[]) => parseErrors(eventTarget, err, old || []))
  }

  function navigate (route: any) {
    history.push(route)
  }

  React.useEffect(() => {
    // @ts-ignore
    setFormValid(errors && errors.length === 0)
  }, [errors])

  React.useEffect(() => {
    if (user) {
      getAppDetails(appId, user.id)
    }
  }, [])

  React.useEffect(() => {
    /* The 'AppDetail' container holds state when we go from one app to another,
    and it requires 'pubUrls' to be of the below format, which is why we need to do the following. */
    let newPubUrls = [
      { url: '', type: 'client', },
      { url: '', type: 'tos', },
      { url: '', type: 'policy', },
      { url: '', type: 'support', },
      { url: '', type: 'support_email', },
    ]
    let newActiveMenuItems = [false, false, false, false]

    currentApp.pubUrls.forEach((pubUrl) => {
      if (pubUrl.type === 'client') { newPubUrls[0].url = pubUrl.url }
      if (pubUrl.type === 'tos') { newPubUrls[1].url = pubUrl.url; newActiveMenuItems[0] = true }
      if (pubUrl.type === 'policy') { newPubUrls[2].url = pubUrl.url; newActiveMenuItems[1] = true }
      if (pubUrl.type === 'support') { newPubUrls[3].url = pubUrl.url; newActiveMenuItems[2] = true }
      if (pubUrl.type === 'support_email') { newPubUrls[4].url = pubUrl.url; newActiveMenuItems[3] = true }
    })

    // 'initialInput' will hold a deep copy of app data that has NOT been changed yet.
    setInitialInput(JSON.parse(JSON.stringify({ ...currentApp, pubUrls: newPubUrls })))

    // 'currentInput' will hold app data that may, or may not be changed.
    setCurrentInput({ ...currentApp, pubUrls: newPubUrls })

    setActiveMenuItems(newActiveMenuItems)
  }, [currentApp])

  return (
    <>
      <div className={classes.container}>
        <section className={clsx(commonClasses.contentContainer, classes.flexContainer)}>
          <form noValidate autoComplete='off' className={classes.left}>
            <FormField
              label='Application Name'
              placeholder='Your App name'
              name='name'
              type='text'
              value={currentInput.name}
              onChange={handleInputs}
              errorPlacing='bottom'
              rules={[
                { rule: currentInput.name.length > 0, message: 'Please provide a valid name' },
              ]}
            />

            <br />

            <FormField
              label='Description'
              placeholder='Describe your app'
              multiline
              name='description'
              rows={5}
              value={currentInput.description}
              onChange={handleInputs}
            />

            <br />

            <div className={classes.fieldWrapper}>
              <FormField
                label='Client URL'
                placeholder='https://localhost'
                name='clientUrl'
                type='text'
                value={currentInput.pubUrls[0].url}
                onChange={handleInputs}
                errorPlacing='bottom'
                rules={[
                  {
                    rule: currentInput.pubUrls[0].url.length > 0 ? isValidURL(currentInput.pubUrls[0].url) : true,
                    message: 'Please provide a valid URL'
                  },
                ]}
              />

              <Button variant='outlined' className={classes.iconBtn} onClick={handleMenuClick}>
                <SvgIcon name='plus' size='24' />
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  className={!isActiveMenuItems[0] ? undefined : classes.disabled}
                  onClick={handleAddOtherFormField}
                >
                  Terms of service URL
                </MenuItem>
                <MenuItem
                  className={!isActiveMenuItems[1] ? undefined : classes.disabled}
                  onClick={handleAddOtherFormField}
                >
                  Policy URL
                </MenuItem>
                <MenuItem
                  className={!isActiveMenuItems[2] ? undefined : classes.disabled}
                  onClick={handleAddOtherFormField}
                >
                  Support URL
                </MenuItem>
                <MenuItem
                  className={!isActiveMenuItems[3] ? undefined : classes.disabled}
                  onClick={handleAddOtherFormField}
                >
                  Support e-mail
                </MenuItem>
              </Menu>
              {
                /* <Button variant='outlined' className={classes.iconBtn}>
                <SvgIcon name='plus' size='24' />
                </Button> */
              }
            </div>

            {
              isActiveMenuItems[0] &&
              <div
                id='tosUrlFieldWrapper'
                className={classes.fieldWrapper}
              >
                <FormField
                  label='Terms of service URL (optional)'
                  placeholder='Terms of service URL'
                  name='tosUrl'
                  type='text'
                  value={currentInput.pubUrls[1].url}
                  onChange={handleInputs}
                  errorPlacing='bottom'
                  rules={[
                    {
                      rule: currentInput.pubUrls[1].url.length > 0 ? isValidURL(currentInput.pubUrls[1].url) : true,
                      message: 'Please provide a valid URL'
                    },
                  ]}
                />

                <Button variant='outlined' className={classes.iconBtn} onClick={handleRemoveOtherFormField}>
                  <SvgIcon name='close' size='24' />
                </Button>
              </div>
            }

            {
              isActiveMenuItems[1] &&
              <div
                id='policyUrlFieldWrapper'
                className={classes.fieldWrapper}
              >
                <FormField
                  label='Policy URL (optional)'
                  placeholder='Policy URL'
                  name='policyUrl'
                  type='text'
                  value={currentInput.pubUrls[2].url}
                  onChange={handleInputs}
                  errorPlacing='bottom'
                  rules={[
                    {
                      rule: currentInput.pubUrls[2].url.length > 0 ? isValidURL(currentInput.pubUrls[2].url) : true,
                      message: 'Please provide a valid URL'
                    },
                  ]}
                />

                <Button variant='outlined' className={classes.iconBtn} onClick={handleRemoveOtherFormField}>
                  <SvgIcon name='close' size='24' />
                </Button>
              </div>
            }

            {
              isActiveMenuItems[2] &&
              <div
                id='supportUrlFieldWrapper'
                className={classes.fieldWrapper}
              >
                <FormField
                  label='Support URL (optional)'
                  placeholder='Support URL'
                  name='supportUrl'
                  type='text'
                  value={currentInput.pubUrls[3].url}
                  onChange={handleInputs}
                  errorPlacing='bottom'
                  rules={[
                    {
                      rule: currentInput.pubUrls[3].url.length > 0 ? isValidURL(currentInput.pubUrls[3].url) : true,
                      message: 'Please provide a valid URL'
                    },
                  ]}
                />

                <Button variant='outlined' className={classes.iconBtn} onClick={handleRemoveOtherFormField}>
                  <SvgIcon name='close' size='24' />
                </Button>
              </div>
            }

            {
              isActiveMenuItems[3] &&
              <div
                id='supportEmailFieldWrapper'
                className={classes.fieldWrapper}
              >
                <FormField
                  label='Support e-mail (optional)'
                  placeholder='Support e-mail'
                  name='supportEmail'
                  type='text'
                  value={currentInput.pubUrls[4].url}
                  onChange={handleInputs}
                  errorPlacing='bottom'
                  rules={[
                    {
                      rule: currentInput.pubUrls[4].url.length > 0 ? isValidEmail(currentInput.pubUrls[4].url) : true,
                      message: 'Please provide a valid e-mail address'
                    },
                  ]}
                />

                <Button variant='outlined' className={classes.iconBtn} onClick={handleRemoveOtherFormField}>
                  <SvgIcon name='close' size='24' />
                </Button>
              </div>
            }

            <br />

            <div className={classes.divider} />

            <br />

            <InputLabel>Access details</InputLabel>

            <br />

            <div className={classes.fieldWrapper}>
              <FormField
                label='Client ID'
                value={currentInput.clientId}
                inputProps={{ readOnly: true }}
              />

              {/* <Button variant='outlined' className={classes.iconBtn}>
                    <SvgIcon name='content-copy' size='24' />
                  </Button> */}
            </div>

            <br />

            <div className={classes.fieldWrapper}>
              <FormField
                label='Client Secret'
                value={currentInput.clientSecret}
                inputProps={{ readOnly: true }}
              />

              {/* <Button variant='outlined' className={clsx(classes.iconBtn, classes.iconBtnLeft)}>
                    <SvgIcon name='autorenew' size='24' />
                  </Button>

                  <Button variant='outlined' className={clsx(classes.iconBtn, classes.iconBtnRight)}>
                    <SvgIcon name='content-copy' size='24' />
                  </Button> */}
            </div>

            <br />

            <div className={classes.fieldWrapper}>
              <FormField
                label='Redirect URL'
                name='redirectUrl'
                type='text'
                value={currentInput.redirectUrl}
                onChange={handleInputs}
                rules={[
                  { rule: isValidURL(currentInput.redirectUrl), message: 'Please provide a valid URL' },
                  { rule: currentInput.redirectUrl.length > 0, message: 'Please provide a valid URL' },
                ]}
              />

              {/* <Button variant='outlined' className={classes.iconBtn}>
                    <SvgIcon name='plus' size='24' />
                  </Button> */}
            </div>

            <br />
          </form>

          <aside className={classes.right}>
            <form onSubmit={handleSubmit}>

              {/* We render our app's avatar with its initials in uppercase. */}
              <Avatar className={classes.avatar}>{initials.toLocaleUpperCase()}</Avatar>

              <br />

              <InputLabel shrink>Application Status</InputLabel>
              <div className={classes.status}>
                <SvgIcon name='circle' color='#2DB7B9' size={12} style={{ display: 'inline-block' }} />
                &nbsp;&nbsp;
                <span>Sandbox Access</span>
              </div>

              <br />

              <InputLabel shrink className={classes.marginBottom}>Application visibility</InputLabel>

              <Select options={selectOptions} selected={selectOptions[0]} disabled />

              <br />

              {/* <InputLabel shrink>Author</InputLabel>
                  <div className={classes.link}>Finish your team info</div>
                  <br /> */}

              <InputLabel shrink>Registration date</InputLabel>
              <div>{currentApp.createdAt !== undefined &&
                new Intl.DateTimeFormat(i18n.language, dateOptions).format(Date.parse(currentApp.createdAt))}
              </div>
              <br />

              <InputLabel shrink>Last update</InputLabel>
              <div>{currentApp.updatedAt !== undefined &&
                new Intl.DateTimeFormat(i18n.language, dateOptions).format(Date.parse(currentApp.updatedAt))}
              </div>
              <br />

              <Button
                type='submit'
                disabled={!(isFormValid && inputsHaveChanged)}
                className={clsx(classes.btn, classes.btn2, (!inputsHaveChanged && classes.disabled))}
              >
                {resUpdate.isRequesting ? <CircularProgress size={20} /> : !inputsHaveChanged ? t('appDetail.buttonDisabled') : t('appDetail.buttonEnabled')}
              </Button>

              {resUpdate.isError &&
                <div className={classes.errorPlaceholder}>
                  <div className={classes.errorAlert}>Error updating app</div>
                </div>}

              <br /><br /><br />

              <div className={classes.divider} />

              <br />

              <InputLabel shrink>API subscriptions</InputLabel>
              <div className={classes.link} onClick={() => navigate('/dashboard/subscriptions')}>Manage API subscriptions</div>
              <br />

              <InputLabel shrink className={classes.marginBottom}>Application scopes</InputLabel>
              <div>
                <span className={classes.tag}>default</span>
              </div>

              <br />

              <InputLabel shrink>Additional actions</InputLabel>
              <div className={classes.link} onClick={() => toggleInform()}>Activity monitoring</div>
              <div className={classes.link} onClick={handleOpenDialog}>Delete application</div>

              {
                resDelete.isError &&
                  <div className={classes.errorPlaceholder}>
                    <div className={classes.errorAlert}>Error deleting app</div>
                  </div>
              }
            </form>
          </aside>
        </section>
      </div>

      {
        openDialog &&
          <CustomizableDialog
            open={openDialog}
            providedTitle='Delete app'
            providedText='Are you sure you want to delete this app? This action is not reversible.'
            closeDialogCallback={handleCloseDialog}
            confirmButtonLabel='Delete'
            confirmButtonCallback={handleDeleteApp}
          />
      }
    </>
  )
}

export default AppDetail
