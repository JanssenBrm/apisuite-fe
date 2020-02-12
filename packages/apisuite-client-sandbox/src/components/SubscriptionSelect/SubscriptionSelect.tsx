import * as React from 'react'
import useStyles from './styles'
import { SubscriptionSelectProps } from './types'
import Chip from '@material-ui/core/Chip'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CircularProgress from '@material-ui/core/CircularProgress'

const SubscriptionSelect: React.FC<SubscriptionSelectProps> = ({ apps, handleDelete, apiNumber }) => {
  const classes = useStyles()

  return (
    <div className={classes.subSelect}>
      <div className={classes.chips}>
        {apps.map((app, indx) => (
          <Chip
            key={indx}
            label={app}
            className={classes.chip}
            onDelete={handleDelete(app, apiNumber)}
            deleteIcon={<CircularProgress size={18} className={classes.loading} />}
          />
        ))}
      </div>
      <div className={classes.endAdornment}>
          Add subscription
        <ExpandMoreIcon />
      </div>
    </div>
  )
}

export default SubscriptionSelect
