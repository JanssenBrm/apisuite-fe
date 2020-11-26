import { Theme } from '../theme'
import { ButtonProps as MaterialButton } from '@material-ui/core'

export type ButtonProps = {
  btncolor?: string
} & MaterialButton

export type $ButtonProps = {
  btncolor?: string
  theme: Theme
}
