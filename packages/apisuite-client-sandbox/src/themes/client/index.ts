import { createMuiTheme } from '@material-ui/core/styles'
import themeConfig from './theme.config.json'

const fontName = themeConfig.typography.fontFamily[0]
const fontFormat = themeConfig.typography.format
const fonts = themeConfig.typography.fonts

const fontFace = fonts.map(font => {
  const fontFile = require(`./fonts/${font.file}.${fontFormat}`)
  return {
    fontFamily: fontName,
    fontStyle: font.style,
    fontWeight: font.weight,
    src: `
      local('${fontName}'),
      local('${font.file}'),
      url(${fontFile}) format('${fontFormat}')
    `,
  }
})

export default createMuiTheme({
  palette: themeConfig.palette,
  shape: themeConfig.shape,
  typography: {
    fontFamily: themeConfig.typography.fontFamily.join(','),
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': fontFace,
      },
    },
  },
  spacing: (factor: number) => 8 * factor,
}, {
  images: {},
  gradients: themeConfig.gradients,
})
