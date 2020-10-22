import * as React from 'react'
import { LayoutProps } from './types'
import useStyles from './styles'

const EssentialLayout: React.FC<LayoutProps> = ({
  // title,
  children,
}) => {
  const classes = useStyles()

  return (
    <div className={`layout-container layout-essential ${classes.root}`}>
      {children}
    </div>
  )
}

export default EssentialLayout
