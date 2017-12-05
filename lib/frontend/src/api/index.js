import reduxApi from 'redux-api'
import { adapter, crud, defaults } from 'redux-api-unrest'

const root = '/api'

export default reduxApi(
  {
    color: {
      ...defaults,
      url: `${root}/color/:id?`,
      helpers: crud(['get', 'post', 'put', 'delete']),
    },
    shape: {
      ...defaults,
      url: `${root}/shape/:id?`,
      helpers: crud(['get', 'put', 'post', 'patch', 'delete']),
    },
  },
  { prefix: 'api' }
).use('fetch', adapter)
