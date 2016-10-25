import React, { Component } from 'react';

import Layout from './Layout';
import Counter from './Counter';
import './Counter.sass';

class App extends Component {
  render() {
    return (
      <Layout>
        <Counter />
      </Layout>
    );
  }
};

export default App;
