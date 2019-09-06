import React from 'react'
import { string, number, oneOfType, func } from 'prop-types'
import { Typography } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import ShareIcon from '@material-ui/icons/Launch'

const Kpi = ({ title, subtitle, value, onClick }) => (
  <div className='kpi-container'>
    <div className='kpi-header'>
      <div className='kpi-title'>{title}</div>
      <div className='kpi-subtitle'>{subtitle}</div>
    </div>
    <div className='kpi-content'>
      <div className='kpi-value'><Typography variant='display4'>{value}</Typography></div>
      <IconButton className='kpi-share' color='primary' onClick={onClick}>
        <ShareIcon />
      </IconButton>
    </div>
  </div>
)

Kpi.propTypes = {
  /**
   * KPI title
   */
  title: string,
  /**
   * KPI subtitle
   */
  subtitle: string,
  /**
   * KPI value
   */
  value: oneOfType([
    string, number
  ]),
  /**
   * KPI on click function
   */
  onClick: func
}

export default Kpi
