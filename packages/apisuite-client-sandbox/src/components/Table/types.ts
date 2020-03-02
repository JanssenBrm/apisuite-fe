export type AlignType = 'left' | 'center' | 'right'

export interface HeaderCol {
  label: string,
  align: AlignType,
  icons?: JSX.Element[],
  xs: number,
}

export interface TableProps {
  header: HeaderCol[],
  data: (string | number)[][],
  onRowClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}
