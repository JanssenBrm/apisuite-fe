
import sandboxConfig from '../../sandbox.config.json'
import { SandboxConfig, Roles } from './types.js'

export const config: SandboxConfig = sandboxConfig

export const ROLES: Roles = {
  superadmin: {
    label: 'SuperAdmin',
    value: 'superadmin',
    level: 1,
  },
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
