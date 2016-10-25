import React, { Component } from 'react';

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: +document.body.getAttribute('data-count') };
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
      counter: +document.body.getAttribute('data-count')
    });
  }

  render() {
    return (
      <div>
        <h2>Counter: <span className="count">{this.state.counter}</span></h2>
        <button onClick={this.handleClick}>Reset</button>
      </div>
   );
  }
}
