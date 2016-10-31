import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import reactest from './reducers'
import App from './components/App'

const logger = createLogger()

let store = createStore(reactest, applyMiddleware(thunk, logger))

let root_node = null
if (typeof document !== "undefined") {
  root_node = document.getElementById('root')
}

function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}


let render = () => {
  const App = require('./components/App').default
  ReactDOM.render(
    <Root />,
    root_node
  )
}

if (module.hot) {
  const renderApp = render
  const renderError = (error) => {
    const RedBox = require('redbox-react').default
    ReactDOM.render(
      <RedBox error={error} />,
      root_node
    )
  }
  render = () => {
    try {
      renderApp()
    } catch (error) {
      renderError(error)
    }
    module.hot.accept('./components/App', () => {
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(root_node)
        render()
      })
    })
  }
  module.hot.accept('./reducers', () => {
    store.replaceReducer(require('./reducers').default)
  })
}

if (root_node != null) {
  render()
}

export default Root
