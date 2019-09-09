import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import CancelIcon from '@material-ui/icons/Cancel'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
  },
}))(Tooltip)

const navigate = (url) => {
  window.open(url, '_blank')
}

const Notification = ({ tag, message, url, handleClose }) => (
  <div className='portal-notification-container'>

    <div className='portal-notification'>

      <div className='notification-wrapper'>
        {
          tag && <div className='tag'>
            {tag}
          </div>
        }

        <div className='message-wrapper'>
          <LightTooltip title={
            <>
              <div dangerouslySetInnerHTML={{ __html: message }} />
            </>
          }
          >
            <div className='message' dangerouslySetInnerHTML={{ __html: message }} />
          </LightTooltip>
          {
            url && <div className='view-more' onClick={() => navigate(url)}>
              <FormattedMessage id='notification.view.more' />
            </div>
          }
        </div>
      </div>

      <div className='close' onClick={handleClose}>
        <CancelIcon fontSize='inherit' />
      </div>

    </div>

  </div>
)

Notification.defaultProps = {
  tag: '',
  message: '',
  url: '',
  handleClose: () => {},
}

Notification.propTypes = {
  /**
   * Error message to be displayed
   */
  tag: PropTypes.string,
  message: PropTypes.string,
  url: PropTypes.string,
  handleClose: PropTypes.func,
}

export default Notification
