import * as React from 'react'

import useCommontyles from '../styles'
import { CreateAppProps } from './types'

const CreateApp: React.FC<CreateAppProps> = ({ history }) => {
  const commonClasses = useCommontyles()

  return (
    <div className={commonClasses.root}>
      Create APP
      <button onClick={() => history.push('/dashboard/apps/detail')}>detail</button>
      <button onClick={() => history.goBack()}>back</button>
    </div>
  )
}

export default CreateApp
