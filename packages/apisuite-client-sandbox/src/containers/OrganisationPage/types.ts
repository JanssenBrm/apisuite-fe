import {
  mapStateToProps,
  mapDispatchToProps,
} from './index'

export type OrganisationPageProps =
ReturnType<typeof mapStateToProps> &
ReturnType<typeof mapDispatchToProps>
