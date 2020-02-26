interface HeaderCol {
  label: string,
  xs: number,
}

export interface TableProps {
  header: HeaderCol[],
  data: (string | number)[][],
}
