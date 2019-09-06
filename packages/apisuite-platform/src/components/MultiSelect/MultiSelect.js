import React from 'react'
import { array, string, bool, func } from 'prop-types'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import Checkbox from 'components/Checkbox'

const MultiSelect = ({ label, options, displayKey, expanded, disabled, selected, onChange, onClick }) => (
  <div className='multiselect-container'>
    <div className='multiselect-label'>{label}</div>
    <ExpansionPanel expanded={expanded} disabled={disabled} className='multiselect-panel' onChange={onClick}>
      <ExpansionPanelSummary classes={{root: 'multiselect-summary', expanded: 'summary-expanded', content: 'summary-content'}} expandIcon={<ExpandMoreIcon />}>
        <Typography className='multiselect-placeholder'>Select...</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails classes={{root: 'multiselect-details'}}>
        <FormControl component='fieldset' className='multiselect-form-control'>
          <FormGroup>
            {options.map((option, idx) => (
              <Checkbox
                key={`ms-option-${idx}`}
                multiselect='true'
                label={displayKey === 'path' ? `${option.method} ${option.path}` : option[displayKey]}
                labelProps={{
                  labelPlacement: 'start'
                }}
                checked={Boolean(selected.find(s => s.id === option.id))}
                onChange={onChange(option)}
                value={`${option.id}`}
              />
            ))}
          </FormGroup>
        </FormControl>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  </div>
)

MultiSelect.defaultProps = {
  expanded: true,
  displayKey: 'name'
}

MultiSelect.propTypes = {
  /**
   * Selection options
   */
  options: array.isRequired,
  /**
   * Field label
   */
  label: string,
  /**
   * Multiselect open flag
   */
  expanded: bool,
  /**
   * Multiselect disabled flag
   */
  disabled: bool,
  /**
   * Array of selected IDs
   */
  selected: array.isRequired,
  /**
   * On Checkbox toggle function
   */
  onChange: func.isRequired,
  /**
   * Expands the panel
   */
  onClick: func,
  /**
   * Option key to be displayed as label
   */
  displayKey: string
}

export default MultiSelect
