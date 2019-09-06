import React, { Component } from 'react'
import classnames from 'classnames'
import Button from '@material-ui/core/Button'
import { bool, object, string, func } from 'prop-types'
import Checkbox from 'components/Checkbox'
import MenuItem from '@material-ui/core/MenuItem'
import FormField, { parseErrors, isValidEmail, isValidURL } from 'components/FormField'

const typesInquiry = [
  { value: '1', key: 'question', description: 'General question' },
  { value: '2', key: 'incident', description: 'Connection incident' },
  { value: '3', key: 'problem', description: 'I found a bug' },
  { value: '4', key: 'task', description: 'Feedback' }
]
const environmentList = [
  { value: '1', key: 'sandbox', description: 'This is a Sandbox issue' },
  { value: '2', key: 'production', description: 'This is a Production incident' },
  { value: '3', key: 'fallback', description: 'This is a fallback issue (User Interface for PSD2)' }
]

class Support extends Component {
  state = {
    showErrors: false,
    form: {
      type: '1',
      environment: '',
      subject: '',
      message: '',
      refLink: '',
      fullName: '',
      email: '',
      organisation: '',
      terms: false
    },
    captcha: null,
    errors: []
  }

  componentWillMount () {
    const typeInquiryReceived = typesInquiry.filter(t => t.key === this.props.option)
    this.setState({
      form: {
        ...this.state.form,
        type: typeInquiryReceived.length > 0 ? typeInquiryReceived[ 0 ].value : '1'
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        form: { ...this.state.form },
        captcha: nextProps.captcha.value
      })
    }
  }

  navigate = route => e => {
    this.props.history.push(route)
  }

  handleChange = ({ target }, errors) => {
    this.setState({
      form: { ...this.state.form, [ target.name ]: target.value },
      errors: parseErrors(target, errors, this.state.errors)
    })
  }

  handleCheckboxChange = name => event => {
    this.setState({ form: { ...this.state.form, [ name ]: event.target.checked } })
  }

  canSubmit () {
    const { isLoggedIn } = this.props
    const { errors, form, captcha } = this.state
    const { environment, type, subject, message, fullName, email, terms } = form

    return (type === '2' && !isLoggedIn) || (type === '2' && isLoggedIn && !environment) || !type || !subject || !message ||
      (!isLoggedIn && (!fullName || !email || !terms || !captcha)) ||
      errors.length > 0
  }

  handleSubmit = (e) => {
    const { isLoggedIn, resetCaptcha, auth } = this.props
    const { errors, form, captcha } = this.state
    const { user } = auth
    const { type, environment, subject, message, fullName, email, refLink, organisation, terms } = form
    const mail = isLoggedIn ? user.email : email
    const name = isLoggedIn ? `${user.fullName}` : fullName

    const ticket = {
      subject,
      message,
      name,
      email: mail,
      type: typesInquiry[ parseInt(type) - 1 ].key,
      organization: organisation,
      refLink,
      captcha
    }
    if (type === '2' && environment !== '') {
      ticket.environment = environmentList[ +environment - 1 ].key
    }
    if ((
      (isLoggedIn) || (!isLoggedIn && fullName && email && terms && captcha)
    ) && type && subject && message && !errors.length) {
      this.props.sendSupportForm(ticket)
    } else {
      this.setState({
        showErrors: true
      })
      resetCaptcha()
    }
  }

