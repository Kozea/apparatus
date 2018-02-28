import './SubAsync.sass'

import block from 'bemboo'
import React from 'react'

export default block('SubAsync', b => (
  <article className={b}>
    I am even moar <span className={b.e('async')}>A S Y N C</span>
  </article>
))
