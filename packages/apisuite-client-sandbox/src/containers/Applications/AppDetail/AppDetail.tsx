import * as React from 'react'
import clsx from 'clsx'
import FormField from 'components/FormField/FormField'
import Button from '@material-ui/core/Button'
import SvgIcon from 'components/SvgIcon'
import InputLabel from '@material-ui/core/InputLabel'
import Avatar from '@material-ui/core/Avatar'
import Select from 'components/Select'
import Panel from 'components/Panel'
import Wheel from 'components/ApiSuiteWheel'
import { useTranslation } from 'react-i18next'

import { selectOptions } from './config'
import useCommonStyles from '../styles'
import useStyles from './styles'
import { AppDetailProps } from './types'
import { AppData } from '../types'
import { Link } from '@material-ui/core'

const AppDetail: React.FC<AppDetailProps> = ({ updateApp, getAppDetails, currentApp }) => {
  const commonClasses = useCommonStyles()
  const classes = useStyles()
  const [t] = useTranslation()

  const [buttonDisabled, setButtonDisabled] = React.useState(true)
  const [input, setInput] = React.useState({
    name: currentApp.name,
    description: currentApp.description,
    redirectUrl: currentApp.redirectUrl,
    logo: currentApp.logo,
    userId: currentApp.userId,
    sandboxId: currentApp.sandboxId,
  })

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    updateApp({
      name: input.name,
      description: input.description,
      redirectUrl: input.redirectUrl,
      logo: input.logo,
      userId: input.userId,
      sandboxId: input.sandboxId,
    })
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

  React.useEffect(() => {
    getAppDetails()
    setInput({ ...currentApp })
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
              rows={5}
              value={input.description}
              onChange={handleInputs}
            />

            <br />

            <FormField
              label='Client URL'
              placeholder='https://localhost'
              value='https://cloudoki.com'
            />

            <br />

            <div className={classes.fieldWrapper}>
              <FormField
                label='Terms of service'
                value='https://cloudoki.com/tos'
              />

              <Button variant='outlined' className={classes.iconBtn}>
                <SvgIcon name='plus' size='24' />
              </Button>
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

              <Button variant='outlined' className={classes.iconBtn}>
                <SvgIcon name='content-copy' size='24' />
              </Button>
            </div>

            <br />

            <div className={classes.fieldWrapper}>
              <FormField
                label='Client Secret'
                value='T63FhXXUy9_jTaODHp9i73MnWyb6MqnxL6kPjq05xA'
                inputProps={{ readOnly: true }}
              />

              <Button variant='outlined' className={clsx(classes.iconBtn, classes.iconBtnLeft)}>
                <SvgIcon name='autorenew' size='24' />
              </Button>

              <Button variant='outlined' className={clsx(classes.iconBtn, classes.iconBtnRight)}>
                <SvgIcon name='content-copy' size='24' />
              </Button>
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

              <Button variant='outlined' className={classes.iconBtn}>
                <SvgIcon name='plus' size='24' />
              </Button>
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

              <InputLabel shrink>Author</InputLabel>
              <div className={classes.link}>Finish your team info</div>

              <br />

              <InputLabel shrink>Registration date</InputLabel>
              <div>June 24th, 2019</div>

              <br />

              <Button
                type='submit'
                disabled={buttonDisabled}
                className={clsx(classes.btn, classes.btn2, (buttonDisabled && classes.disabled))}
              >
                {buttonDisabled ? t('appDetail.buttonDisabled') : t('appDetail.buttonEnabled')}
              </Button>

              <br /><br /><br />

              <div className={classes.divider} />

              <br />

              <InputLabel shrink>API subscriptions</InputLabel>
              <div className={classes.link}>Manage API subscriptions</div>

              <br />

              <InputLabel shrink className={classes.marginBottom}>Application scopes</InputLabel>
              <div>
                <span className={classes.tag}>aisp</span>
                <span className={classes.tag}>piisp</span>
                <span className={classes.tag}>pisp</span>
              </div>

              <br />

              <InputLabel shrink>Additional actions</InputLabel>
              <div className={classes.link}>Activity monitoring</div>
              <div className={classes.link}>Delete application</div>
            </form>
          </aside>
        </section>
      </div>

      <div className={classes.cardContainer}>
        <section className={commonClasses.contentContainer}>
          <Panel className={classes.panel}>
            <div className={classes.wheelContainer}>
              <Wheel selected={['tr', 'bl']} />
            </div>

            <div className={classes.cardInfo}>
              <h1>API Suite functionality</h1>

              <p>The <b>Cloudoki Sandbox</b> demo limits the scope of applications to private consumers of sandboxed
               API’s. We got more… *
              </p>
              <p className={classes.greenColor}>View added functionality on <Link href='#'>cloudoki.com/portal</Link></p>

              <br />

              <p className={classes.cardInfoItalic}>
                * Public applications in Marketplace, production API’s onboarding in Portal.
              </p>
            </div>
          </Panel>
        </section>
      </div>
    </>
  )
}

export default AppDetail
