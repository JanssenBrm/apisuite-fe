import * as React from 'react'
import FormField, { parseErrors, isValidURL, isValidEmail } from 'components/FormField'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import SvgIcon from 'components/SvgIcon'
import InputLabel from '@material-ui/core/InputLabel'
import RadioBoxes from 'components/RadioBoxes/RadioBoxes'
import Select from 'components/Select'
import { SelectOption } from 'components/Select/types'
import CircularProgress from '@material-ui/core/CircularProgress'
import { FormFieldEvent } from 'components/FormField/types'
import { Api } from 'containers/Subscriptions/types'

import { radioOptions } from './config'
import useCommonStyles from '../styles'
import useStyles from './styles'
import { CreateAppProps } from './types'
import { AppData } from '../types'
import clsx from 'clsx'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

type Input = Pick<AppData, 'name' | 'description' | 'redirectUrl' | 'logo' | 'userId' | 'visibility' | 'subscriptions' | 'pubUrls'>

const CreateApp: React.FC<CreateAppProps> = ({
  history,
  createApp,
  user,
  resCreate,
  apis,
  getApis,
}) => {
  const commonClasses = useCommonStyles()
  const classes = useStyles()
  // const [visible, toggle] = React.useReducer(v => !v, false)
  const [isFormValid, setFormValid] = React.useState(false)
  const [errors, setErrors] = React.useState()
  const [input, setInput] = React.useState<Input>({
    name: '',
    description: '',
    redirectUrl: '',
    logo: 'http://logo.png',
    userId: 0,
    // visibility: visible ? 'public' : 'private',
    visibility: 'private',
    subscriptions: [],
    // This is the format that the BE expects - an array of PubUrl objects
    pubUrls: [
      {
        url: '',
        type: 'client',
      },
      {
        url: '',
        type: 'tos',
      },
      {
        url: '',
        type: 'policy',
      },
      {
        url: '',
        type: 'support',
      },
      {
        url: '',
        type: 'support_email',
      },
    ],
  })

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
    const newActiveMenuItems = [...isActiveMenuItems]

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
    const newActiveMenuItems = [...isActiveMenuItems]
    const newPubUrls = [...input.pubUrls]

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
    setInput({ ...input, pubUrls: newPubUrls })
    setAnchorEl(null)
  }

  function handleCancelClick () {
    history.goBack()
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  function handleInputs (e: FormFieldEvent, err: any) {
    const newPubUrls = [...input.pubUrls]

    // Inputs related to 'pubUrls'
    if (e.target.name === 'clientUrl') {
      newPubUrls[0].url = e.target.value

      setInput({ ...input, pubUrls: newPubUrls })
    } else if (e.target.name === 'tosUrl') {
      newPubUrls[1].url = e.target.value

      setInput({ ...input, pubUrls: newPubUrls })
    } else if (e.target.name === 'policyUrl') {
      newPubUrls[2].url = e.target.value

      setInput({ ...input, pubUrls: newPubUrls })
    } else if (e.target.name === 'supportUrl') {
      newPubUrls[3].url = e.target.value

      setInput({ ...input, pubUrls: newPubUrls })
    } else if (e.target.name === 'supportEmail') {
      newPubUrls[4].url = e.target.value

      setInput({ ...input, pubUrls: newPubUrls })
    } else {
      // All other kinds of input (e.g., 'App Name', 'Description', ...)
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      })
    }

    const eventTarget = e.target

    // @ts-ignore
    setErrors((old: string[]) => parseErrors(eventTarget, err, old || []))
  }

  const selectOptions = (apis: Api[]) => {
    return apis.map(api => ({
      label: api.apiTitle,
      value: api.id,
      group: api.name,
    }))
  }

  function chooseApi (e: React.ChangeEvent<{}>, option: SelectOption) {
    if (e) {
      setInput({
        ...input,
        subscriptions: [option.value],
      })
    }
  }

  React.useEffect(() => {
    getApis()
  }, [getApis])

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    let userId = 0

    if (user) {
      userId = user.id
    }

    /* The BE can't handle 'url' fields in 'pub_urls' that are NOT filled in,
    so we filter those out before requesting the creation of a new app. */
    const finalPubUrls = input.pubUrls.filter((pubUrl) => pubUrl.url !== '')

    createApp({
      appId: 0,
      name: input.name,
      description: input.description,
      redirectUrl: input.redirectUrl,
      logo: input.logo,
      visibility: 'private',
      userId: userId,
      subscriptions: input.subscriptions,
      pubUrls: finalPubUrls,
      enable: true,
      clientId: '',
      clientSecret: '',
    })
  }

  React.useEffect(() => {
    // @ts-ignore
    setFormValid(errors && errors.length === 0)
  }, [errors])

  return (
    <div className={classes.container}>
      <section className={clsx(commonClasses.contentContainer, classes.flexContainer)}>
        <form
          noValidate autoComplete='off'
          className={classes.left}
          onSubmit={handleSubmit}
        >
          <FormField
            label='Application name'
            placeholder='Name your app'
            name='name'
            type='text'
            value={input.name}
            onChange={handleInputs}
            errorPlacing='bottom'
            rules={[
              { rule: input.name.length > 0, message: 'Please provide a valid name' },
            ]}
          />

          <br /><br />

          <FormField
            label='Description (optional)'
            placeholder='Describe your app'
            name='description'
            type='text'
            value={input.description}
            onChange={handleInputs}
            multiline
            rows={5}
          />

          <br />

          <div className={classes.fieldWrapper}>
            <FormField
              label='Redirect URL'
              placeholder='https://localhost'
              name='redirectUrl'
              type='text'
              value={input.redirectUrl}
              onChange={handleInputs}
              errorPlacing='bottom'
              rules={[
                { rule: isValidURL(input.redirectUrl), message: 'Please provide a valid URL' },
                { rule: !!input.redirectUrl && input.redirectUrl.length > 0, message: 'Please provide a valid URL' },
              ]}
            />

            <Button variant='outlined' className={classes.iconBtn}>
              <SvgIcon name='plus' size='24' />
            </Button>
          </div>

          <p className={classes.info}>
            You can add multiple redirect URLs, but at least one is required.&nbsp;
            <Link href='#'>
              Learn more about the OAuth process.&nbsp;
              <SvgIcon name='launch' size={13} style={{ display: 'inline', transform: 'translateY(2px)' }} />
            </Link>
          </p>

          <br />

          <div className={classes.fieldWrapper}>
            <FormField
              label='Public URL (optional)'
              placeholder='Client URL'
              name='clientUrl'
              type='text'
              value={input.pubUrls[0].url}
              onChange={handleInputs}
              errorPlacing='bottom'
              rules={[
                {
                  rule: input.pubUrls[0].url.length > 0 ? isValidURL(input.pubUrls[0].url) : true,
                  message: 'Please provide a valid URL',
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
                  value={input.pubUrls[1].url}
                  onChange={handleInputs}
                  errorPlacing='bottom'
                  rules={[
                    {
                      rule: input.pubUrls[1].url.length > 0 ? isValidURL(input.pubUrls[1].url) : true,
                      message: 'Please provide a valid URL',
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
                  value={input.pubUrls[2].url}
                  onChange={handleInputs}
                  errorPlacing='bottom'
                  rules={[
                    {
                      rule: input.pubUrls[2].url.length > 0 ? isValidURL(input.pubUrls[2].url) : true,
                      message: 'Please provide a valid URL',
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
                  value={input.pubUrls[3].url}
                  onChange={handleInputs}
                  errorPlacing='bottom'
                  rules={[
                    {
                      rule: input.pubUrls[3].url.length > 0 ? isValidURL(input.pubUrls[3].url) : true,
                      message: 'Please provide a valid URL',
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
                  value={input.pubUrls[4].url}
                  onChange={handleInputs}
                  errorPlacing='bottom'
                  rules={[
                    {
                      rule: input.pubUrls[4].url.length > 0 ? isValidEmail(input.pubUrls[4].url) : true,
                      message: 'Please provide a valid e-mail address',
                    },
                  ]}
                />

                <Button variant='outlined' className={classes.iconBtn} onClick={handleRemoveOtherFormField}>
                  <SvgIcon name='close' size='24' />
                </Button>
              </div>
          }

          <br />

          <InputLabel shrink>Application visibility</InputLabel>
          <RadioBoxes
            options={radioOptions}
            selected='private'
          />

          <br />

          <div className={classes.divider} />

          <br />

          <InputLabel className={classes.marginBottom} shrink>Sandbox Subscriptions</InputLabel>
          <Select
            options={selectOptions(apis)}
            onChange={chooseApi}
          />

          <br /><br />

          <div className={classes.marginBottom}>
            <Button
              type='submit'
              className={clsx(classes.btn, classes.btn3)}
              disabled={!isFormValid}
            >
              {resCreate.isRequesting ? <CircularProgress size={20} /> : 'Add Application'}
            </Button>
            <div
              role='button'
              className={clsx(classes.btn, classes.btn2)}
              onClick={handleCancelClick}
            >
              Cancel
            </div>
          </div>

          {resCreate.isError &&
            <div className={classes.errorPlaceholder}>
              <div className={classes.errorAlert}>Error creating app</div>
            </div>}

          <p className={classes.info}>
            Not sure if you’re doing it right?
            <Link href='#'>
              We have documentation.&nbsp;
              <SvgIcon name='launch' size={13} style={{ display: 'inline', transform: 'translateY(2px)' }} />
            </Link>
          </p>

          <br />
        </form>

        <aside className={classes.right}>
          {/* <InputLabel shrink>Image upload</InputLabel> */}

          <div>
            <div className={classes.upload}>
              <SvgIcon name='cloud-upload' size={24} />
            </div>
            <p className={classes.uploadDesc}>Application Logo</p>

            <div className={classes.space} />

            <div className={classes.divider} />

            <p className={classes.info2}>
              Don’t worry, you can finalise your app registration first and add API’s later:
            </p>

            <div className={classes.infoImage} />

            <br />
          </div>
        </aside>
      </section>
    </div>
  )
}

export default CreateApp
