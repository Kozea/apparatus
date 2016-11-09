import React, { Component } from 'react'
import { block } from '../utils'
import './Counter.sass'

export default class Counter extends Component {
  constructor(props) {
    super(props)
    this.b = block('Counter')
  }

  componentDidMount() {
    this.props.onStartCounter()
  }

  componentWillUnmount() {
    this.props.onStopCounter()
  }

  render() {
    return (
      <div className={ this.b }>
        <h2>Counter: <span className={ this.b('count') }>{ this.props.count }</span></h2>
        <button className={ this.b('button') } onClick={ () => this.props.onResetClick() }>Reset</button>
      </div>
   )
  }
}
