import React, { Component } from 'react';
import {pacomo} from '../utils'


@pacomo
class Log extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { log: [] };
  }

  log(s) {
    this.setState({
      log: [{id: Date.now(), text: s}].concat(this.state.log)
    });
  }

  handleChange(e) {
    this.log(e.target.value);
  }

  render() {
    return (
      <div>
        <input onChange={this.handleChange} />
        <ul className='list'>
          {this.state.log.map(log => (
            <li key={log.id} className='line'>{log.text}</li>
          ))}
        </ul>
      </div>
   );
  }
};

export default Log;
