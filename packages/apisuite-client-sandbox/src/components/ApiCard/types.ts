export interface APIVersion {
  vName: string,
  vNumber: string,
}

export interface APICardProps {
  APIname: string,
  APIversions: Array<APIVersion>,
}
