import React from 'react'

export default (resolve, options) => {
  const { Loading, Error } = options || {}

  return class AsyncWrapper extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        Component: null,
        error: null,
      }
    }

    componentDidMount() {
      const { Component } = this.state
      if (!Component) {
        this.resolve()
      }
    }

    componentDidCatch(error, info) {
      this.setState({ error })
      console.error(error, info)
    }

    async resolve() {
      try {
        const module = await resolve()
        const Component = module.default || module
        this.setState({ Component })
      } catch (error) {
        console.error(error)
        this.setState({ error })
      }
    }

    render() {
      const { Component, error } = this.state
      if (error) {
        return Error ? <Error error={error} /> : 'Error'
      }
      if (!Component) {
        return Loading ? <Loading /> : 'Loading'
      }
      return <Component {...this.props} />
    }
  }
}
