import { Dispatch } from 'redux'

import { connect } from 'react-redux'

import {
  toggleInstanceOwnerNotificationCards,
  toggleNonInstanceOwnerNotificationCards,
} from 'containers/NotificationCards/ducks'

import { Store } from 'store/types'

import NotificationCard from './NotificationCard'

const mapStateToProps = ({ notificationCards }: Store) => ({
  // Temporary until notification cards become clearer
  notificationCards: notificationCards,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  // Temporary until notification cards become clearer
  toggleInstanceOwnerNotificationCards: () => dispatch(toggleInstanceOwnerNotificationCards()),
  toggleNonInstanceOwnerNotificationCards: () => dispatch(toggleNonInstanceOwnerNotificationCards()),
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationCard)
