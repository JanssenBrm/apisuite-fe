
export interface SelectProps {
  options: SelectOption[],
  selected?: SelectOption,
}

export interface SelectOption {
  label: string,
  group: string,
  value: any,
}
