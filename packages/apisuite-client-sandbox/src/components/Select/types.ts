
export interface SelectProps {
  options: SelectOption[],
  selected?: SelectOption,
  onChange?: (event: React.ChangeEvent<{}>, value: any) => void,
  className?: string,
}

export interface SelectOption {
  label: string,
  group: string,
  value: any,
}
