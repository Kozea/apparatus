/* eslint-disable react/no-multi-comp */
import React from 'react'
import { Redirect as ReactRouterRedirect, Route } from 'react-router-dom'

export const Status = ({ status, children }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = status
      }
      return children
    }}
  />
)

export const Redirect = ({ from, to, status }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = status || 301
      }
      return <ReactRouterRedirect from={from} to={to} />
    }}
  />
)
