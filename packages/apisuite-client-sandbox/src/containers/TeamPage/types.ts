import {
  mapStateToProps,
  mapDispatchToProps,
} from './index'

export type TeamPageProps =
ReturnType<typeof mapStateToProps> &
ReturnType<typeof mapDispatchToProps>
