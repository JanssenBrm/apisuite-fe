import { THEME } from 'constants/global'

const theme = require(`./${THEME}`)

export type Theme = typeof theme
