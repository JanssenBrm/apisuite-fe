import * as React from 'react'
import { ApiSelectProps } from './types'
import MenuItem from '@material-ui/core/MenuItem'

const ApiSelect: React.FC<ApiSelectProps> = ({ userApps, handleAdd, apiName }) => {
  return (
    <>
      {userApps.map((app, indx: number) => (
        <MenuItem onClick={handleAdd(app.appId, apiName)} key={indx}>{app.name}</MenuItem>
      ))}
    </>
  )
}

export default ApiSelect
