import * as React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

import './styles.scss'

const PageLoad: React.FC<{}> = () => (
  <div className='page-load'>
    <CircularProgress size={50} />
    <br />
    <div>Slow internet connection, just a moment.</div>
  </div>
)

export default PageLoad
