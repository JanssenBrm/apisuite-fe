import React from 'react'
import { node, string, func } from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'
import FormHelperText from '@material-ui/core/FormHelperText'
import classnames from 'classnames'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

const SelectInput = ({ helperText, children, displayKey, ...custom }) => (
  <FormControl {...custom}>
    {custom.label &&
      <InputLabel
        shrink={custom.shrink && Boolean(custom.shrink)}
        {...custom.labelprops}
        htmlFor='select-multiple'
        required={false}
      >
        {custom.label}
      </InputLabel>
    }
    <Select
      classes={{icon: `select-icon ${custom.disabled && 'hide-icon'}`}}
      children={children}
      input={<Input disableUnderline id='select-multiple' />}
      renderValue={selected => {
        const itemIndex = custom.data.findIndex(item => (custom.usevalue ? item.value : item[displayKey]) === selected)
        return (
          custom.multiple
            ? <div className='chips'>
              {selected.map(value => {
                const chip = custom.data.find(item => item.id === value)
                return (chip &&
                  <Chip key={chip.id} label={chip[displayKey]} className='chip' />)
              })}
            </div>
            : <span className='select-single'>{itemIndex === -1 ? selected : custom.data[itemIndex][displayKey]}</span>
        )
      }}
      SelectDisplayProps={{
        className: classnames(
          'select-display',
          { 'disabled': custom.disabled }
        )
      }}
      IconComponent={KeyboardArrowDownIcon}
      {...custom}
    />
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
)

SelectInput.defaultProps = {
  onChange: () => {},
  displayKey: 'description'
}

SelectInput.propTypes = {
  children: node,
  onChange: func,
  helperText: string,
  displayKey: string
}

export default SelectInput
