import React, { Component } from 'react'

import StartCounter from '../containers/StartCounter'
import Log from '../containers/Log'
import './App.sass'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {log: []}
  }

  render() {
    return (
      <div>
        <h1>Hello react redux ^^</h1>
        <StartCounter onUpdate={(message) => this.log(message)}/>
        <Log log={this.state.log}/>
      </div>
    )
  }
}

export default App
