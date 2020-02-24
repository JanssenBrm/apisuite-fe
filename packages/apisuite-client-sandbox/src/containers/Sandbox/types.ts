import { SvgIconProps } from 'components/SvgIcon/types'
import { InformStorePayloads } from 'components/InformDialog/types'
import { AnyAction } from 'redux'

export interface SlideConfig {
  /** key should be unique to leverage render optimization */
  key: string,
  title: string,
  p1: string,
  p2?: string,
  btnStr: string,
  linkTo: string,
  btn: 1 | 2 | 3,
  imgUrl: string,
  disabled?: boolean,
}

export interface ListConfig {
  /** key should be unique to leverage render optimization */
  key: string,
  title: string,
  desc: string,
  icon: SvgIconProps['name'],
}

export interface SandboxProps {
  inform: AnyAction & { payload: InformStorePayloads['inform'] },
  requesting: boolean,
  requestError: any,
}
