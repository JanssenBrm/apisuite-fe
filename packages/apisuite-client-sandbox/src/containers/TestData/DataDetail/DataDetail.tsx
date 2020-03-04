import * as React from 'react'
import useStyles from './styles'
import FormField from 'components/FormField'
import Link from '@material-ui/core/Link'
import SvgIcon from 'components/SvgIcon'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import clsx from 'clsx'
import DataCard from 'components/DataCard'
import AddIcon from '@material-ui/icons/Add'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import PasswordCard from 'components/PasswordCard'

const DataDetail: React.FC<{}> = () => {
  const classes = useStyles()

  const testUserData = [
    {
      property: 'Accounts',
      entries: 1,
      addMsg: 'Add a new account',
    },
    {
      property: 'Beneficiaries',
      entries: 32,
      addMsg: 'Add your first beneficiary',
    },
    {
      property: 'Pets',
      entries: 0,
      addMsg: 'Add your first pet ',
    },
  ]

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

          <form className={classes.form}>
            <div className={classes.avatarContainer}>
              <Avatar className={classes.avatar}>MA</Avatar>
            </div>

            <Button
              type='submit'
              className={clsx(classes.btn, classes.btn2)}
            >
                  Save
            </Button>
          </form>
        </div>
        <h5 className={classes.heading}>Test contents</h5>
        <div className={classes.bottom}>
          <div className={classes.sideForm}>
            <DataCard
              pkgData={testUserData}
              icons={[
                <AddIcon key={0} className={classes.actionIcon} />,
                <ArrowForwardIosIcon key={1} className={classes.actionIcon} />,
              ]}
            />
          </div>

          <div className={classes.rightBottom}>
            <PasswordCard />

            <h6 className={classes.actions}>Additional actions</h6>
            <a className={classes.a}>Open in console</a>
            <a className={classes.a}>Duplicate user</a>
            <a className={classes.a}>Delete user</a>

          </div>
        </div>
      </section>
    </div>
  )
}

export default DataDetail
