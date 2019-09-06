export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(String(email).toLowerCase())
}

export const isValidURL = (url) => {
  const re = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/
  return re.test(String(url).toLowerCase())
}

export const isValidPhoneNumber = (number) => {
  const re = /^(\+|00)[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]{6,14}$/
  return re.test(number)
}

export const isValidRecoveryCode = (code) => {
  const re = /^[\d\w]{5}-[\d\w]{5}$/
  return re.test(code)
}

export const parseErrors = (target, errors, stateErrors) => {
  const newStateErrors = [...stateErrors]
  if (errors && errors.length) {
    if (newStateErrors.indexOf(target.name) < 0) {
      newStateErrors.push(target.name)
    }
  } else if (errors && !errors.length) {
    if (newStateErrors.indexOf(target.name) >= 0) {
      newStateErrors.splice(newStateErrors.indexOf(target.name), 1)
    }
  }
  return newStateErrors
}

export { default } from './FormField'
