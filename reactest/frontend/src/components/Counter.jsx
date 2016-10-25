import React, { Component } from 'react';
import {pacomo} from '../utils'


@pacomo
export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: this.props.start };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  tick() {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleClick(e) {
    this.setState({
      counter: this.props.start
    });
  }

  render() {
    return (
      <div>
        <h2>Counter: <span className='count'>{this.state.counter}</span></h2>
        <button className='button' onClick={this.handleClick}>Reset</button>
      </div>
   );
  }
};
