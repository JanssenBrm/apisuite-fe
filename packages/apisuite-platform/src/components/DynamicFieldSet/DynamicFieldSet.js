import React from 'react'
import { string, array, func, bool } from 'prop-types'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import FormField, { isValidURL } from 'components/FormField'

const DynamicFieldSet = ({ fields, errorMessage, actionLabel, inputLabel, initialData, onAdd, onRemove, ...props }) => (
  <div className='dynamic-fieldset-container'>
    {fields.map((field, index) => (
      <div key={index} className='row'>
        <FormField
          className='text-field'
          id={`dynamic-field-${index}`}
          name={`${field}`}
          index={`${index}`}
          placeholder={'https://my-new-app.be'}
          value={fields[index]}
          rules={[
            {rule: isValidURL(field), message: errorMessage}
          ]}
          inputProps={{index}}
          {...props}
        />
        {!props.disabled && <IconButton id='remove-button' aria-label='Remove' color='primary' onClick={onRemove(index)}>
          <RemoveCircleOutlineIcon />
        </IconButton>}
      </div>
    ))}
    <Button
      disabled={props.disabled}
      variant='outlined'
      color='primary'
      className='add-button'
      onClick={onAdd}
    >
      <AddIcon />
      {actionLabel}
    </Button>
  </div>
)

DynamicFieldSet.propTypes = {
  errorMessage: string,
  actionLabel: string,
  inputLabel: string,
  initialData: array,
  fields: array,
  onAdd: func,
  onRemove: func,
  disabled: bool
}

export default DynamicFieldSet
