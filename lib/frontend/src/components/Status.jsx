import React from 'react'
import { connect } from 'react-redux'

import { setStatus } from '../actions'

class Status extends React.PureComponent {
  componentWillMount() {
    this.update()
  }
  componentWillUpdate() {
    this.update()
  }
  update() {
    const { code, updateStatus } = this.props
    updateStatus(code)
  }
  render() {
    const { children } = this.props
    return children
  }
}

export default connect(
  () => ({}),
  dispatch => ({ updateStatus: status => dispatch(setStatus(status)) })
)(Status)
