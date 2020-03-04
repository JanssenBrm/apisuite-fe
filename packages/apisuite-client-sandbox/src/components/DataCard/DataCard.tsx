import * as React from 'react'
import { DataCardProps } from './types'
import useStyles from './styles'
import clsx from 'clsx'

const DataCard: React.FC<DataCardProps> = ({ pkgData, icons }) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      {pkgData.map((testUserData, indx) => (
        <div key={indx} className={clsx(classes.card, indx + 1 < pkgData.length && classes.rightBorder)}>
          <div className={clsx(classes.property, testUserData.entries === 0 && classes.gray)}>
            {testUserData.property}
          </div>
          <div className={testUserData.entries === 0 ? classes.info : classes.entries}>
            {testUserData.entries === 0 ? <a>{testUserData.addMsg}</a> : testUserData.entries}
          </div>
          <div className={classes.iconContainer}>
            {icons.map((icon, indx) => (
              <div key={indx} className={clsx(classes.icon, indx + 1 < icons.length && classes.rightBorder)}>
                {icon}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DataCard
