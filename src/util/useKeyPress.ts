import * as React from 'react'

export function useKeyPress (targetKey: string) {
  const [keyPressed, setKeyPressed] = React.useState(false)

  const keyDownHandler = (e: KeyboardEvent) => {
    if (e.key === targetKey) {
      setKeyPressed(true)
    }
  }

  const keyUpHandler = (e: KeyboardEvent) => {
    if (e.key === targetKey) {
      setKeyPressed(false)
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', keyDownHandler)
    document.addEventListener('keyup', keyUpHandler)

    return () => {
      document.removeEventListener('keydown', keyDownHandler)
      document.removeEventListener('keyup', keyUpHandler)
    }
  }, [])

  return keyPressed
}
