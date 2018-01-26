import block from 'bemboo'
import React from 'react'
import { connect } from 'react-redux'

export default connect(state => ({
  router: state.router,
  status: state.status,
}))(
  block(function PageIndicator(b, { router, status: { code, url } }) {
    return (
      <footer className={b}>
        <h3 className={b.e('page')}>
          <small>{code} </small> {url && `${url} -> `}
          {router.location.pathname}
        </h3>
      </footer>
    )
  })
)
