import reduxApi from 'redux-api'
import { adapter, crud, defaults } from 'redux-api-unrest'

const root = '/api'

export default reduxApi(
  {
    color: {
      ...defaults,
      url: `${root}/color`,
      helpers: crud(['get']),
    },
    shape: {
      ...defaults,
      url: `${root}/shape`,
      helpers: crud(['get', 'put', 'post', 'patch', 'delete']),
    },
  },
  { prefix: 'api' }
).use('fetch', adapter)
