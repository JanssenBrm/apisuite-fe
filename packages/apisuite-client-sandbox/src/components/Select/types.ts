
export interface SelectProps {
  options: SelectOption[],
  selected?: SelectOption,
  onChange?: (event: React.ChangeEvent<{}>, value: any) => void,
  className?: string,
  disabled?: boolean,
}

export interface SelectOption {
  label: string,
  group: string,
  value: any,
}
