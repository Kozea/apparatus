import block from 'bemboo'
import React from 'react'
import { withRouter } from 'react-router-dom'

import { Status } from '../utils'

@block
@withRouter
export default class NotFound extends React.PureComponent {
  render(b) {
    const { location } = this.props
    return (
      <Status status={404}>
        <div className={b}>
          <div style={{ fontSize: '10em' }}>&gt;_&lt;</div>
          <strong>{location.pathname}</strong> was not found on server
        </div>
      </Status>
    )
  }
}
