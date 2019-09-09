import React, { Component } from 'react'
import { any, func, string, array, node, bool, number } from 'prop-types'
import TextField from '@material-ui/core/TextField'
import SelectInput from 'components/SelectInput'

class FormField extends Component {
  state = {
    errors: [],
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { rules, showerrors } = nextProps
    const { changed } = this.state
    const errors = rules && rules.filter(r => (showerrors === 'true' ? !r.rule : !r.rule && changed))
    const messages = errors && errors.map(e => e.message).join(', ')

    if (this.props.value !== nextProps.value) {
      this.props.onChange({
        target: {
          name: nextProps.name,
          value: nextProps.value,
          ...(nextProps.index && { index: nextProps.index }),
        },
      }, errors)
      this.setState({
        errors,
        messages,
        changed: true,
      })
    } else {
      this.setState({
        errors,
        messages,
      })
    }
  }

  render () {
    const { errors, messages } = this.state
    const { type, endadornment, startadornment, nobackground, disabled, bigfont, readOnly, required, inputtype, backgroundcolor, testid } = this.props

    return (
      <div className='form-field-container'>
        {type === 'select'
          ? <SelectInput
            key='form-field'
            helperText={messages}
            error={errors && errors.length > 0}
            labelprops={{
              shrink: true,
            }}
            {...this.props}
          />
          : <TextField
            key='form-field'
            error={errors && errors.length > 0}
            helperText={messages}
            classes={{ root: 'root' }}
            InputProps={{
              disableUnderline: true,
              classes: {
                input: `
                  ${!nobackground ? errors && errors.length > 0 ? 'box-input-error ' : 'box-input ' : ''}
                  ${endadornment && 'endadornement-container '}
                  ${startadornment && 'startadornement-container '}
                  ${disabled && 'disabled'}
                  ${backgroundcolor && `${backgroundcolor}-background`}`,
                root: `${bigfont && 'bigfont'}`,
              },
              startAdornment: startadornment,
              endAdornment: endadornment,
              type: inputtype,
            }}
            inputProps={{
              readOnly,
              testid,
            }}
            InputLabelProps={{
              shrink: true,
              required: false,
            }}
            {...this.props}
          />}
        {required && <span key='form-field-required' className='required-symbol'>*</span>}
      </div>
    )
  }
}

FormField.defaultProps = {
  onChange: () => {},
}

FormField.propTypes = {
  onChange: func.isRequired,
  name: string.isRequired,
  rules: array,
  value: any,
  showerrors: any,
  index: string,
  type: string,
  endadornment: node,
  startadornment: node,
  nobackground: number,
  disabled: bool,
  bigfont: string,
  readOnly: bool,
  required: bool,
  inputtype: string,
  backgroundcolor: string,
  testid: string,
}

export default FormField
