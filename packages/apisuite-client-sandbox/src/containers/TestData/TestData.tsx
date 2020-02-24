import * as React from 'react'
import useStyles from './styles'

const TestData: React.FC<{}> = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <section className={classes.contentContainer}>
        <div className={classes.tableContainer}>LEFT</div>

        <div className={classes.actionsContainer}>RIGHT</div>
      </section>
    </div>
  )
}

export default TestData
