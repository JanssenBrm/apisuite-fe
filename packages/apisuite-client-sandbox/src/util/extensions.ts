import extensions from '../../extensions'
import { MenuEntry, PageEntry } from 'apisuite-extension-ui-types'

export const getMenuEntries = (menu: string) => {
  return extensions
    .reduce<MenuEntry[]>((accum, ext) => {
      const extensionMenuEntries = ext.hooks && ext.hooks.menu(menu)
      return extensionMenuEntries ? [...accum, ...extensionMenuEntries] : accum
    }, [])
    .filter(Boolean)
}

export const getRoutes = () => {
  return extensions
    .reduce<PageEntry[]>((accum, ext) => {
      const extensionPages = ext.hooks && ext.hooks.pages()
      return extensionPages ? [...accum, ...extensionPages] : accum
    }, [])
    .filter(Boolean)
}

export const getSections = (
  section: string,
  args?: object,
) => {
  return extensions
    .reduce<any>((accum, ext) => {
      const extensionSection = ext.hooks && ext.hooks.sections(section, args)
      return extensionSection ? [...accum, extensionSection] : accum
    }, [])
    .filter(Boolean)
}
