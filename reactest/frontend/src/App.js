import React, { Component } from 'react';
import Layout from './Layout';
import Counter from './Counter';
import './index.sass'

export default class App extends Component {
  render() {
    return (
      <Layout>
        <Counter />
      </Layout>
    );
  }
}
