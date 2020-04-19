
export interface SelectProps {
  options: SelectOption[],
  selected?: SelectOption,
  onChange?: (event: React.ChangeEvent<{}>, value: any) => void,
}

export interface SelectOption {
  label: string,
  group: string,
  value: any,
}
