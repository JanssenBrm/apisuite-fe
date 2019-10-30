export interface SvgIconProps extends React.HTMLAttributes<SVGSVGElement> {
  /** The width and height of the icon - it should be uniform */
  size?: number | string,
  /** The icon path name */
  name:
  | 'chevron-right'
  | 'chevron-up'
  | 'chevron-left-circle'
  | 'chevron-right-circle'
  | 'headset'
  | 'airplane-landing'
  | 'paw'
  | 'infinity'
  |'human-pregnant'
  | 'animation-play-outline'
  |'cloud-outline'
  | 'account-multiple-plus-outline'
  | 'account-multiple'
  | 'fingerprint'
  | 'usb'
  | 'shield-check-outline'
  | 'book-open'
  | 'briefcase'
  | 'fullscreen'
  | 'key'
  | 'earth'
  | 'twitter'
  | 'facebook'
  | 'github-face'
  | 'plus'
  | 'dots-vrtical'
  | 'circle',
  /** The fill to be applied to the vector */
  color?: string,
}

export interface IconPaths {
  [iconName: string]: string,
}
