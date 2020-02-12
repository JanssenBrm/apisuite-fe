export type ViewType = 'list' | 'cards'

export interface SubscriptionsTableProps {
  view: ViewType,
}

export interface APIversion {
  API: string,
  vName: string,
  vNumber: string,
}

export interface APIsubbed {
  API: string,
  apps: Array<string>,
}

export interface App {
  title: string,
}
