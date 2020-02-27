import * as React from 'react'
import { CardProps } from './types'
import useStyles from './styles'

const Card: React.FC<CardProps> = ({ title, description, icon }) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div className={classes.top}>
        <div className={classes.iconContainer}>
          {icon}
        </div>
        <div className={classes.title}>{title}</div>
      </div>
      <div className={classes.description}>{description}</div>
    </div>
  )
}

export default Card
