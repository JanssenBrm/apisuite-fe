import { SvgIconProps } from 'components/SvgIcon/types'

export interface SlideConfig {
  /** key should be unique to leverage render optimization */
  key: string,
  title: string,
  p1: string,
  p2?: string,
  btnStr: string,
  btn: 1 | 2 | 3,
  imgUrl: string,
}

export interface ListConfig {
  /** key should be unique to leverage render optimization */
  key: string,
  title: string,
  desc: string,
  icon: SvgIconProps['name'],
}
