import { readFileSync } from 'fs'
import path from 'path'

import { createMemoryHistory } from 'history'
import Koaze from 'koaze'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Helmet } from 'react-helmet'
import { routerMiddleware } from 'react-router-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import App from './components/App'
import Html from './components/Html'
import * as config from './config'
import reducers from './reducers'
import Root from './Root'

const koaze = new Koaze({
  ...config,
  faviconPath: path.resolve(__dirname, 'favicon.png'),
  staticDirs: [],
  assetsDir: config.dirs.assets,
})

let css, js
if (config.debug) {
  css = []
  js = ['manifest.js', 'vendor.js', 'client.js'].map(
    file => `${config.publicPath}${file}`
  )
} else {
  const manifest = JSON.parse(
    readFileSync(path.resolve(config.dirs.assets, 'manifest.json'), 'utf8')
  )
  css = ['client.css'].map(file => `${config.publicPath}${manifest[file]}`)
  js = ['manifest.js', 'vendor.js', 'client.js'].map(
    file => `${config.publicPath}${manifest[file]}`
  )
}

koaze.router.get('/*', ctx => {
  const history = createMemoryHistory({ initialEntries: [ctx.url] })
  const store = createStore(
    reducers,
    compose(applyMiddleware(routerMiddleware(history), thunk))
  )

  // Render app and get side effects
  const app = renderToString(
    <Root store={store} history={history}>
      <App />
    </Root>
  )

  // Render outer app with side effects
  const html = renderToString(
    <Html
      helmet={Helmet.renderStatic()}
      window={{
        __STATE__: store.getState(),
      }}
      css={css}
      js={js}
      app={app}
    />
  )

  // Get status from side effect
  ctx.status = store.getState().status
  ctx.type = 'text/html'
  ctx.body = `<!DOCTYPE html>${html}`
})

koaze.serve(console.error.bind(console))
