import { THEME } from 'constants/global'

function exists (asset) {
  try {
    switch (THEME) {
      case 'default':
        require.resolve(`../themes/default/images/${asset}`)
        break
      case 'bnpp':
        require.resolve(`../themes/bnpp/images/${asset}`)
        break
    }
  } catch (e) {
    return false
  }

  return true
}

function requireIfExists (...assets) {
  for (const asset of assets) {
    if (exists(asset)) {
      switch (THEME) {
        case 'default':
          return require(`../themes/default/images/${asset}`)
        case 'bnpp':
          return require(`../themes/bnpp/images/${asset}`)
      }
    }
  }

  return null
}

export default requireIfExists
