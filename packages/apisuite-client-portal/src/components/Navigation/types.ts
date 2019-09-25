
export interface NavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  tabNames: string[],
  tabIndex: number,
  chevronColor?: string,
  onTabChange: (index: number) => void,
  onGobackClick?: () => void,
}
