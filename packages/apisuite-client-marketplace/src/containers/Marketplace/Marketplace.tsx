
import * as React from 'react'
import { Link } from 'react-router-dom'

import InformDialog from 'components/InformDialog'
import Wheel from 'components/ApiSuiteWheel'

import './styles.scss'

import bgUrl from 'assets/mp-illustration.png'

import { MarketplaceProps } from './types'

const Marketplace: React.FC<MarketplaceProps> = ({ inform, requesting, requestError }) => {
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
      inform({ email, target: 'marketplace' })
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
        textTarget={<b>Cloudoki Marketplace</b>}
        open={dialogOpen}
        onClose={closeDialog}
        onCancel={closeDialog}
        onConfirm={requestInform}
        showLoading={requesting}
        error={requestError}
      />

      <section className='mp-page'>
        <img className='back-image' src={bgUrl} alt='' />

        <section className='content'>
          <section className='info'>
            <h1>Keep that thought</h1>
            <p>
              We are preparing this demo application for you.
              We'd be happy to share when <b>Cloudoki Marketplace</b> goes live.
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
              <Wheel selected='bl' />
            </div>

            <div className='card-info'>
              <h1>API Suite</h1>
              <p>
                The Cloudoki Marketplace is part of the <b>Cloudoki API Suite</b>,
                 a toolbelt created to scale your API business.
              </p>
              <p>
                Learn more about the <Link to='/' className='portal'>Portal</Link>, Integrations <Link to='/sandbox' className='sandbox'>Sandbox</Link> and <Link to='/sso' className='sso'>SSO</Link>.
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

export default Marketplace
