import * as React from 'react'
import { TableProps } from './types'
import useStyles from './styles'
import clsx from 'clsx'
import Button from '@material-ui/core/Button'

const Table: React.FC<TableProps> = ({ header, data, onRowClick }) => {
  const classes = useStyles()
  const xss = header.map(headerCol => headerCol.xs)
  const size = xss.reduce((a, b) => a + b, 0)
  const widths = xss.map(xs => ({ width: `${(xs / size) * 100}%` }))
  const aligns = header.map(headerCol => ({ justifyContent: headerCol.align }))

  function placeIcons (indx: number) {
    const icons = header[indx].icons
    if (icons) {
      return <div className={classes.icon}>{icons.map(icon => icon)}</div>
    } else {
      return null
    }
  }

  return (
    <div className={classes.table}>
      <div className={classes.header}>
        {header.map((headerCol, indx) => (
          <div key={indx} className={classes.headerCol} style={{ ...widths[indx], ...aligns[indx] }}>
            {headerCol.label}
          </div>
        ))}
      </div>
      <div className={classes.dataContainer}>
        {data.map((dataRow, indx) => (
          <Button
            id={indx.toString()}
            className={clsx(classes.tableRow, (indx % 2 && classes.gray))}
            key={indx}
            onClick={onRowClick}
          >
            {dataRow.map((dataCol, indx) => (
              <div
                key={indx}
                style={widths[indx]}
                className={classes.dataCol}
              >
                {dataCol}
                <div className={classes.iconsContainer}>
                  {placeIcons(indx)}
                </div>
              </div>
            ))}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Table
