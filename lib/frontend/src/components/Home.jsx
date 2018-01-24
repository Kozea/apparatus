import './Home.sass'

import block from 'bemboo'
import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

const b = block('Home')
function Home({ gotoDate }) {
  return (
    <section className={b}>
      <Helmet>
        <title>It’s feels like home</title>
      </Helmet>
      <h2 className={b.e('title')}>Home</h2>
      <button onClick={gotoDate}>Go to the date page with a button !</button>
    </section>
  )
}

export default connect(
  () => ({}),
  dispatch => ({ gotoDate: () => dispatch(push('/date')) })
)(Home)
