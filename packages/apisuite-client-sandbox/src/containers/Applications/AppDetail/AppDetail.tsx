import * as React from 'react'
import clsx from 'clsx'
import FormField from 'components/FormField/FormField'
import Button from '@material-ui/core/Button'
import SvgIcon from 'components/SvgIcon'
import InputLabel from '@material-ui/core/InputLabel'
import Avatar from '@material-ui/core/Avatar'
import Select from 'components/Select'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

import { selectOptions } from './config'
import useCommonStyles from '../styles'
import useStyles from './styles'
import { AppDetailProps } from './types'
import { AppData, RouteParams } from '../types'
import { useParams } from 'react-router'

const AppDetail: React.FC<AppDetailProps> = (
  { history, updateApp, getAppDetails, currentApp, deleteApp, user, resUpdate, resDelete, toggleInform }) => {
  const commonClasses = useCommonStyles()
  const classes = useStyles()
  const [t] = useTranslation()
  const appId = parseInt(useParams<RouteParams>().id)

  const [buttonDisabled, setButtonDisabled] = React.useState(true)
  const [input, setInput] = React.useState({
    appId: currentApp.appId,
    name: currentApp.name,
    description: currentApp.description,
    redirectUrl: currentApp.redirectUrl,
    logo: currentApp.logo,
    userId: currentApp.userId,
    sandboxId: currentApp.sandboxId,
    pubUrls: currentApp.pubUrls,
    enable: true,
  })

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    updateApp({
      appId: appId,
      name: input.name,
      description: input.description,
      redirectUrl: input.redirectUrl,
      logo: input.logo,
      userId: input.userId,
      sandboxId: input.sandboxId,
      pubUrls: input.pubUrls,
      enable: true,
    })
  }

  function handleDeleteApp () {
    deleteApp(appId)
  }

  function compareAppData (newAppData: AppData) {
    if (JSON.stringify(newAppData) === JSON.stringify(currentApp)) {
      setButtonDisabled(true)
    } else {
      setButtonDisabled(false)
    }
  }

  function handleInputs (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    compareAppData({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  function navigate (route: any) {
    history.push(route)
  }

  React.useEffect(() => {
    if (user) {
      getAppDetails(appId, user.id)
    }
    setInput({ ...currentApp })
    compareAppData({ ...currentApp })
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
              value={input.name}
              onChange={handleInputs}
            />

            <br />

            <FormField
              label='Description'
              placeholder='Describe your app'
              multiline
              name='description'
              rows={5}
              value={input.description}
              onChange={handleInputs}
            />

            <br />

            <FormField
              label='Client URL'
              placeholder='https://localhost'
              name='pubUrls'
              value={input.pubUrls}
              onChange={handleInputs}
            />

            <br />

            <div className={classes.fieldWrapper}>
              <FormField
                label='Terms of service'
                value='https://cloudoki.com/tos'
              />

              {/* <Button variant='outlined' className={classes.iconBtn}>
                <SvgIcon name='plus' size='24' />
              </Button> */}
            </div>

            <br /><br /><br /><br /><br />

            <div className={classes.divider} />

            <br />

            <InputLabel>Access details</InputLabel>

            <br />

            <div className={classes.fieldWrapper}>
              <FormField
                label='Client ID'
                value='0ae6d358-d775-4a78-aabc-6d26a0e895fe'
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
                value='T63FhXXUy9_jTaODHp9i73MnWyb6MqnxL6kPjq05xA'
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
                value={input.redirectUrl}
                onChange={handleInputs}
              />

              {/* <Button variant='outlined' className={classes.iconBtn}>
                <SvgIcon name='plus' size='24' />
              </Button> */}
            </div>

            <br />
          </form>

          <aside className={classes.right}>
            <form onSubmit={handleSubmit}>

              <Avatar className={classes.avatar}>MA</Avatar>

              <br />

              <InputLabel shrink>Application Status</InputLabel>
              <div className={classes.status}>
                <SvgIcon name='circle' color='#2DB7B9' size={12} style={{ display: 'inline-block' }} />
              &nbsp;&nbsp;
                <span>Sandbox Access</span>
              </div>

              <br />

              <InputLabel shrink className={classes.marginBottom}>Application visibility</InputLabel>

              <Select options={selectOptions} selected={selectOptions[0]} />

              <br />

              {/* <InputLabel shrink>Author</InputLabel>
              <div className={classes.link}>Finish your team info</div>
              <br /> */}

              <InputLabel shrink>Registration date</InputLabel>
              <div>{moment(currentApp.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
              <br />

              <InputLabel shrink>Last update</InputLabel>
              <div>{moment(currentApp.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
              <br />

              <Button
                type='submit'
                disabled={buttonDisabled}
                className={clsx(classes.btn, classes.btn2, (buttonDisabled && classes.disabled))}
              >
                {resUpdate.isRequesting ? <CircularProgress size={20} /> : buttonDisabled ? t('appDetail.buttonDisabled') : t('appDetail.buttonEnabled')}
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
              <div
                className={classes.link}
                onClick={handleDeleteApp}
              >
                Delete application
              </div>

              {resDelete.isError &&
                <div className={classes.errorPlaceholder}>
                  <div className={classes.errorAlert}>Error deleting app</div>
                </div>}

            </form>
          </aside>
        </section>
      </div>
    </>
  )
}

export default AppDetail
