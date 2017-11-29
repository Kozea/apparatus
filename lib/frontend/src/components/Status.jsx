import React from 'react'
import { connect } from 'react-redux'

import { setCode, setRedirect } from '../actions'

class Status extends React.PureComponent {
  componentWillMount() {
    this.update()
  }
  componentWillUpdate() {
    this.update()
  }
  update() {
    const { code, url, updateStatus } = this.props
    updateStatus(code, url)
  }
  render() {
    const { children } = this.props
    return children || null
  }
}

export default connect(
  () => ({}),
  dispatch => ({
    updateStatus: (code, url) => {
      if ([301, 302].includes(code)) {
        dispatch(setRedirect(code, url))
      } else {
        dispatch(setCode(status))
      }
    },
  })
)(Status)
