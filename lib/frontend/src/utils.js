import { connect as connectWithoutLocation } from 'react-redux'
import { withRouter } from 'react-router-dom'

/* Explanation: https://github.com/ReactTraining/react-router\
/blob/master/packages/react-router/docs/guides/redux.md
*/
export const connect = (...connectArgs) => (Component, ...componentArgs) => {
  const wrapped = withRouter(
    connectWithoutLocation(...connectArgs)(Component, ...componentArgs)
  )
  // For testing components and not containers
  wrapped.Component = Component
  return wrapped
}
