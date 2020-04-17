import { AppData } from 'containers/Applications/types'

export type ApiSelectProps = {
  userApps: AppData[],
  handleAdd: (appId: number, apiName: string) => (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void,
  apiName: string,
}
