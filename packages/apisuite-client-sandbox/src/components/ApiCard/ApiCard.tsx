import * as React from 'react'
import useStyles from './styles'
import { ApiCardProps } from './types'
import Code from '@material-ui/icons/Code'
import Avatar from '@material-ui/core/Avatar'

const ApiCard: React.FC<ApiCardProps> = ({ name, apps, version }) => {
  const classes = useStyles()

  return (
    <div className={classes.cardContainer}>

      <div className={classes.options}>
        <div className={classes.apiName}>{name}</div>
        <div className={classes.apiVersion}>{version}</div>
        <div className={classes.apiApps}>
          {apps.map((app, indx) => (
            <div key={indx} className={classes.avatarContainer}>
              <Avatar className={classes.avatar}>{app}</Avatar>
            </div>
          ))}
        </div>
      </div>

      <div className={classes.icons}>
        <Code />
      </div>
    </div>
  )
}

export default ApiCard
