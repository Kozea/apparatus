import React, { Component } from 'react'
import { pacomo } from '../utils'
import store from '../index.jsx'
import './Counter.sass'


@pacomo.decorator
export default class Counter extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.onStartCounter()
  }

  componentWillUnmount() {
    this.props.onStopCounter()
  }

  render() {
    return (
      <div>
        <h2>Counter: <span className='count'>{this.props.count}</span></h2>
        <button className='button' onClick={() => this.props.onResetClick()}>Reset</button>
      </div>
   )
  }
}
