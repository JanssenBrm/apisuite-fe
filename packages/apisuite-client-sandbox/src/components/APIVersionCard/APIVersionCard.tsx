import * as React from 'react'
import { APIVersionCardProps } from './types'
import useStyles from './styles'

const APIVersionCard: React.FC<APIVersionCardProps> = ({ apiTitle, versionName }) => {
  const classes = useStyles()

  return (
    <div className={classes.cardContainer}>

      <div className={classes.options}>
        <div className={classes.apiName}>{apiTitle}</div>
        <div className={classes.apiVersion}>{versionName}</div>
      </div>

    </div>
  )
}

export default APIVersionCard
