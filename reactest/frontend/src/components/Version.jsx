import React, { Component } from 'react'
import { pacomo } from '../utils'
import './LogList.sass'


@pacomo.decorator
export default class Version extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.onSetVersion()
  }

  render() {
    return (
      <div>
        { this.props.version }
      </div>
    )
  }
}
