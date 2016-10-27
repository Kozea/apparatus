import React, { Component } from 'react'

import StartCounter from '../containers/StartCounter'
import Log from '../containers/Log'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {log: []}
  }

  log(s) {
    this.setState({
      log: [{id: Date.now(), text: s}].concat(this.state.log)
    });
  }

  render() {
    return (
      <div>
        <h1>Hello react redux</h1>
        <StartCounter start={+document.body.getAttribute('data-count')} onUpdate={(message) => this.log(message)}/>
        <Log log={this.state.log}/>
      </div>
    );
  }
};

export default App;
