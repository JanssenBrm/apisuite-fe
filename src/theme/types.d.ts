import { Palette } from '@material-ui/core/styles'

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    tertiary: Palette['primary'],
    focus: Palette['primary'],
  }
  interface PaletteOptions {
    tertiary: PaletteOptions['primary'],
    focus: PaletteOptions['primary'],
  }
}
