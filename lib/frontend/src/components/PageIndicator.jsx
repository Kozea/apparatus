import React from 'react'
import { connect } from 'react-redux'

import { block } from '../utils'

const b = block('PageIndicator')

function PageIndicator({ router }) {
  return (
    <footer className={b()}>
      <h3 className={b('page')}>{router.location.pathname}</h3>
    </footer>
  )
}

export default connect(state => ({ router: state.router }))(PageIndicator)
