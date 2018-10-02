import path from 'path'

import getBaseConfig from 'webpackozea'

import * as config from './lib/frontend/src/config'
// eslint-disable-next-line import/extensions
import { renderHtml } from './lib/frontend/src/render.jsx'

const webpackConfig = getBaseConfig(config, renderHtml)

webpackConfig.module.rules[0].include = [
  webpackConfig.module.rules[0].include,
  path.join(config.dirs.modules, 'formol'),
  path.join(config.dirs.modules, 'redux-api-unrest'),
]

export default webpackConfig
