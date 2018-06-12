import path from 'path'

import Koaze from 'koaze'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import App from './components/App'
import * as config from './config'
import reducer from './reducer'
import { renderHtml } from './render'

const koaze = new Koaze({
  ...config,
  faviconPath: path.resolve(__dirname, 'favicon.png'),
  staticDirs: [config.dirs.static],
  assetsDir: config.dirs.assets,
})

koaze.router.get('/*', ctx => {
  const store = createStore(reducer, compose(applyMiddleware(thunk)))
  const staticContext = {}

  // Render app and get side effects
  const app = renderToString(
    <Provider store={store}>
      <StaticRouter location={ctx.url} context={staticContext}>
        <App />
      </StaticRouter>
    </Provider>
  )

  // Get status from side effect
  ctx.status = staticContext.status || 200

  if ([301, 302].includes(staticContext.status) && staticContext.url) {
    ctx.redirect(staticContext.url)
    return
  }

  ctx.type = 'text/html'
  ctx.body = renderHtml(app, store)
})

koaze.serve(console.error.bind(console))
