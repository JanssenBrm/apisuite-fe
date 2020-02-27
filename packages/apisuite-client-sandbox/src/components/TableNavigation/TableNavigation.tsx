import * as React from 'react'
import { TableNavigationProps } from './types'
import Button from '@material-ui/core/Button'
import useStyles from './styles'

const TableNavigation: React.FC<TableNavigationProps> = ({ prevLabel, nextLabel, maxPages }) => {
  const classes = useStyles()

  function pages () {
    let page
    const pageEls = []
    for (page = 0; page < maxPages; page++) {
      pageEls.push(<Button className={classes.page}>{page}</Button>)
    }
    return pageEls
  }

  return (
    <div className={classes.container}>
      <Button className={classes.labelLeft}>{prevLabel}</Button>
      {pages()}
      <Button className={classes.labelRight}>{nextLabel}</Button>
    </div>
  )
}

export default TableNavigation
