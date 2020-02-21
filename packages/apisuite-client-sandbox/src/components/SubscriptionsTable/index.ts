import { connect, MapDispatchToPropsFunction } from 'react-redux'
import { Dispatch } from 'react'
import { deleteAppSub, addAppSub } from 'containers/Subscriptions/ducks'
import SubscriptionsTable from './SubscriptionsTable'
import { AnyAction } from 'redux'
import { Store } from 'store/types'

const mapDispatchToProps: MapDispatchToPropsFunction<any, any> = (dispatch: Dispatch<AnyAction>) => ({
  deleteAppSub: (APIid: number, appNumber: number) => dispatch(deleteAppSub(APIid, appNumber)),
  addAppSub: (APIid: number, appName: string, newAppNumber: number) => dispatch(
    addAppSub(APIid, appName, newAppNumber)),
})

const mapStateToProps = ({ subscriptions }: Store) => ({
  subscriptions: subscriptions,
})

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsTable)
