import {
  mapStateToProps,
  mapDispatchToProps,
} from './index'

export type OrganizationPageProps =
ReturnType<typeof mapStateToProps> &
ReturnType<typeof mapDispatchToProps>
