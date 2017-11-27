import bemblock from 'bem-cn'
import { connect as connectWithoutLocation } from 'react-redux'
import { StaticRouter, withRouter } from 'react-router-dom'
import { routerMiddleware } from 'react-router-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'

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

export const staticStoreAndHistory = (location, state = void 0) => {
  // This is a hack to get the static history for react-router-redux
  // This might get simpler:
  // https://github.com/supasate/react-router-redux/issues/39
  const staticRouter = new StaticRouter()
  staticRouter.props = { location, context: {}, basename: '' }
  const { props: { history: staticHistory } } = staticRouter.render()

  const store = createStore(
    reducers,
    state,
    compose(applyMiddleware(routerMiddleware(staticHistory), thunk))
  )
  return { store, history: staticHistory }
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
