import * as React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { SelectProps, SelectOption } from './types'

const Select: React.FC<SelectProps> = ({ options, selected }) => (
  <Autocomplete
    options={options.sort((a, b) => -b.group.localeCompare(a.group))}
    groupBy={(option: SelectOption) => option.group}
    getOptionLabel={(option: SelectOption) => option.label}
    defaultValue={selected ? options.find((opt) => opt.value === selected.value) : undefined}
    renderInput={params => (
      <TextField
        {...params}
        placeholder='Select...'
        variant='outlined'
        fullWidth
      />
    )}
  />
)

export default Select
