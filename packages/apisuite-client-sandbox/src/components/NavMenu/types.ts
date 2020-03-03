export interface NavMenuProps {
  options: string[],
  selected: number,
  handleSelect: (indx: number) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
}
