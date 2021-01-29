import { AuthStore } from 'containers/Auth/types'

export interface FooterProps {
  auth: AuthStore,
  settings: SettingsStore,
}

export type MenuSection = {
  title: string,
  entries: Array<{
    label: string,
    route?: string,
  }>,
}

export type MenuSections = {
  [key: string]: MenuSection,
}
