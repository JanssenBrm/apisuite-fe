import * as React from 'react'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'

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
    ...rest
  } = props

  const [labelFocus, setLabelFocus] = React.useState(false)
  const [errors, setErrors] = React.useState()
  const [changed, setChanged] = React.useState(false)

  function handleOnFocus (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setLabelFocus(true)
    // TODO: Fix this
    // @ts-ignore
    onFocus && onFocus(event)
  }

  function handleOnBlur (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setLabelFocus(false)
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
    <div style={{ width: fullWidth ? '100%' : undefined }}>
      {label && (
        <InputLabel
          error={errors && errors.length > 0}
          shrink
          focused={labelFocus}
          {...InputLabelProps}
        >
          {label}
        </InputLabel>
      )}

      <TextField
        error={errors && errors.length > 0}
        variant={variant}
        margin={margin}
        fullWidth={fullWidth}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        {...rest}
      />
      {errors && errors.map((e: any) => e.message)}
    </div>
  )
}

export default FormField
