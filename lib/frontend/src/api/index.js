import ApiUnrest from 'redux-api-unrest'

export default new ApiUnrest(
  {
    color: 'color/:id?',
    shape: 'shape/:id?',
  },
  'api',
  '/api',
  10000
)
