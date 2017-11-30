import './App.sass'

import React from 'react'
import { Helmet } from 'react-helmet'
import { NavLink, Route, Switch } from 'react-router-dom'
import { NotFound, Redirect } from 'redux-http-status'

import { block } from '../utils'
import Dates from './Dates'
import Home from './Home'
import PageIndicator from './PageIndicator'

const b = block('App')

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      var: 1,
    }
  }

  render() {
    return (
      <main className={b()}>
        <Helmet>
          <title>Apparatus site</title>
        </Helmet>
        <h1 className={b('main-title')}>Apparatus!</h1>
        <nav className={b('menu')}>
          <NavLink className={b('link')} exact to="/">
            Home
          </NavLink>
          <NavLink className={b('link')} to="/date">
            Date
          </NavLink>
          <NavLink className={b('link')} to="/broken_link">
            This link is dead
          </NavLink>
          <NavLink className={b('link')} to="/old/date">
            This page has move to /date
          </NavLink>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/date" component={Dates} />
          <Route
            path="/old/date"
            component={() => <Redirect code={301} url="/date" />}
          />
          <Route component={NotFound} />
        </Switch>
        <PageIndicator />
      </main>
    )
  }
}
