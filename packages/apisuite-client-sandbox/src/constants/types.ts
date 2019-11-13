import { LocaleOption } from 'Language/types'

export interface SandboxConfig {
  includes: { [prop: string]: boolean },
  navbar: {
    name: string,
    logoUrl: string,
  },
  footer: {
    copyright: string,
    logoUrl: string,
  },
  i18n: LocaleOption[],
}
