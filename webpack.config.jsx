import { getBaseConfigClient, getBaseConfigServer } from 'webpackozea'

import { renderHtml } from './lib/frontend/src/render'
import {
  apiUrl,
  assetsUrl,
  cwd,
  debug,
  dirs,
  forcePolyfill,
  inspect,
  publicPath,
  serverUrl,
  staging,
  verbose,
} from './lib/frontend/src/config'

// eslint-disable-next-line
let webpackConfig

if (process.env.WEBPACK_ENV === 'server') {
  const serverConfig = {
    apiUrl,
    assetsUrl,
    cwd,
    debug,
    dirs,
    inspect,
    publicPath,
    serverUrl,
    staging,
    verbose,
  }
  webpackConfig = getBaseConfigServer(serverConfig)
} else {
  const clientConfig = {
    apiUrl,
    assetsUrl,
    debug,
    dirs,
    forcePolyfill,
    publicPath,
    serverUrl,
    staging,
    verbose,
    additionalIncludes: ['formol'],
  }
  webpackConfig = getBaseConfigClient(clientConfig, renderHtml)
}

export default webpackConfig
