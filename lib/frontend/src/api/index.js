import ApiUnrest from 'redux-api-unrest'

export default new ApiUnrest(
  {
    color: 'color/:id?',
    shape: 'shape/:id?',
  },
  {
    prefix: 'api',
    rootPath: '/api',
    cache: 10000,
    handleJWT: false,
  }
)
