import bemblock from 'bem-cn'
import { connect as connectWithoutLocation } from 'react-redux'
import { withRouter } from 'react-router-dom'

bemblock.setup({
  el: '__',
  mod: '--',
  modValue: '-',
})

export const block = blockName => {
  const b = bemblock(blockName)
  const element = (...args) => b(...args).toString()
  element.chain = b
  return element
}

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
