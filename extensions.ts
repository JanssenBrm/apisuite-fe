import { Extension as ExtensionV1 } from '@apisuite/extension-ui-types/v1'
// import { instanceExtension } from 'util/extensionsParams'
// import Example from '@apisuite/extension-ui-example'

type RegistryEntry = ExtensionV1[]

const registry: RegistryEntry = [
  // instanceExtension(Example, { someKey: 'Overriden value' }),
].filter(Boolean)

export default registry
