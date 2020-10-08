/** Endpoints constants */

const { hostname } = window.location;

export const IS_CLOUD = hostname.indexOf(".cloud.apisuite.io") >= 0
export const AUTH_URL = getAuthUrl()
export const API_URL = getApiUrl()
export const SIGNUP_PORT = process.env.SIGNUP_PORT || ''
export const LOGIN_PORT = process.env.LOGIN_PORT || ''

function getApiUrl() {
  if (IS_CLOUD) {
    // Transform the Portal's hostname into the API's hostname
    // Ex: ${client}.cloud.apisuite.io -> ${client}-apisuite-api.cloud.apisuite.io
    const apiHostname = hostname.replace(".", "-apisuite-api.")
    return `https://${apiHostname}`
  }

  return process.env.API_URL || '';
}

function getAuthUrl() {
  if (IS_CLOUD) {
    // Transform the Portal's hostname into the API's hostname
    // Ex: ${client}.cloud.apisuite.io -> ${client}-hydraapi.cloud.apisuite.io
    const authHostname = hostname.replace(".", "-hydraapi.")
    return `https://${authHostname}`
  }

  return process.env.AUTH_URL || '';
}
