import * as React from 'react'
import { RegisterFormProps } from './types'
import { useTranslation } from 'react-i18next'
import { Redirect } from 'react-router-dom'
import StepsProgress from 'components/StepsProgress'
// import FormCard from 'components/FormCard'
// import FormField, { parseErrors, isValidEmail, isValidPass } from 'components/FormField'
// import useStyles from './styles'
// import IconButton from '@material-ui/core/IconButton'
// import Visibility from '@material-ui/icons/Visibility'
// import VisibilityOff from '@material-ui/icons/VisibilityOff'
// import InputAdornment from '@material-ui/core/InputAdornment'
// import { FormFieldEvent } from 'components/FormField/types'

const PersonalDetails: React.FC<{handleSubmit: any}> = ({ handleSubmit }) => {
  return (
    <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      handleSubmit({
        name: 'johnaa',
        email: 'john@gmmaiaaal.com',
      })
    }}
    >
      <input name='name' />
      <button type='submit'>Submit</button>
    </form>
  )
}

const OrganisationDetails: React.FC<{handleSubmit: any}> = ({ handleSubmit }) => {
  return (
    <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      handleSubmit({
        name: 'johnOrgaaaa',
        website: 'www.johnOasdasrgaaa.com',
        vat: '12342323',
      })
    }}
    >
      <input name='name' />
      <button type='submit'>Submit</button>
    </form>
  )
}

const SecurityStep: React.FC<{handleSubmit: any}> = ({ handleSubmit }) => {
  return (
    <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      handleSubmit({
        password: 'ezpasswordAAA$B$$',
      })
    }}
    >
      <input name='security' />
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

// const RegisterForm: React.FC<RegisterFormProps> = ({ register, registerUser, defaultEmail }) => {
const RegisterForm: React.FC<RegisterFormProps> = ({
  step,
  submitPersonalDetails,
  submitOrganisationDetails,
  submitSecurityStep,
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
        return <PersonalDetails handleSubmit={submitPersonalDetails} />
      case 2:
        return <OrganisationDetails handleSubmit={submitOrganisationDetails} />
      case 3:
        return <SecurityStep handleSubmit={submitSecurityStep} />
      case 4:
        return <Redirect to='/' />
    }
  }

  return (
    <>
      <StepsProgress steps={steps} step={step} />
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
