/**
 * Global constants
 */

/**
 * User roles
 */
export const USER_ROLES = ['user', 'admin']

/**
 * Basic b64
 */
export const basicb64 = btoa(`${process.env.DEV_PORTAL_CLIENT_ID}:${process.env.DEV_PORTAL_CLIENT_SECRET}`)

/**
 * ReCaptcha
 */
export const RECAPTCHA_KEY = process.env.RECAPTCHA_KEY

console.log(RECAPTCHA_KEY)

/**
 * App Theme
 */
export const THEME = process.env.THEME || 'default'

/**
 * Organization states
 */
export const organizationStates = {
  NON_TRUSTED: {
    name: 'Non Trusted',
    slug: 'nontrusted',
    sandboxtext: 'Sandbox Access',
  },
  TRUSTED: {
    name: 'Trusted',
    slug: 'trusted',
    sandboxtext: 'Sandbox Access',
  },
  NON_VALIDATED: {
    name: 'Non Validated',
    slug: 'nonvalidated',
    sandboxtext: 'No Sandbox Access',
  },
}
