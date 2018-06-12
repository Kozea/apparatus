import './Home.sass'

import block from 'bemboo'
import React from 'react'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'

@withRouter
@block
export default class Home extends React.PureComponent {
  render(b) {
    const { history } = this.props
    return (
      <section className={b}>
        <Helmet>
          <title>It’s feels like home</title>
        </Helmet>
        <h2 className={b.e('title')}>Home</h2>
        <button onClick={() => history.push('/date')}>
          Go to the date page with a button !
        </button>
      </section>
    )
  }
}
