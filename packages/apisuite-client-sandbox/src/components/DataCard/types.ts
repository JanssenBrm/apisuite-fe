export interface TestUserData {
  property: string,
  entries: number,
  addMsg: string,
}

export interface DataCardProps {
  pkgData: TestUserData[],
  icons: JSX.Element[],
}
