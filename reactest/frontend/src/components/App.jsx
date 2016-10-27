import React, { Component } from 'react';

import Layout from './Layout';
import Counter from './Counter';
import './Counter.sass';
import Log from './Log';
import './Log.sass';

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
      <Layout>
        <Counter start={+document.body.getAttribute('data-count')} onUpdate={(message) => this.log(message)}/>
        <Log log={this.state.log}/>
      </Layout>
    );
  }
};

export default App;
