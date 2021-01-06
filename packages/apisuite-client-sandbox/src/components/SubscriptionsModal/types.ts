import { AppData } from 'containers/Applications/types'
import { SettingsStore } from 'containers/Settings/types'
import { APIVersion, AppInfo } from 'containers/Subscriptions/types'

export default interface SubscriptionsModalProps {
  allUserApps: AppData[],
  apisByName: APIData[],
  isModalOpen: boolean,
  modalMode?: 'subscribe' | 'revoke',
  settings: SettingsStore,
  toggleModal: () => void,
}

export interface APIData {
  name: string,
  versions: APIVersion[],
  apps: AppInfo[],
  description: string,
}
