import React, { Component } from 'react'
import { object, func } from 'prop-types'
import Button from '@material-ui/core/Button'
import FormField, { parseErrors, isValidEmail } from 'components/FormField'
import Checkbox from 'components/Checkbox'
import { FormattedMessage } from 'react-intl'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { Typography } from '@material-ui/core'
import { saveAs } from 'file-saver'

class SectionSubscribe extends Component {
  state = {
    termsChecked: false,
    email: '',
    showerrors: false,
    errors: [],
  }

  UNSAFE_componentWillUpdate () {
    const { newsletter: { success } } = this.props
    const { email } = this.state
    if (success && email !== '') {
      this.setState({
        termsChecked: false,
        email: '',
      })
    }
  }

  handleEmail = ({ target }, errors) => {
    this.setState({
      email: target.value,
      errors: parseErrors(target, errors, this.state.errors),
    })
  }

  handleCheckboxChange = ({ target }) => {
    this.setState({ termsChecked: target.checked })
  }

  downloadPdf = () => {
    saveAs('assets/docs/Our_Open_Banking_Program.pdf', 'Our Open Banking Program.pdf')
  }

  subscribe = email => () => {
    this.props.sendNewsletterForm(email)
  }

  scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  render () {
    const { intl, theme } = this.props
    const { email, termsChecked, showerrors } = this.state
    const emailNotValid = intl.formatMessage({ id: 'landing.subscribe.invalidemail' })
    const emailPlaceholder = intl.formatMessage({ id: 'landing.subscribe.emailPlaceholder' })
    const themeEmail = intl.formatMessage({ id: 'landing.subscribe.email' })

    return (
      <div className='section section-dark-grey pre-footer-section'>
        <div className='section-content'>
          <div className='pre-footer-email'>
            <Typography variant='display3' className='pre-footer-header'>
              <FormattedMessage id='landing.subscribe.title' />
            </Typography>
            <p>
              <FormattedMessage id='landing.subscribe.text' />
            </p>
            <div className='pre-footer-form'>
              <div className='pre-footer-email-input'>
                <FormField
                  placeholder={emailPlaceholder}
                  fullWidth
                  id='email'
                  testid='subscribe-email'
                  name='email'
                  className='subscribe-email'
                  onChange={this.handleEmail}
                  value={email}
                  rules={[
                    { rule: (email && email !== '') ? isValidEmail(email) : true, message: emailNotValid },
                  ]}
                  showerrors={`${showerrors}`}
                  InputProps={{
                    disableUnderline: true,
                    classes: {
                      input: `subscribe-email light-input ${email === '' || isValidEmail(email) ? 'box-input' : 'box-input-error'}`,
                    },
                  }}
                />
              </div>
              <div className='pre-footer-submit-button'>
                <Button
                  className={!(termsChecked && isValidEmail(email)) ? 'disabled' : ''}
                  id='subscribe-btn'
                  testid='subscribe-btn'
                  variant='contained'
                  color='primary'
                  size='large'
                  fullWidth
                  style={{ color: '#ffffff' }}
                  onClick={this.subscribe(email)}
                >
                  <FormattedMessage id='landing.subscribe.subscribe' />
                </Button>
              </div>
            </div>
            <div className='pre-footer-checkbox'>
              <Checkbox
                id='subscribe-terms'
                testid='subscribe-terms'
                name='checked'
                value='checked'
                checked={termsChecked}
                onChange={this.handleCheckboxChange}
                label={
                  <span className='terms-checkbox'>
                    <FormattedMessage id='landing.subscribe.terms.1' /> <a href={`mailto:${themeEmail}`}><FormattedMessage id='landing.subscribe.email' /></a>.
                    {theme.name !== 'bnpp' && <><FormattedMessage id='landing.subscribe.terms.2' /> <a href='privacy'><FormattedMessage id='landing.subscribe.terms.3' /></a>.</>}
                  </span>
                }
              />
            </div>
            <div className='footer-fab' onClick={this.scrollTop}>
              <KeyboardArrowUpIcon />
            </div>
          </div>
          <div className='pre-footer-pdf'>
            <Typography variant='display3' className='pre-footer-header'>
              <FormattedMessage id='landing.pdf.title' />
            </Typography>
            <p><FormattedMessage id='landing.pdf.text' /></p>
            <Button
              id='download-pdf-btn'
              testid='download-pdf-btn'
              variant='outlined'
              className='pdf-button'
              size='large'
              onClick={this.downloadPdf}
              fullWidth
            >
              <FormattedMessage id='landing.pdf.download' />
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

SectionSubscribe.propTypes = {
  intl: object.isRequired,
  sendNewsletterForm: func,
  newsletter: object,
  theme: object.isRequired,
}

export default SectionSubscribe
