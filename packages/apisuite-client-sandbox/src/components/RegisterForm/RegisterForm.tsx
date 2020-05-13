import * as React from 'react'
import {
  RegisterFormProps,
  PersonalDetails,
  OrganisationDetails,
  SecurityStep,
} from './types'
import { useTranslation } from 'react-i18next'
import { Redirect } from 'react-router-dom'
import StepsProgress from 'components/StepsProgress'
import { useForm } from 'util/useForm'
import {
  isRequired,
  isValidEmail,
  isValidPass,
} from 'util/validations'
// import FormCard from 'components/FormCard'
// import FormField, { parseErrors, isValidEmail, isValidPass } from 'components/FormField'
// import useStyles from './styles'
// import IconButton from '@material-ui/core/IconButton'
// import Visibility from '@material-ui/icons/Visibility'
// import VisibilityOff from '@material-ui/icons/VisibilityOff'
// import InputAdornment from '@material-ui/core/InputAdornment'
// import { FormFieldEvent } from 'components/FormField/types'

const PersonalDetailsForm: React.FC<{
  handleSubmit: (personalDetails: PersonalDetails) => void,
  prefilledEmail?: string,
}> = ({ handleSubmit, prefilledEmail = '' }) => {
  const [t] = useTranslation()
  const { formState, handleFocus, handleChange } = useForm({
    name: '',
    email: prefilledEmail,
  }, {
    name: {
      rules: [isRequired],
      message: t('registerForm.warnings.name'),
    },
    email: {
      rules: [isValidEmail],
      message: t('registerForm.warnings.email'),
    },
  })

  return (
    <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      handleSubmit(formState.values)
    }}
    >
      <label>Name:</label>
      <input name='name' onChange={handleChange} onFocus={handleFocus} />

      <label>Email:</label>
      <input name='email' value={formState.values.email} onChange={handleChange} onFocus={handleFocus} />

      <button type='submit' disabled={formState.isValid}>Submit</button>
    </form>
  )
}

const OrganisationDetailsForm: React.FC<{
  handleSubmit: (organisationDetails: OrganisationDetails) => void,
}> = ({ handleSubmit }) => {
  const { formState, handleFocus, handleChange } = useForm({
    name: '',
    website: '',
    vat: '',
  })

  return (
    <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      handleSubmit(formState.values)
    }}
    >
      <label>Organisation Name:</label>
      <input name='name' onChange={handleChange} onFocus={handleFocus} />

      <label>Website:</label>
      <input name='website' onChange={handleChange} onFocus={handleFocus} />

      <label>VAT:</label>
      <input name='vat' onChange={handleChange} onFocus={handleFocus} />

      <button type='submit' disabled={formState.isValid}>Submit</button>
    </form>
  )
}

const SecurityStepForm: React.FC<{
  handleSubmit: (securityStep: SecurityStep) => void,
}> = ({ handleSubmit }) => {
  const [t] = useTranslation()
  const { formState, handleFocus, handleChange } = useForm({
    password: '',
  }, {
    password: {
      rules: [isValidPass],
      message: t('registerForm.warnings.password'),
    },
  })

  return (
    <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      handleSubmit(formState.values)
    }}
    >
      <label>Password:</label>
      <input name='password' onChange={handleChange} onFocus={handleFocus} />

      <button type='submit'>Submit</button>
    </form>
  )
}

export let steps = {
  1: 'STEP 1',
  2: 'STEP 2',
  3: 'STEP 3',
  4: 'Success',
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  step,
  submitPersonalDetails,
  submitOrganisationDetails,
  submitSecurityStep,
  prefilledEmail = '',
}) => {
  const [t] = useTranslation()
  steps = {
    ...steps,
    1: t('registerForm.steps.personalDetails'),
    2: t('registerForm.steps.organisationDetails'),
    3: t('registerForm.steps.securityStep'),
  }

  // const submitEnter = (event: KeyboardEvent) => {
  //   const { key } = event
  //   const inputEl = document.getElementById('pass-field')

  //   if (key === 'Enter' && document.activeElement === inputEl && isFormValid) {
  //     handleSubmit(event)
  //   }
  // }

  // React.useEffect(() => {
  //   window.addEventListener('keydown', submitEnter)

  //   return () => {
  //     window.removeEventListener('keydown', submitEnter)
  //   }
  // }, [submitEnter])

  const formStep = (step: keyof typeof steps) => {
    switch (step) {
      case 1:
        return <PersonalDetailsForm prefilledEmail={prefilledEmail} handleSubmit={submitPersonalDetails} />
      case 2:
        return <OrganisationDetailsForm handleSubmit={submitOrganisationDetails} />
      case 3:
        return <SecurityStepForm handleSubmit={submitSecurityStep} />
      case 4:
        return <Redirect to='/confirmation' />
    }
  }

  return (
    <>
      <StepsProgress steps={steps} currentStep={step} />
      {formStep(step)}
    </>
  )
  // return (
  //   <div className={classes.registerContainer}>
  //     <div>
  //       <FormCard
  //         buttonLabel={registerButtonLabel}
  //         buttonDisabled={!isFormValid}
  //         loading={register.isRegistering}
  //         error={register.error}
  //         handleSubmit={handleSubmit}
  //       >
  //         <div className={classes.fieldContainer}>
  //           <FormField
  //             id='name-field'
  //             label='Your name'
  //             variant='outlined'
  //             type='text'
  //             name='name'
  //             value={input.name}
  //             onChange={handleInputs}
  //             autoFocus
  //             fullWidth
  //             errorPlacing='bottom'
  //             InputProps={{
  //               classes: { input: classes.emailTextfield },
  //             }}
  //             rules={[
  //               { rule: input.name.length > 0, message: t('registerForm.warnings.name') },
  //             ]}
  //           />
  //         </div>
  //         <div className={classes.fieldContainer}>
  //           <FormField
  //             id='email-field'
  //             label='E-mail'
  //             variant='outlined'
  //             type='email'
  //             name='email'
  //             value={input.email}
  //             onChange={handleInputs}
  //             fullWidth
  //             errorPlacing='bottom'
  //             InputProps={{
  //               classes: { input: classes.emailTextfield },
  //             }}
  //             rules={[
  //               { rule: isValidEmail(input.email), message: t('registerForm.warnings.email') },
  //             ]}
  //           />
  //         </div>
  //         <div className={classes.fieldContainer}>
  //           <div className={classes.passPhraseContainer}>
  //             <FormField
  //               id='pass-field'
  //               label='Password'
  //               variant='outlined'
  //               type={showPassword ? 'text' : 'password'}
  //               name='password'
  //               value={input.password}
  //               fullWidth
  //               errorPlacing='bottom'
  //               onChange={handleInputs}
  //               rules={[
  //                 { rule: isValidPass(input.password), message: t('registerForm.warnings.password') },
  //               ]}
  //               InputProps={{
  //                 classes: { input: classes.passPhrasefield },
  //                 endAdornment:
  // <InputAdornment position='end'>
  //   <IconButton
  //     aria-label='toggle password visibility'
  //     onClick={handleClickShowPassword}
  //     edge='end'
  //   >
  //     {showPassword ? <Visibility /> : <VisibilityOff />}
  //   </IconButton>
  // </InputAdornment>,
  //               }}
  //             />
  //           </div>

  //         </div>
  //       </FormCard>
  //     </div>
  //   </div>
  // )
}

export default RegisterForm
