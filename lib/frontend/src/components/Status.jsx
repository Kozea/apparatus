import React from 'react'
import { connect } from 'react-redux'

import { setStatus } from '../actions'

class Status extends React.Component {
  componentWillMount() {
    const { code, updateStatus } = this.props
    updateStatus(code)
  }
  componentDidUpdate() {
    this.componentWillMount()
  }
  render() {
    const { children } = this.props
    return children
  }
}

export default connect(
  state => ({ request: state.request }),
  dispatch => ({ updateStatus: status => dispatch(setStatus(status)) })
)(Status)
