import * as React from 'react'
import { APICardProps } from './types'
import useStyles from './styles'
import Avatar from '@material-ui/core/Avatar'

const APICard: React.FC<APICardProps> = ({ APIname, APIversions }) => {
  const classes = useStyles()

  return (
    <div className={classes.cardContainer}>
      <div className={classes.apiDetail}>
        <h4 className={classes.cardTitle}>{APIname}</h4>

        <p className={classes.description}>
          With PSD2 the European Commission has published a new directive on payment
          services in the EEA internal market.
          Among others PSD2 contains regulations of new services to be operated by…
        </p>

        <div>
          {APIversions.map((APIversion, indx) => (
            <div key={indx}>
              <div className={classes.appsContainer}>
                {/* {api.apps.map((app, indx) => (
                  <div key={indx} className={classes.avatarContainer}>
                    <Avatar className={classes.avatar}>{app}</Avatar>
                  </div>
                ))} */}
                {APIversion}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        {APIversions.map((APIversion, indx) => (
          <div key={indx} className={classes.apiCard}>
            <div>{APIversion.vName}</div>
            <div>{APIversion.vNumber}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default APICard 
