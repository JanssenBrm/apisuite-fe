import { useSelector } from 'react-redux'
import { Store } from 'store/types'

export function useSettings () {
  const settings = useSelector((store: Store) => store.settings)
  return [settings]
}
