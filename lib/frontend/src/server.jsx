import fs from 'fs'
import path from 'path'
import { PassThrough } from 'stream'

import { createMemoryHistory } from 'history'
import fetch from 'isomorphic-fetch'
import Koaze from 'koaze'
import React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { routerMiddleware } from 'react-router-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import App from './components/App'
import * as config from './config'
import reducers from './reducers'
import Root from './Root'

const koaze = new Koaze({
  ...config,
  faviconPath: path.resolve(__dirname, 'favicon.png'),
  staticDirs: [],
  assetsDir: config.dirs.assets,
})

let indexHead = null
let indexFooter = null

if (config.debug) {
  ;(async () => {
    const response = await fetch(
      `${config.assetsUrl.href.replace(/\/$/, '')}${
        config.publicPath
      }index.html`
    )
    const index = await response.text()
    ;[indexHead, indexFooter] = index.split('<!--REPLACEME-->')
  })()
} else {
  ;[indexHead, indexFooter] = fs
    .readFileSync(path.resolve(config.dirs.assets, 'index.html'), 'utf-8')
    .split('<!--REPLACEME-->')
}

koaze.router.get('/*', ctx => {
  const htmlStream = new PassThrough()
  htmlStream.write(indexHead)
  const history = createMemoryHistory({ initialEntries: [ctx.url] })
  const store = createStore(
    reducers,
    compose(applyMiddleware(routerMiddleware(history), thunk))
  )
  const stream = renderToNodeStream(
    <Root store={store} history={history}>
      <App />
    </Root>
  )
  stream.pipe(htmlStream, { end: false })
  stream.on('end', () => {
    const finalFooter = indexFooter.replace(
      '</body>',
      `<script>
        window.__STATE__=${JSON.stringify(store.getState())}
      </script></body>`
    )
    htmlStream.write(finalFooter)
    ctx.status = store.getState().status
    htmlStream.end()
  })
  ctx.type = 'text/html'
  ctx.body = htmlStream
})

koaze.serve(console.error.bind(console))
