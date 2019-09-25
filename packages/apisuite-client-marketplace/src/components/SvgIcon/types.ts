export interface SvgIconProps extends React.HTMLAttributes<SVGSVGElement> {
  /** The width and height of the icon - it should be uniform */
  size?: number | string,
  /** The icon path name */
  name:
  | 'chevron-right'
  | 'chevron-left-circle'
  | 'headset',
  /** The fill to be applied to the vector */
  color?: string,
}

export interface IconPaths {
  [iconName: string]: string,
}
