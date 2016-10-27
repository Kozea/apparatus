import React, { Component } from 'react';
import { pacomo } from '../utils'


@pacomo.decorator
export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: this.props.start };
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  tick() {
    this.props.onUpdate(`Counter gone from ${this.state.counter} to ${this.state.counter + 1}`)
    this.setState(state => ({
      counter: state.counter + 1
    }));
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleClick(e) {
    this.props.onUpdate(`Counter reset from ${this.state.counter} to ${this.props.start}`)
    this.setState((state, props) => ({
      counter: props.start
    }));
  }

  render() {
    return (
      <div>
        <h2>Counter: <span className='count'>{this.state.counter}</span></h2>
        <button className='button' onClick={(e) => this.handleClick(e)}>Reset</button>
      </div>
   );
  }
};
