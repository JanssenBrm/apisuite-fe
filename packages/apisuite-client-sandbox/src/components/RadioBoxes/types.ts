import { RadioGroupProps } from '@material-ui/core/RadioGroup'

export interface RadioBoxesProps {
  options: RadioBoxesOption[],
  selected: any,
  onChange?: RadioGroupProps['onChange'],
  disabled: boolean,
}

export interface RadioBoxesOption {
  label: string,
  desc: string,
  value: any,
}
