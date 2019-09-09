import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import { any, object, bool } from 'prop-types'

class ArrowTooltip extends Component {
  state = {
    arrowRef: null,
  }

  handleArrowRef = node => {
    this.setState({
      arrowRef: node,
    })
  }

  render () {
    const { classes, isLoggedIn } = this.props
    const { arrowRef } = this.state

    return (
      isLoggedIn && <Tooltip
        disableFocusListener
        classes={{ tooltip: classes.blackTooltip }}
        title={
          <>
            {this.props.content}
            <span className='arrowArrow' ref={this.handleArrowRef} />
          </>
        }
        PopperProps={{
          popperOptions: {
            modifiers: {
              arrow: {
                enabled: Boolean(arrowRef),
                element: arrowRef,
              },
            },
          },
        }}
      >
        <div className='tooltip'>
          {this.props.children}
        </div>
      </Tooltip>
    )
  }
}

ArrowTooltip.defaultProps = {
  content: '',
}

ArrowTooltip.propTypes = {
  content: any,
  children: any.isRequired,
  classes: object.isRequired,
  isLoggedIn: bool,
}

const styles = theme => ({
  blackTooltip: {
    background: '#000',
    fontSize: '.7em',
    position: 'relative',
    top: '-10px',
  },
})

export default withStyles(styles)(ArrowTooltip)
