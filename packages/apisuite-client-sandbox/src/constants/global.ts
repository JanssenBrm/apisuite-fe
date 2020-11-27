
import sandboxConfig from '../../sandbox.config.json'
import { SandboxConfig, Roles } from './types.js'

export const config: SandboxConfig = sandboxConfig

export const DEFAULT_SUPPORT_URL =
  'https://intercom.help/api-suite/en/articles/4586659-api-portal-users'

export const ROLES: Roles = {
  admin: {
    label: 'Admin',
    value: 'admin',
    level: 2,
  },
  organizationOwner: {
    label: 'Organization Owner',
    value: 'organizationOwner',
    level: 3,
  },
  developer: {
    label: 'Developer',
    value: 'developer',
    level: 4,
  },
}
