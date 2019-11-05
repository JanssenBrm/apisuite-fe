import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Radio, { RadioProps } from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import useStyles from './styles'
import { RadioBoxesProps } from './types'
import clsx from 'clsx'

const WhiteRadio = withStyles({ root: { color: 'white' } })((props: RadioProps) => <Radio {...props} />)

const RadioBoxes: React.FC<RadioBoxesProps> = ({ options, selected, onChange }) => {
  const classes = useStyles()

  const handleOptionClick = (value: any) => (event: any) => {
    onChange && onChange(event, value)
  }

  return (
    <RadioGroup className={classes.radioGroup} value={selected} onChange={onChange}>
      {options.map(({ value, label, desc }) => (
        <div
          key={value}
          className={clsx(classes.controlWrapper, { [classes.unselected]: value !== selected })}
          onClick={handleOptionClick(value)}
        >
          <FormControlLabel
            className={classes.controlLabel}
            label={label}
            value={value}
            control={<WhiteRadio color='primary' />}
          />

          <p className={classes.desc}>{desc}</p>
        </div>
      ))}
    </RadioGroup>
  )
}

export default RadioBoxes
