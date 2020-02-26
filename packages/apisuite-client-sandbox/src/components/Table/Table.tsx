import * as React from 'react'
import { TableProps } from './types'
import useStyles from './styles'

const Table: React.FC<TableProps> = ({ header, data }) => {
  const classes = useStyles()

  return (
    <div className={classes.table}>
      <div className={classes.header}>
        {header.map((headerCol, indx) => (
          <div key={indx}>{headerCol.label}</div>
        ))}
      </div>
      <div>
        {data.map((dataRow, indx) => (
          <div key={indx}>
            {dataRow.map((dataCol, indx) => (
              <div key={indx}>{dataCol}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Table