  render () {
    const { intl, isLoggedIn } = this.props
    const { showErrors, form } = this.state
    const { environment, type, subject, message, refLink, fullName, email, organisation, terms } = form

    const typeInquiryLabel = intl.formatMessage({ id: 'support.typeinquiry.label' })
    const connectionIncidentNotLoggedInText = intl.formatMessage({ id: 'support.connection.incident.not.logged.in.label' })
    const connectionIncidentEnvironmentLabel = intl.formatMessage({ id: 'support.environment.label' })
    const subjectPlaceholder = intl.formatMessage({ id: 'support.subject.label' })
    const messagePlaceholder = intl.formatMessage({ id: 'support.message.label' })
    const refLinkLabel = intl.formatMessage({ id: 'support.refLink.label' })
    const refLinkPlaceholder = intl.formatMessage({ id: 'support.refLink.placeholder' })
    const submitBtn = intl.formatMessage({ id: 'support.submit' })
    const helpText1 = intl.formatMessage({ id: 'support.help.text1' })
    const helpText2 = intl.formatMessage({ id: 'support.help.text2' })
    const aboutyouLabel = intl.formatMessage({ id: 'support.aboutyou.label' })
    const fullnamePlaceholder = intl.formatMessage({ id: 'support.fullname.label' })
    const fullnameRequired = intl.formatMessage({ id: 'support.fullname.required' })
    const emailPlaceholder = intl.formatMessage({ id: 'support.email.label' })
    const organisationPlaceholder = intl.formatMessage({ id: 'support.organisation.label' })
    const agreeText1 = intl.formatMessage({ id: 'support.agree.text1' })
    const agreeText2 = intl.formatMessage({ id: 'support.agree.text2' })

    const errorText = intl.formatMessage({ id: 'support.email.error' })
    const errorLink = intl.formatMessage({ id: 'support.url.error' })
    return (
      <div className='support-container'>
        <div className='support-wrapper'>
          {!isLoggedIn &&
          <div>
            <FormField
              className='support-input'
              id='fullName'
              testid='support-fullname'
              name='fullName'
              fullWidth
              label={aboutyouLabel}
              placeholder={fullnamePlaceholder}
              onChange={this.handleChange}
              value={fullName}
              rules={[
                { rule: fullName, message: fullnameRequired }
              ]}
              showerrors={`${showErrors}`}
              InputLabelProps={{ shrink: true }}
            />
            <FormField
              className='support-input'
              id='email'
              testid='support-email'
              name='email'
              fullWidth
              placeholder={emailPlaceholder}
              onChange={this.handleChange}
              value={email}
              rules={[
                { rule: isValidEmail(email), message: errorText }
              ]}
              showerrors={`${showErrors}`}
              InputLabelProps={{ shrink: true }}
            />
            <FormField
              className='support-input'
              id='organisation'
              testid='support-organisation'
              name='organisation'
              fullWidth
              placeholder={organisationPlaceholder}
              onChange={this.handleChange}
              value={organisation}
              showerrors={`${showErrors}`}
              InputLabelProps={{ shrink: true }}
            />
          </div>
          }

          <FormField
            id='type'
            testid='support-inquiry-type'
            name='type'
            type='select'
            label={typeInquiryLabel}
            fullWidth
            usevalue='true'
            value={type}
            data={typesInquiry}
            onChange={this.handleChange}
            showerrors={`${showErrors}`}
            inputlabelprops={{ shrink: true }}
          >
            {typesInquiry.map((p, idx) => (
              <MenuItem
                key={idx}
                value={p.value}
              >
                {p.description}
              </MenuItem>
            ))}
          </FormField>
          <br />
          {
            type === '2' && !isLoggedIn &&
            <div className='info-box'>
              <p>{connectionIncidentNotLoggedInText}</p>
            </div>
          }
          {type === '2' && isLoggedIn &&
          <FormField
            id='connection-incident-environment'
            testid='connection-incident-environment'
            name='environment'
            type='select'
            label={connectionIncidentEnvironmentLabel}
            fullWidth
            usevalue='true'
            value={environment}
            data={environmentList}
            onChange={this.handleChange}
            showerrors={`${showErrors}`}
            inputlabelprops={{ shrink: true }}
          >
            {environmentList.map((p, idx) => (
              <MenuItem
                key={idx}
                value={p.value}
              >
                {p.description}
              </MenuItem>
            ))}
          </FormField>
          }
          <FormField
            className={
              classnames(
                'support-input',
                { [ `support-input-top` ]: isLoggedIn }
              )
            }
            id='subject'
            testid='support-subject'
            name='subject'
            fullWidth
            placeholder={subjectPlaceholder}
            onChange={this.handleChange}
            value={subject}
            showerrors={`${showErrors}`}
            InputLabelProps={{ shrink: true }}
          />
          <FormField
            id='message'
            testid='support-message'
            name='message'
            fullWidth
            multiline
            rows='4'
            placeholder={messagePlaceholder}
            onChange={this.handleChange}
            value={message}
            showerrors={`${showErrors}`}
            InputLabelProps={{ shrink: true }}
          />
          <br />
          {isLoggedIn &&
          <FormField
            className='support-input-space'
            id='refLink'
            testid='support-reflink'
            name='refLink'
            fullWidth
            label={refLinkLabel}
            placeholder={refLinkPlaceholder}
            onChange={this.handleChange}
            value={refLink}
            rules={[
              { rule: refLink ? isValidURL(refLink) : true, message: errorLink }
            ]}
            showerrors={`${showErrors}`}
            InputLabelProps={{ shrink: true }}
          />
          }
          <div className='support-actions'>
            {!isLoggedIn &&
            <Checkbox
              value='terms'
              id='agree-check'
              testid='support-agree-check'
              checked={terms}
              onChange={this.handleCheckboxChange('terms')}
              label={
                <span>
                  {/* TODO: fix navigation to handle show/hide support modal in terms page */}
                  {/* {agreeText1} <a onClick={this.navigate('/terms')} className='link'> */}
                  {agreeText1}
                  <a
                    testid='support-terms-link'
                    target='_blank'
                    rel='noopener noreferrer'
                    href='/terms'
                    className='link'>
                    {agreeText2}
                  </a>
                </span>
              }
            />
            }
            <Button
              className='support-submit'
              id='sendBtn'
              testid='support-send-btn'
              variant='contained'
              color='primary'
              onClick={this.handleSubmit}
              disabled={this.canSubmit()}>
              {submitBtn}
            </Button>
          </div>
          {isLoggedIn &&
          <div className='support-info'>
            {helpText1}
            <br />
            <a href='/docs' testid='support-docs-link' className='support-link'>{helpText2}</a>
          </div>
          }
        </div>
      </div>
    )
  }
}

Support.propTypes = {
  isLoggedIn: bool.isRequired,
  intl: object.isRequired,
  option: string,
  captcha: object.isRequired,
  resetCaptcha: func.isRequired,
  sendSupportForm: func.isRequired,
  auth: object.isRequired,
  history: object.isRequired
}

export default Support
