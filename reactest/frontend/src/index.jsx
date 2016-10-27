import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import reactest from './reducers'
import App from './components/App'
import './index.sass'

const logger = createLogger()

let store = createStore(reactest, applyMiddleware(thunk, logger))

let render = () => {
  const App = require('./components/App').default
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

if (module.hot) {
  const renderApp = render
  const renderError = (error) => {
    const RedBox = require('redbox-react')
    ReactDOM.render(
      <RedBox error={error} />,
      document.getElementById('root')
    )
  }
  render = () => {
    try {
      renderApp()
    } catch (error) {
      renderError(error)
    }
    module.hot.accept('./components/App', () => {
      setTimeout(render)
    })
  }
}

render()
