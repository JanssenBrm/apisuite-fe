
import sandboxConfig from '../../sandbox.config.json'
import { SandboxConfig } from './types.js'

// @ts-ignore
export const config: SandboxConfig = sandboxConfig

export const THEME = process.env.THEME || 'default'
