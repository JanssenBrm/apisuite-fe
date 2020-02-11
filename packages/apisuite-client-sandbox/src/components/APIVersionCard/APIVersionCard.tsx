import * as React from 'react'
import { APIVersionCardProps } from './types'
import useStyles from './styles'

const APIVersionCard: React.FC<APIVersionCardProps> = ({ vName, vNumber }) => {
  const classes = useStyles()

  return (
    <div className={classes.cardContainer}>

      <div className={classes.options}>
        <div className={classes.apiName}>{vName}</div>
        <div className={classes.apiVersion}>{vNumber}</div>
      </div>

    </div>
  )
}

export default APIVersionCard
