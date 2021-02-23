import { AppData } from 'containers/Applications/types'
import { SettingsStore } from 'containers/Settings/types'
import { ApiDocs, APIVersion } from 'containers/Subscriptions/types'

export default interface SubscriptionsModalProps {
  allUserApps: AppData[],
  apisByName: APIData[],
  isModalOpen: boolean,
  requestAPIAccessAction: (appId: number) => void,
  settings: SettingsStore,
  toggleModal: () => void,
}

export interface APIData {
  name: string,
  versions: APIVersion[],
  apps: {
    appId: number,
    appName: string,
  }[],
  description: ApiDocs | undefined,
}
