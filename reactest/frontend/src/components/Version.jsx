import React, { Component } from 'react'
import { block } from '../utils'
import './LogList.sass'


export default class Version extends Component {
  constructor(props) {
    super(props)
    this.b = block('Version')
  }

  componentDidMount() {
    this.props.onSetVersion()
  }

  render() {
    return (
      <div className={ this.b }>
        { this.props.version }
      </div>
    )
  }
}
