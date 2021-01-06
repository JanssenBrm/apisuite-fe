import * as React from 'react'

import TextField from '@material-ui/core/TextField'

import Autocomplete from '@material-ui/lab/Autocomplete'

import { SelectProps, SelectOption } from './types'

import useStyles from './styles'

const Select: React.FC<SelectProps> = ({
  className,
  customCloseIcon,
  customOpenIcon,
  disabled,
  fieldLabel,
  onChange,
  options,
  selected,
}) => {
  const classes = useStyles()

  return (
    <Autocomplete
      className={className}
      closeIcon={customCloseIcon}
      defaultValue={selected ? options.find((option) => option.value === selected.value) : undefined}
      disableClearable
      disabled={disabled}
      getOptionLabel={(option: SelectOption) => option.label}
      groupBy={(option: SelectOption) => option.group}
      onChange={onChange}
      options={options.sort((optionA, optionB) => -optionB.group.localeCompare(optionA.group))}
      popupIcon={customOpenIcon}
      renderInput={(params) => (
        <TextField
          {...params}
          className={classes.textField}
          fullWidth
          label={fieldLabel}
          placeholder='Make your selection'
          variant='outlined'
        />
      )}
      value={selected}
    />
  )
}

export default Select
