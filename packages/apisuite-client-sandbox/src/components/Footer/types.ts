export type MenuSection = {
  title: string,
  entries: Array<{ label: string }>,
};

export type MenuSections = {
  [key: string]: MenuSection,
};
