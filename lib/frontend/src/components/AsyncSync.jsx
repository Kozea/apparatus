import './Async.sass'

import block from 'bemboo'
import React from 'react'

import SubAsync from './SubAsync'

export default block('Async', (b, { location }) => (
  <article className={b}>
    I am soooo <span className={b.e('async')}>ASYNC</span>
    {location.pathname}
    <SubAsync />
  </article>
))
