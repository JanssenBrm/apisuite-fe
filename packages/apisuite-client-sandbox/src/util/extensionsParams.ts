import { injectReducer, injectSaga } from 'store'
import { getCloudUrlForSubdomainSuffix } from 'constants/endpoints'
import request, {
  axios,
  apiRequest,
  requestInform,
  apiRequestInform,
} from 'util/request'

export const paramsV1 = {
  getCloudUrlForSubdomainSuffix,
  store: {
    injectReducer,
    injectSaga,
  },
  request: {
    axios,
    request,
    apiRequest,
    requestInform,
    apiRequestInform,
  },
}
