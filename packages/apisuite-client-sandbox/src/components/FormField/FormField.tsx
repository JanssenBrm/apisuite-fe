import * as React from 'react'
import TextField from '@material-ui/core/TextField'
import classnames from 'classnames'

import { FormFieldProps } from './types'

const FormField: React.FC<FormFieldProps> = (props) => {
  const {
    label,
    InputLabelProps,
    onBlur,
    onFocus,
    variant = 'outlined' as any,
    margin = 'dense',
    fullWidth = true,
    value,
    errorPlacing,
    ...rest
  } = props

  const [errors, setErrors] = React.useState()
  const [changed, setChanged] = React.useState(false)

  function handleOnFocus (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    // TODO: Fix this
    // @ts-ignore
    onFocus && onFocus(event)
  }

  function handleOnBlur (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setChanged(true)

    // TODO: Fix this
    // @ts-ignore
    onBlur && onBlur(event)
  }

  React.useEffect(() => {
    const err = props.rules && props.rules.filter(r => (props.showErrors ? !r.rule : changed && !r.rule))
    // const messages = err && err.map(e => e.message).join(', ')

    props.onChange({
      target: {
        name: props.name,
        value: value,
      },
    }, err)
    setErrors(err)
    // setChanged(true)
  }, [value, changed])

  return (
    <div
      style={{ width: fullWidth ? '100%' : undefined }}
      className='formfield-wrapper'
    >
      <TextField
        className='formfield'
        label={label}
        error={errors && errors.length > 0}
        variant={variant}
        margin={margin}
        fullWidth={fullWidth}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        {...rest}
      />
      {errors && errors.length > 0 &&
        <div className={classnames('formfield-errors', errorPlacing)}>
          {errors && errors.length > 0 && errors.map((e: any) => e.message)}
        </div>}
    </div>
  )
}

export default FormField
