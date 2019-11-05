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
    ...rest
  } = props

  const [labelFocus, setLabelFocus] = React.useState(false)

  function handleOnFocus (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setLabelFocus(true)

    onFocus && onFocus(event)
  }

  function handleOnBlur (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setLabelFocus(false)

    onBlur && onBlur(event)
  }

  return (
    <div style={{ width: fullWidth ? '100%' : undefined }}>
      {label && (
        <InputLabel
          shrink
          focused={labelFocus}
          {...InputLabelProps}
        >
          {label}
        </InputLabel>
      )}

      <TextField
        variant={variant}
        margin={margin}
        fullWidth={fullWidth}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        {...rest}
      />
    </div>
  )
}

export default FormField
