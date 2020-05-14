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
  Form,
  Button,
  Input,
  Label,
  Field,
  ErrorMsg,
  Placeholder,
} from './subComponents'
import {
  isRequired,
  isValidEmail,
  isValidPass,
  isValidURL,
} from 'util/validations'

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
    <Form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      handleSubmit(formState.values)
    }}
    >
      <Field>
        <Placeholder>
          <Label
            focused={formState.focused.name}
            error={formState.touched.name && formState.errors.name}
          >
            Name
          </Label>
        </Placeholder>
        <Input
          name='name'
          placeholder='Name'
          type='text'
          onChange={handleChange}
          onFocus={handleFocus}
          focused={formState.focused.name}
          autoFocus
          error={formState.touched.name && formState.errors.name}
        />
        <Placeholder>
          <ErrorMsg>{formState.touched.name && formState.errors.name && formState.errorMsgs.name}</ErrorMsg>
        </Placeholder>
      </Field>

      <Field>
        <Placeholder>
          <Label
            focused={formState.focused.email}
            error={formState.touched.email && formState.errors.email}
          >
            E-mail
          </Label>
        </Placeholder>
        <Input
          name='email'
          placeholder='E-mail'
          type='email'
          value={formState.values.email}
          onChange={handleChange}
          onFocus={handleFocus}
          focused={formState.focused.email}
          error={formState.touched.email && formState.errors.email}
        />
        <Placeholder>
          <ErrorMsg>{formState.touched.email && formState.errors.email && formState.errorMsgs.email}</ErrorMsg>
        </Placeholder>
      </Field>

      <Button type='submit' disabled={!formState.isValid}>Next</Button>
    </Form>
  )
}

const OrganisationDetailsForm: React.FC<{
  handleSubmit: (organisationDetails: OrganisationDetails) => void,
}> = ({ handleSubmit }) => {
  const [t] = useTranslation()
  const { formState, handleFocus, handleChange } = useForm({
    name: '',
    website: '',
    vat: '',
  }, {
    name: {
      rules: [isRequired],
      message: t('registerForm.warnings.organisationName'),
    },
    website: {
      rules: [isRequired, isValidURL],
      message: t('registerForm.warnings.website'),
    },
    vat: {
      rules: [isRequired],
      message: t('registerForm.warnings.vat'),
    },
  })

  return (
    <Form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      handleSubmit(formState.values)
    }}
    >
      <Field>
        <Placeholder>
          <Label
            focused={formState.focused.name}
            error={formState.touched.name && formState.errors.name}
          >
            Organisation Name
          </Label>
        </Placeholder>
        <Input
          name='name'
          placeholder='Organisation Name'
          type='text'
          onChange={handleChange}
          onFocus={handleFocus}
          focused={formState.focused.name}
          autoFocus
          error={formState.touched.name && formState.errors.name}
        />
        <Placeholder>
          <ErrorMsg>{formState.touched.name && formState.errors.name && formState.errorMsgs.name}</ErrorMsg>
        </Placeholder>
      </Field>

      <Field>
        <Placeholder>
          <Label
            focused={formState.focused.website}
            error={formState.touched.website && formState.errors.website}
          >
            Website
          </Label>
        </Placeholder>
        <Input
          name='website'
          placeholder='Website'
          type='url'
          onChange={handleChange}
          onFocus={handleFocus}
          focused={formState.focused.website}
          autoFocus
          error={formState.touched.website && formState.errors.website}
        />
        <Placeholder>
          <ErrorMsg>{formState.touched.website && formState.errors.website && formState.errorMsgs.website}</ErrorMsg>
        </Placeholder>
      </Field>

      <Field>
        <Placeholder>
          <Label
            focused={formState.focused.vat}
            error={formState.touched.vat && formState.errors.vat}
          >
            VAT
          </Label>
        </Placeholder>
        <Input
          name='vat'
          placeholder='VAT'
          type='text'
          onChange={handleChange}
          onFocus={handleFocus}
          focused={formState.focused.vat}
          autoFocus
          error={formState.touched.vat && formState.errors.vat}
        />
        <Placeholder>
          <ErrorMsg>{formState.touched.vat && formState.errors.vat && formState.errorMsgs.vat}</ErrorMsg>
        </Placeholder>
      </Field>

      <Button type='submit' disabled={!formState.isValid}>Next</Button>
    </Form>
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
    <Form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      handleSubmit(formState.values)
    }}
    >
      <Field>
        <Placeholder>
          <Label
            focused={formState.focused.password}
            error={formState.touched.password && formState.errors.password}
          >
            Password
          </Label>
        </Placeholder>
        <Input
          name='password'
          placeholder='Password'
          type='password'
          onChange={handleChange}
          onFocus={handleFocus}
          focused={formState.focused.password}
          autoFocus
          error={formState.touched.password && formState.errors.password}
        />
        <Placeholder>
          <ErrorMsg>{formState.touched.password && formState.errors.password && formState.errorMsgs.password}</ErrorMsg>
        </Placeholder>
      </Field>

      <Button type='submit' disabled={!formState.isValid}>Create Account</Button>
    </Form>
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
}

export default RegisterForm
