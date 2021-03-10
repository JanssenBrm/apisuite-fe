import { bindActionCreators, Dispatch } from 'redux'

import { connect } from 'react-redux'

import { getSettings } from 'containers/Settings/ducks'

import { nextStepAction } from 'components/SignUpForm/ducks'

import { Store } from 'store/types'

import SignUpConfirmation from './SignUpConfirmation'

export const mapStateToProps = ({ register, settings }: Store) => ({
  register,
  settings,
})

export const mapDispatchToProps = (dispatch: Dispatch): any =>
  bindActionCreators(
    {
      getSettings: getSettings,
      nextStep: nextStepAction,
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(SignUpConfirmation)
