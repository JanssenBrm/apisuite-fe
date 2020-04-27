import { LocaleOption } from 'language/types'

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
