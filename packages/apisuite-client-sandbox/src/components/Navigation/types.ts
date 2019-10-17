
export interface NavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  tabNames: string[],
  tabIndex: number,
  logoSrc: string,
  onTabChange: (index: number) => void,
}
