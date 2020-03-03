import * as React from 'react'
import { NavMenuProps } from './types'
import useStyles from './styles'
import clsx from 'clsx'

const NavMenu: React.FC<NavMenuProps> = ({ options, selected, handleSelect }) => {
  const classes = useStyles()

  return (
    <>
      {options.map((option, indx) => (
        <div
          onClick={handleSelect(indx)}
          className={clsx(classes.menuItem, selected === indx && classes.selected)}
          key={indx}
        >
          <a href={`#step-${indx + 1}`}>{option}</a>
        </div>
      ))}
    </>
  )
}

export default NavMenu
