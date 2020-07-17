import registry from '../../extensions'

const extensions = registry.map((entry) => entry.extension)

const init = () => {
  registry.forEach(({ extension, config }) =>
    extension.init({
      config,
    }),
  )
}

init()

export const getMenuEntries = (menu: string, section?: string) => {
  return extensions
    .reduce((accum, ext) => {
      const extensionMenuEntries = ext.hooks.menu(menu, section)
      return extensionMenuEntries ? [...accum, ...extensionMenuEntries] : accum
    }, [])
    .filter(Boolean)
}

export const getRoutes = () => {
  return extensions
    .reduce((accum, ext) => {
      const extensionPages = ext.hooks.pages()
      return extensionPages ? [...accum, ...extensionPages] : accum
    }, [])
    .filter(Boolean)
}

export const getSections = (
  section: string,
  subsection: string,
  args?: object,
) => {
  return extensions
    .reduce((accum, ext) => {
      const extensionSection = ext.hooks.section(section, subsection, args)
      return extensionSection ? [...accum, extensionSection] : accum
    }, [])
    .filter(Boolean)
}
