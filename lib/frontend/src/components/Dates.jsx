import './Dates.sass'

import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

import { setClientDate } from '../actions'
import { fetchServerDate } from '../actions/thunks'
import { block } from '../utils'

const b = block('Dates')

class Dates extends React.Component {
  componentWillMount() {
    const { syncServerDate } = this.props
    syncServerDate()
  }

  refreshServer() {
    const { syncServerDate } = this.props
    syncServerDate()
  }

  refreshClient() {
    const { syncClientDate } = this.props
    syncClientDate()
  }

  render() {
    const { client, server } = this.props
    return (
      <section className={b()}>
        <Helmet>
          <title>This is the date page</title>
        </Helmet>

        <p>It’s {client} o’clock on client</p>
        {server === null ? (
          <p>Loading</p>
        ) : (
          <p>It’s {server} o’clock on server</p>
        )}
        <button onClick={() => this.refreshClient()}>
          Refresh client date
        </button>
        <button onClick={() => this.refreshServer()}>
          Refresh server date
        </button>
        <button
          onClick={() => {
            this.refreshServer()
            this.refreshClient()
          }}
        >
          Refresh both
        </button>
      </section>
    )
  }
}

export default connect(
  state => ({
    client: state.date.client,
    server: state.date.server,
  }),
  dispatch => ({
    syncServerDate: () => dispatch(fetchServerDate()),
    syncClientDate: () => dispatch(setClientDate(Date.now())),
  })
)(Dates)
