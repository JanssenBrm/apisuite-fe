import React from 'react'
import { func, bool } from 'prop-types'
import Card from 'components/Card'
import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'
import themeVariables from 'styles/variables.scss'
import Typography from '@material-ui/core/Typography'

const portals = [
  {
    title: 'landing.portal.steps.1.title',
    color: themeVariables.lightLime,
    text1: 'landing.portal.steps.1.text.1',
    text2: 'landing.portal.steps.1.text.2',
    button: 'landing.portal.steps.1.button',
    btnRoute: 'apps',
  },
  {
    title: 'landing.portal.steps.2.title',
    color: themeVariables.lightTeal,
    text1: 'landing.portal.steps.2.text.1',
    button: 'landing.portal.steps.2.button',
    btnRoute: 'api-subscriptions',
  },
  {
    title: 'landing.portal.steps.3.title',
    color: themeVariables.lightBlue,
    text1: 'landing.portal.steps.3.text.1',
    button: 'landing.portal.steps.3.button',
    btnRoute: 'docs',
  },
]

const SectionPortal = ({ navigate, isLoggedIn }) => (
  <div className='section section-grey portal-section'>
    <div className='section-content'>
      <div className='portal-cards'>
        <Card
          scope='landing' children={
            portals.map((portal, idx) => (
              <div key={`portal-content-item-${idx}`} className='portal-content-item'>
                <div className='portal-body'>
                  <div className='portal-circle'><span style={{ color: portal.color }}>{idx + 1}</span></div>
                  <Typography variant='display3' gutterBottom style={{ color: portal.color }}><FormattedMessage id={portal.title} /></Typography>
                  <p><FormattedMessage id={portal.text1} /></p>
                  {portal.text2 && <p><FormattedMessage id={portal.text2} /></p>}
                </div>
                <Button
                  id='portal-button'
                  testid='portal-btn'
                  className='portal-button'
                  variant='outlined'
                  onClick={navigate(portal.btnRoute)}
                  disabled={!isLoggedIn}
                >
                  <FormattedMessage id={portal.button} />
                </Button>
              </div>
            ))
          }
        />
      </div>
      <div className='portal-description'>
        <Typography variant='display3'><FormattedMessage id='landing.portal.title' /></Typography>
        <p><FormattedMessage id='landing.portal.text.1' /></p>
        <p><FormattedMessage id='landing.portal.text.2' /></p>
        <br />
        {!isLoggedIn &&
          <Button
            id='signup'
            testid='portal-signup-btn'
            key='signup'
            className='gradient gradient-grey'
            variant='outlined'
            onClick={navigate('signup')}
          >
            <FormattedMessage id='landing.portal.register' />
          </Button>}
      </div>
    </div>
  </div>
)

SectionPortal.propTypes = {
  navigate: func.isRequired,
  isLoggedIn: bool.isRequired,
}

export default SectionPortal
