import './Db.sass'

import block from 'bemboo'
import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

import api from '../api'

@block
class Db extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: {},
      shape: {},
    }
  }
  async componentDidMount() {
    const { sync } = this.props
    await sync()
    // eslint-disable-next-line no-console
    console.log('I am synced')
  }

  handleChange(type, key, val) {
    this.setState({ [type]: { ...this.state[type], [key]: val } })
  }

  handleDelete(type, id) {
    const { remove } = this.props
    remove(type, id)
  }

  async handleSubmit(type, e) {
    e.preventDefault()
    const { add, edit } = this.props
    const obj = this.state[type]
    obj.name = obj.name || null
    try {
      if (obj.id === void 0) {
        await add(type, obj, () => this.setState({ [type]: {} }))
      } else {
        await edit(type, obj, () => this.setState({ [type]: {} }))
      }
    } catch (error) {
      console.error(error)
    }
    this.setState({ [type]: {} })
  }

  render(b) {
    const { color, shape } = this.props
    return (
      <section className={b}>
        <Helmet>
          <title>This is the color / shape page</title>
        </Helmet>
        <div className={b.e('lists')}>
          <div className={b.e('colors')}>
            <h2>Colors</h2>
            {color.loading && <div className={b.e('loading')}>LOADING...</div>}
            {color.objects.sort((x, y) => x.id - y.id).map(c => (
              <div key={c.id} className={b.e('color')}>
                <span style={{ color: c.hex }}>{c.name}</span> ({c.hex} /{' '}
                {c.rgb})
                <button onClick={() => this.setState({ color: c })}>
                  Edit
                </button>
                <button onClick={() => this.handleDelete('color', c.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className={b.e('shapes')}>
            <h2>Shapes</h2>
            {shape.loading && <div className={b.e('loading')}>LOADING...</div>}
            {shape.objects.sort((x, y) => x.id - y.id).map(s => (
              <div key={s.id} className={b.e('color')}>
                <span>{s.name}</span> {s.sides} sides.
                <button onClick={() => this.setState({ shape: s })}>
                  Edit
                </button>
                <button onClick={() => this.handleDelete('shape', s.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={b.e('forms')}>
          <div className={b.e('color')}>
            <h2>Color</h2>
            <form onSubmit={e => this.handleSubmit('color', e)}>
              <input
                name="name"
                placeholder="name"
                value={this.state.color.name || ''}
                onChange={e =>
                  this.handleChange('color', 'name', e.target.value)
                }
              />
              <input
                name="hex"
                placeholder="hex"
                value={this.state.color.hex || ''}
                onChange={e =>
                  this.handleChange('color', 'hex', e.target.value)
                }
              />
              <input
                name="rgb"
                placeholder="rgb"
                value={this.state.color.rgb || ''}
                onChange={e =>
                  this.handleChange('color', 'rgb', e.target.value)
                }
              />
              <input
                type="submit"
                value={this.state.color.id === void 0 ? 'Add' : 'Edit'}
              />
            </form>
          </div>
          <div className={b.e('shape')}>
            <h2>Shape</h2>
            <form onSubmit={e => this.handleSubmit('shape', e)}>
              <input
                name="name"
                placeholder="name"
                value={this.state.shape.name || ''}
                onChange={e =>
                  this.handleChange('shape', 'name', e.target.value)
                }
              />
              <input
                name="sides"
                placeholder="sides"
                value={this.state.shape.sides || ''}
                type="number"
                onChange={e =>
                  this.handleChange('shape', 'sides', e.target.value)
                }
              />
              <input
                type="submit"
                value={this.state.shape.id === void 0 ? 'Add' : 'Edit'}
              />
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default connect(
  state => ({
    color: state.api.color,
    shape: state.api.shape,
  }),
  dispatch => ({
    sync: () =>
      Promise.all([
        dispatch(api.actions.color.get()),
        dispatch(api.actions.shape.get()),
      ]),
    add: (type, obj) => dispatch(api.actions[type].post(obj)),
    edit: (type, obj) =>
      dispatch(api.actions[type].putItem({ id: obj.id }, obj)),
    remove: (type, id) => dispatch(api.actions[type].deleteItem({ id })),
  })
)(Db)
