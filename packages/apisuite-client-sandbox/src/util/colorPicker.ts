import { Color } from '@material-ui/core'

function isColorShade (value: string | number): value is keyof Color {
  const allowedKeys: (string | number)[] = [
    50,
    100,
    200,
    300,
    400,
    500,
    600,
    700,
    800,
    900,
    'A100',
    'A200',
    'A400',
    'A700',
  ]

  return allowedKeys.indexOf(value) !== -1
}

export const colorPicker = (color: Partial<Color>, shade: keyof Color, fallback: string) => {
  if (!isNaN(parseInt(Object.keys(color)[0])) && typeof shade === 'number') {
    let themeShade
    let closestShade = parseInt(Object.keys(color)[0])
    for (themeShade in color) {
      const shadeNumber = parseInt(themeShade)
      if (shadeNumber) {
        const shadeDiff = Math.abs(shadeNumber - shade)
        const closestDiff = Math.abs(closestShade - shade)
        if (shadeDiff < closestDiff) {
          closestShade = shadeNumber
        }
      }
    }
    if (isColorShade(closestShade)) {
      return color[closestShade]
    }
  }
  return fallback
}
