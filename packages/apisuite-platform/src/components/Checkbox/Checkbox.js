import React from 'react'
import { bool, node, object, func } from 'prop-types'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'

const CustomCheckbox = ({ checked, onChange, label, labelProps, ...props }) => (
  <div className='checkbox-container'>
    <FormControlLabel
      {...labelProps}
      label={label}
      classes={{ root: `form-control-label ${props.multiselect && 'multiselect'}` }}
      control={
        <Checkbox
          {...props}
          classes={{ root: 'checkbox' }}
          checked={checked}
          color='primary'
          icon={<CheckBoxOutlineBlankIcon color='primary' />}
          onChange={onChange}
        />
      }
    />
  </div>
)

CustomCheckbox.propTypes = {
  /**
   * Checkbox state
   */
  checked: bool,
  /**
   * Checkbox label
   */
  label: node,
  /**
   * FormControlLabel props (e.g labelPlacement)
   */
  labelProps: object,
  /**
   * Callback when checkbox changes state
   */
  onChange: func.isRequired,
}

export default CustomCheckbox
