import * as React from 'react'
import { ApiSelectProps } from './types'
import { App } from 'containers/Subscriptions/types'
import MenuItem from '@material-ui/core/MenuItem'

const ApiSelect: React.FC<ApiSelectProps> = ({ userApps, handleAdd, APIid }) => {
  return (
    <>
      {userApps.map((app: App, indx: number) => (
        <MenuItem onClick={handleAdd(APIid, app.name)} key={indx}>{app.name}</MenuItem>
      ))}
    </>
  )
}

export default ApiSelect
