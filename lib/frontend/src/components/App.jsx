import './App.sass'

import block from 'bemboo'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Route, Switch } from 'react-router-dom'
import { NotFound, Redirect } from 'redux-http-status'

import Dates from './Dates'
import Db from './Db'
import Home from './Home'
import PageIndicator from './PageIndicator'
import Link from './utils/Link'

@block
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      var: 1,
    }
  }

  render(b) {
    return (
      <main className={b}>
        <Helmet>
          <title>Apparatus site</title>
        </Helmet>
        <h1 className={b.e('main-title')}>Apparatus!</h1>
        <nav className={b.e('menu')}>
          <Link className={b.e('link')} exact to="/">
            Home
          </Link>
          <Link className={b.e('link')} to="/date">
            Date
          </Link>
          <Link className={b.e('link')} to="/db">
            Db
          </Link>
          <Link className={b.e('link')} to="/broken_link">
            This link is dead
          </Link>
          <Link className={b.e('link')} to="/old/date">
            This page has move to /date
          </Link>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/date" component={Dates} />
          <Route path="/db" component={Db} />
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
