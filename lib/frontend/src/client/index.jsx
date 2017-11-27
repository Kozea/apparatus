import { createBrowserHistory } from 'history'
import React from 'react'
import { hydrate, render } from 'react-dom'
import { routerMiddleware } from 'react-router-redux'
import RedBox from 'redbox-react'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import App from '../components/App'
import reducer from '../reducers'
import Root from '../Root'

export const rootNode = document.getElementById('root')

export const history = createBrowserHistory()

export const store = createStore(
  reducer,
  window.__STATE__, // Server state
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)(
    applyMiddleware(routerMiddleware(history), thunk)
  )
)

const renderRoot = handleError => {
  try {
    // We render on dev server because there is no SSR
    const renderMode =
      process.env.NODE_ENV === 'development' && !window.__STATE__
        ? render
        : hydrate
    renderMode(
      <Root store={store} history={history}>
        <App />
      </Root>,
      rootNode
    )
  } catch (error) {
    handleError(error)
  }
}

/*
██████  ██████   ██████  ██████
██   ██ ██   ██ ██    ██ ██   ██
██████  ██████  ██    ██ ██   ██
██      ██   ██ ██    ██ ██   ██
██      ██   ██  ██████  ██████
*/

if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line no-console
  console && console.log('PRODUCTION MODE')
  renderRoot(console.error)
}

/*
███████ ████████  █████   ██████  ██ ███    ██  ██████
██         ██    ██   ██ ██       ██ ████   ██ ██
███████    ██    ███████ ██   ███ ██ ██ ██  ██ ██   ███
     ██    ██    ██   ██ ██    ██ ██ ██  ██ ██ ██    ██
███████    ██    ██   ██  ██████  ██ ██   ████  ██████
*/

if (process.env.STAGING) {
  // eslint-disable-next-line no-console
  console && console.log('STAGING MODE')
  const handleError = error => render(<RedBox error={error} />, rootNode)

  renderRoot(handleError)
  window._debug = { store, reducer, history, rootNode }
}

/*
██████  ███████ ██████  ██    ██  ██████
██   ██ ██      ██   ██ ██    ██ ██
██   ██ █████   ██████  ██    ██ ██   ███
██   ██ ██      ██   ██ ██    ██ ██    ██
██████  ███████ ██████   ██████   ██████
*/

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-console
  console && console.log('DEVELOPMENT MODE')
  const handleError = error => render(<RedBox error={error} />, rootNode)
  renderRoot(handleError)

  if (module.hot) {
    module.hot.accept('../components/App', () => renderRoot(handleError))
    module.hot.accept('../reducers', () => {
      store.replaceReducer(reducer)
    })
  }
  window._debug = { store, reducer, history, rootNode }
}
