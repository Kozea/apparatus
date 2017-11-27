import fs from 'fs'
import path from 'path'
import { PassThrough } from 'stream'

import fetch from 'isomorphic-fetch'
import Koaze from 'koaze'
import React from 'react'
import { renderToNodeStream } from 'react-dom/server'

import App from './components/App'
import * as config from './config'
import Root from './Root'
import { staticStoreAndHistory } from './utils'

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
  const { store, history } = staticStoreAndHistory(ctx.url)
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
    htmlStream.end()
  })
  ctx.type = 'text/html'
  ctx.body = htmlStream
})

koaze.serve(console.error.bind(console))
