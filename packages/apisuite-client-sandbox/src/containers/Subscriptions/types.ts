export interface APIversion {
  vName: string,
  vNumber: string,
}

export interface App {
  name: string,
  isLoading: boolean,
}

export interface API {
  name: string,
  versions: Array<APIversion>,
  apps: Array<App>,
  description: string,
}

export interface SubStore {
  subscribedAPIs: Array<API>,
  userApps: Array<App>,
}
