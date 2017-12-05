import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

import api from '../api'
import { block } from '../utils'

const b = block('Db')

class Db extends React.Component {
  componentDidMount() {
    const { sync } = this.props
    sync()
  }

  render() {
    const { color, shape } = this.props
    return (
      <section className={b()}>
        <Helmet>
          <title>This is the color / shape page</title>
        </Helmet>
        <div className={b('lists')}>
          <div className={b('colors')}>
            <h2>Colors</h2>
            {color.loading && 'LOADING...'}
            {color.data.map(c => (
              <div key={c.id} className={b('color')}>
                <span style={{ color: c.hex }}>{c.name}</span> ({c.hex} /{' '}
                {c.rgb})
              </div>
            ))}
          </div>
          <div className={b('shapes')}>
            <h2>Shapes</h2>
            {shape.loading && 'LOADING...'}
            {shape.data.map(s => (
              <div key={s.id} className={b('color')}>
                <span>{s.name}</span> {s.sides} sides.
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
}

export default connect(
  state => ({
    color: state.api.color,
    shape: state.api.shape,
  }),
  dispatch => ({
    sync: () => {
      dispatch(api.actions.color.get())
      dispatch(api.actions.shape.get())
    },
  })
)(Db)
