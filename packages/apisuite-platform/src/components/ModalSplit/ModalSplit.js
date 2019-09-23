import React from 'react'
import { node, string, bool, func, number } from 'prop-types'
import Modal from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper'
import CloseIcon from '@material-ui/icons/Close'
import Stepper from 'components/Stepper'
import thumbImg from 'assets/thumb.svg'
import createAppImg from 'assets/create_app_watch.svg'
import classnames from 'classnames'
import eyeImg from 'assets/eye.svg'
import { Typography } from '@material-ui/core'
import isMobile from 'util/detectMobile'

const steps = [
  { name: 'Log in' },
  { name: '2-Factor Authentication' },
]

const icons = [
  {
    key: 'thumb',
    src: thumbImg,
  },
  {
    key: 'eye',
    src: eyeImg,
  },
]

const ModalSplit = ({
  component,
  open,
  onClose,
  title,
  rightImg,
  rightTitle,
  rightSubtitle,
  additionalContent,
  step,
  isApps,
}) => (
  <Modal
    className='modal-split'
    open={open}
    onClose={onClose}
    disableBackdropClick
    disableEscapeKeyDown
  >
    <Paper className={classnames('modal-split-content', { mobile: isMobile })}>
      <div className='modal-split-left'>
        {isMobile &&
          <div className='close-icon'>
            <CloseIcon onClick={onClose} />
          </div>}
        <div className='modal-split-left-content'>
          <Typography variant='display4' gutterBottom>{title}</Typography>
          {component}

          {isMobile &&
            <div className='recaptcha-container'>
              {additionalContent}
            </div>}
        </div>
      </div>
      <div className='modal-split-right'>
        <div className='close-icon'>
          <CloseIcon onClick={onClose} />
        </div>
        <div className={classnames('modal-split-right-content', { 'is-apps': isApps })}>
          <div className='modal-split-right-top'>
            {!isApps && <img className='modal-image-top' src={rightImg ? icons.filter(icon => icon.key === rightImg)[0].src : thumbImg} />}
            <Typography variant='display4' gutterBottom>{rightTitle}</Typography>
            <p>{rightSubtitle}</p>
          </div>
          <div className='modal-split-right-bottom'>
            {!isApps
              ? (
                <>
                  {step > 0 && <Stepper steps={steps} currentStep={step} simple labelColor='#ffffff' />}
                  {additionalContent}
                </>
              )
              : <img src={createAppImg} />}
          </div>
        </div>
      </div>
    </Paper>
  </Modal>
)

ModalSplit.defaultProps = {
  rightImg: 'thumb',
}

ModalSplit.propTypes = {
  component: node.isRequired,
  open: bool.isRequired,
  onClose: func,
  title: string,
  rightTitle: string,
  rightSubtitle: string,
  isApps: bool,
  rightImg: string,
  step: number,
  additionalContent: node,
}

export default ModalSplit
