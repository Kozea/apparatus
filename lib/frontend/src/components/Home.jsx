import './Home.sass'

import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { block } from '../utils'

const b = block('Home')

function Home({ gotoDate }) {
  return (
    <section className={b()}>
      <h2 className={b('title')}>Home</h2>
      <button onClick={gotoDate}>Go to the date page with a button !</button>
    </section>
  )
}

export default connect(
  () => ({}),
  dispatch => ({ gotoDate: () => dispatch(push('/date')) })
)(Home)
