import * as React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { SelectProps, SelectOption } from './types'
import useStyles from './styles'

const Select: React.FC<SelectProps> = ({
  options,
  selected,
  onChange,
  className,
  disabled,
}) => {
  const classes = useStyles()

  return (
    <Autocomplete
      className={className}
      options={options.sort((a, b) => -b.group.localeCompare(a.group))}
      groupBy={(option: SelectOption) => option.group}
      getOptionLabel={(option: SelectOption) => option.label}
      defaultValue={selected ? options.find((opt) => opt.value === selected.value) : undefined}
      value={selected}
      onChange={onChange}
      disabled={disabled}
      renderInput={params => (
        <TextField
          {...params}
          name={name}
          className={classes.textField}
          placeholder='Select...'
          variant='outlined'
          fullWidth
        />
      )}
    />
  )
}

export default Select
