import * as React from 'react'
import { LayoutProps } from './types'
import Footer from 'components/Footer'
import useStyles from './styles'

const EssentialLayout: React.FC<LayoutProps> = ({
  // title,
  children,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className='layout-container layout-essential'>{children}</div>
      <Footer />
    </div>
  )
}

export default EssentialLayout
