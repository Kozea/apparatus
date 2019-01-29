/* eslint-disable no-console */
import ApiUnrest from 'redux-api-unrest'

export default new ApiUnrest(
  {
    color: 'color/:id?',
    shape: 'shape/:id?',
  },
  {
    prefix: 'api',
    rootPath: () => '/api',
    cache: 10000,
    JWTStorage: false,
    errorHandler: (error, { endpoint, method, prefix }) => {
      if (method === 'GET') {
        if (error.name === 'AlreadyLoadingError') {
          console &&
            console.debug(
              `Endpoint '${prefix}.${endpoint}' is already loading.`
            )
        } else if (error.name === 'AbortError') {
          console &&
            console.debug(`Endpoint '${prefix}.${endpoint}' aborted.`, error)
        } else {
          // We ignore get errors for now as it is handled by state
          console &&
            console.debug(
              `Endpoint '${prefix}.${endpoint}' fetch failed.`,
              error
            )
        }
        return false
      }
      console.error(error, {
        title: `Endpoint ${method} '${prefix}.${endpoint}' fetch failed.`,
      })
      return true
    },
  }
)
