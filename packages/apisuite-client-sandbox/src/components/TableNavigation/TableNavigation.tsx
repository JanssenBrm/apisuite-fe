import * as React from 'react'
import { TableNavigationProps } from './types'
import Button from '@material-ui/core/Button'
import useStyles from './styles'
import clsx from 'clsx'

const TableNavigation: React.FC<TableNavigationProps> = ({
  prevLabel,
  nextLabel,
  tablePage,
  maxPages,
  onPageClick,
  navigateClick,
  disableNav,
}) => {
  const classes = useStyles()

  function pages () {
    let page
    const pageEls = []
    for (page = 1; page < maxPages + 1; page++) {
      pageEls.push(
        <Button
          key={page}
          id={page.toString()}
          onClick={onPageClick}
          className={clsx(classes.page, page === tablePage && classes.selected)}
        >
          {page}
        </Button>)
    }
    return pageEls
  }

  return (
    <div className={classes.container}>
      <Button
        id='-1'
        onClick={navigateClick}
        className={classes.labelLeft}
        disabled={disableNav.previous}
      >
        {prevLabel}
      </Button>
      {pages()}
      <Button
        id='1'
        onClick={navigateClick}
        className={classes.labelRight}
        disabled={disableNav.next}
      >
        {nextLabel}
      </Button>
    </div>
  )
}

export default TableNavigation
