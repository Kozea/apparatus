import block from 'bemboo'
import React from 'react'
import { withRouter } from 'react-router-dom'

@withRouter
@block
export default class PageIndicator extends React.PureComponent {
  render(b) {
    const { location } = this.props

    return (
      <footer className={b}>
        <h3 className={b.e('page')}>{location.pathname}</h3>
        <small>
          Router props:
          {JSON.stringify(this.props)}
        </small>
      </footer>
    )
  }
}
