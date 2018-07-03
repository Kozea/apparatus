import './Dates.sass'

import block from 'bemboo'
import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

import { setClientDate } from '../actions'
import { fetchServerDate } from '../actions/thunks'

@connect(
  state => ({
    client: state.date.client,
    server: state.date.server,
  }),
  dispatch => ({
    getServerDate: () => dispatch(fetchServerDate()),
    getClientDate: () => dispatch(setClientDate(Date.now())),
  })
)
@block
export default class Dates extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleRefreshClient = this.handleRefreshClient.bind(this)
    this.handleRefreshServer = this.handleRefreshServer.bind(this)
  }
  componentDidMount() {
    const { getServerDate } = this.props
    getServerDate()
  }

  handleRefreshServer() {
    const { getServerDate } = this.props
    getServerDate()
  }

  handleRefreshClient() {
    const { getClientDate } = this.props
    getClientDate()
  }

  render(b) {
    const { client, server } = this.props
    return (
      <section className={b}>
        <Helmet>
          <title>This is the date page</title>
        </Helmet>

        <p>It’s {client} o’clock on client</p>
        {server === null ? (
          <p>Loading</p>
        ) : (
          <p>It’s {server} o’clock on server</p>
        )}
        <button onClick={this.handleRefreshClient}>Refresh client date</button>
        <button onClick={this.handleRefreshServer}>Refresh server date</button>
        <button
          onClick={() => {
            this.handleRefreshServer()
            this.handleRefreshClient()
          }}
        >
          Refresh both
        </button>
      </section>
    )
  }
}
