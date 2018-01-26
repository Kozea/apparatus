import block from 'bemboo'
import React from 'react'
import { NavLink } from 'react-router-dom'

export default block('Link', (b, { className, ...props }) => (
  <NavLink
    className={b.mix(className).s}
    activeClassName={
      b
        .mix(className)
        .m({ active: true })
        .sub(b.mix(className)).s
    }
    {...props}
  />
))
