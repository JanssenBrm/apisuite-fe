export const MIN_LENGTH = 12
export const MAX_LENGTH = 64
export const LOWER_MIN_LENGTH = 1
export const UPPER_MIN_LENGTH = 1
export const NUMBERS_MIN_LENGTH = 1
export const SYMBOLS_MIN_LENGTH = 1

const complexity = {
  min: MIN_LENGTH,
  max: MAX_LENGTH,
  lowerCase: LOWER_MIN_LENGTH,
  upperCase: UPPER_MIN_LENGTH,
  numbers: NUMBERS_MIN_LENGTH,
  symbols: SYMBOLS_MIN_LENGTH
}

export const hasMinLength = (str) => str.length >= complexity.min

export const hasMaxLength = (str) => str.length > complexity.max

export const hasMinLowerCase = (str, nb) => {
  const lower = str.match(/[a-z]/g)
  return lower && lower.length >= (nb || complexity.lowerCase)
}

export const hasMinUpperCase = (str, nb) => {
  const upper = str.match(/[A-Z]/g)
  return upper && upper.length >= (nb || complexity.upperCase)
}

export const hasMinNumber = (str, nb) => {
  const number = str.match(/[0-9]/g)
  return number && number.length >= (nb || complexity.numbers)
}

export const hasMinSymbol = (str, nb) => {
  const symbol = str.match(/[^a-zA-Z0-9]/g)
  return symbol && symbol.length >= (nb || complexity.symbols)
}

export const hasSpace = (str) => /\s/.test(str)

/*
 * Validates a password
 */
const validatePassword = (password) => {
  const errors = []

  if (!hasMinLength(password)) errors.push(`minimum ${complexity.min} ${complexity.min > 1 ? 'characters' : 'character'}`)
  if (hasMaxLength(password)) errors.push(`maximum ${complexity.max} characters`)
  if (!hasMinLowerCase(password)) errors.push(`minimum ${complexity.lowerCase} lower case ${complexity.lowerCase > 1 ? 'characters' : 'character'}`)
  if (!hasMinUpperCase(password)) errors.push(`minimum ${complexity.upperCase} upper case ${complexity.upperCase > 1 ? 'characters' : 'character'}`)
  if (!hasMinNumber(password)) errors.push(`minimum ${complexity.numbers} ${complexity.numbers > 1 ? 'numbers' : 'number'}`)
  if (!hasMinSymbol(password)) errors.push(`minimum ${complexity.symbols} ${complexity.symbols > 1 ? 'symbols' : 'symbol'}`)

  return errors
}

export default validatePassword
