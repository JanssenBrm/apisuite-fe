import * as React from 'react'
import { ApiCategoryCardProps } from './types'
import useStyles from './styles'

const ApiCategoryCard: React.FC<ApiCategoryCardProps> = ({ name, apps, version }) => {
  const classes = useStyles()

  return (
    <div className={classes.cardContainer}>Api Category Card</div>
  )
}

export default ApiCategoryCard
