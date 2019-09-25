
import * as React from 'react'
import { Link } from 'react-router-dom'

import InformDialog from 'components/InformDialog'
import Wheel from 'components/ApiSuiteWheel'

import './styles.scss'

import bgUrl from 'assets/sso-illustration.png'

import { SSOProps } from './types'

const SSO: React.FC<SSOProps> = ({ inform, requesting, requestError }) => {
  const [dialogOpen, setDialogOpen] = React.useState(false)

  function openDialog () {
    setDialogOpen(true)
  }

  function closeDialog () {
    if (!requesting) {
      setDialogOpen(false)
    }
  }

  function requestInform (email: string) {
    if (!requesting) {
      inform({ email, target: 'sso' })
    }
  }

  React.useEffect(() => {
    if (!requesting && !requestError) {
      closeDialog()
    }
  }, [requesting])

  return (
    <>
      <InformDialog
        textTarget={<b>Cloudoki SSO</b>}
        open={dialogOpen}
        onClose={closeDialog}
        onCancel={closeDialog}
        onConfirm={requestInform}
        showLoading={requesting}
        error={requestError}
      />

      <section className='sso-page'>
        <img className='back-image' src={bgUrl} alt='' />

        <section className='content'>
          <section className='info'>
            <h1>Keep that thought</h1>
            <p>
              We are preparing this demo application for you.
              We'd be happy to share when <b>Cloudoki SSO</b> goes live.
            </p>

            <div
              data-testid='inform-btn'
              role='button'
              arial-label='inform me'
              className='inform-btn'
              onClick={openDialog}
            >
              Inform me*
            </div>
            <div className='inform-text'>* We only use your data for this <a href='/privacy' target='_blank'>single purpose.</a></div>
          </section>
        </section>

        <section className='card-container'>
          <section className='card'>
            <div className='card-shadow' />
            <div className='card-shadow-side' />

            <div className='wheel-container'>
              <Wheel selected='tl' />
            </div>

            <div className='card-info'>
              <h1>API Suite</h1>
              <p>
                The Cloudoki SSO is part of the <b>Cloudoki API Suite</b>,
                 a toolbelt created to scale your API business.
              </p>
              <p>
                Learn more about the <Link to='/' className='portal'>Portal</Link>, <Link to='/sandbox' className='sandbox'>Sandbox</Link> and Integrations <Link to='/marketplace' className='mp'>Marketplace</Link>.
              </p>
              <br />
              <p className='contact-paragraph'><Link to='/contact' className='contact'>Contact</Link> our team for a personal demo.</p>
            </div>
          </section>
        </section>
      </section>
    </>
  )
}

export default SSO
