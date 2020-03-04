export interface TableNavigationProps {
  prevLabel: string,
  nextLabel: string,
  tablePage: number,
  maxPages: number,
  onPageClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  navigateClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  disableNav: {
    previous: boolean,
    next: boolean,
  },
}
