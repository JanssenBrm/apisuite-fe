export function localPut (key: string, value: string) {
  try {
    window.localStorage.setItem(key, value)
  } catch (err) {
    console.error(err)
  }
}

export function localGet (key: string) {
  try {
    return window.localStorage.getItem(key)
  } catch (err) {
    console.error(err)
    return undefined
  }
}

export function localRemove (key: string) {
  try {
    return window.localStorage.removeItem(key)
  } catch (err) {
    console.error(err)
  }
}

export function localClear () {
  try {
    window.localStorage.clear()
  } catch (err) {
    console.error(err)
  }
}
