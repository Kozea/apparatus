import block from 'bemboo'
import React from 'react'
import { connect } from 'react-redux'

const b = block('PageIndicator')
function PageIndicator({ router, status: { code, url } }) {
  return (
    <footer className={b}>
      <h3 className={b.e('page')}>
        <small>{code} </small> {url && `${url} -> `}
        {router.location.pathname}
      </h3>
    </footer>
  )
}

export default connect(state => ({
  router: state.router,
  status: state.status,
}))(PageIndicator)
