import React from 'react'
import { connect } from 'react-redux'

import { setStatus } from '../actions'

class Status extends React.PureComponent {
  render() {
    const { code, updateStatus, children } = this.props
    // We normally don't dispatc
    updateStatus(code)
    return children
  }
}

export default connect(
  () => ({}),
  dispatch => ({ updateStatus: status => dispatch(setStatus(status)) })
)(Status)
