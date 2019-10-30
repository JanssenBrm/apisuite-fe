import * as React from 'react'

import useCommontyles from '../styles'
import { AppDetailProps } from './types'

const AppDetail: React.FC<AppDetailProps> = ({ history }) => {
  const commonClasses = useCommontyles()

  return (
    <div className={commonClasses.root}>
      APP Detail
      <button onClick={() => history.goBack()}>back</button>
    </div>
  )
}

export default AppDetail
