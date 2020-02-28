import * as React from 'react'
import useStyles from './styles'
import FormField from 'components/FormField'
import Link from '@material-ui/core/Link'
import SvgIcon from 'components/SvgIcon'
import Button from '@material-ui/core/Button'
import clsx from 'clsx'

const CreateData: React.FC<{}> = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <section className={classes.contentContainer}>
        <div className={classes.top}>
          <div className={classes.sideForm}>
            <FormField
              label='Test user name'
              placeholder='Full name'
              name='name'
              type='text'
            />

            <FormField
              label='E-mail address'
              placeholder='E-mail'
              name='email'
              type='email'
            />

            <p className={classes.info}>
            Be sensitive about privacy, avoid using personal information without consent.&nbsp;
              <Link href='#'>
              Learn more abour our GDPR advice.&nbsp;
                <SvgIcon name='launch' size={13} style={{ display: 'inline', transform: 'translateY(2px)' }} />
              </Link>
            </p>
          </div>
          <div className={classes.avatarContainer}>
            <p className={classes.uploadDesc}>Image upload</p>
            <div className={classes.upload}>
              <SvgIcon name='cloud-upload' size={24} />
            </div>
            <p className={classes.uploadDesc}>Test user avatar</p>
          </div>
        </div>
        <div className={classes.bottom}>
          <div className={classes.sideForm}>
            <FormField
              label='Test user pass-phrase'
              placeholder=''
              name='password'
              type='text'
            />

            <div className={classes.marginButtons}>
              <Button
                type='submit'
                className={clsx(classes.btn, classes.btn3)}
              >
                Create
              </Button>
              <Button
                className={clsx(classes.btn, classes.btn2)}
              >
                Cancel
              </Button>

              <p className={classes.info}>
            Not sure if you're doing it right?&nbsp;
                <Link href='#'>
              We have documentation.&nbsp;
                  <SvgIcon name='launch' size={13} style={{ display: 'inline', transform: 'translateY(2px)' }} />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CreateData
