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
