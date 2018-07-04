import './Db.sass'

import block from 'bemboo'
import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import Formol, { Field } from 'formol'

import api from '../api'

@connect(
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
)
@block
export default class Db extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      color: {},
      shape: {},
    }
    this.handleColorDelete = this.handleDelete('color')
    this.handleShapeDelete = this.handleDelete('shape')
    this.handleColorSubmit = this.handleSubmit('color')
    this.handleShapeSubmit = this.handleSubmit('shape')
  }

  async componentDidMount() {
    const { sync } = this.props
    await sync()
    // eslint-disable-next-line no-console
    console.log('I am synced')
  }

  handleDelete(type) {
    return id => this.props.remove(type, id)
  }

  handleSubmit(type) {
    return async (transientItem, item) => {
      const { add, edit } = this.props
      try {
        if (item.id === void 0) {
          await add(type, transientItem, () => this.setState({ [type]: {} }))
        } else {
          await edit(type, { ...item, ...transientItem }, () =>
            this.setState({ [type]: {} })
          )
        }
      } catch (error) {
        console.error(error)
      }
      this.setState({ [type]: {} })
      return {}
    }
  }

  render(b) {
    const { color, shape } = this.props
    const { color: colorItem, shape: shapeItem } = this.state
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
                <button onClick={() => this.handleColorDelete(c.id)}>
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
                <button onClick={() => this.handleShapeDelete(s.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={b.e('forms')}>
          <div className={b.e('color')}>
            <h2>Color</h2>
            <Formol
              item={colorItem}
              onSubmit={this.handleColorSubmit}
              submitText={colorItem.id ? 'Edit' : 'Add'}
            >
              <Field required>Name</Field>
              <Field>Hex</Field>
              <Field>Rgb</Field>
            </Formol>
          </div>
          <div className={b.e('shape')}>
            <h2>Shape</h2>
            <Formol
              item={shapeItem}
              onSubmit={this.handleShapeSubmit}
              submitText={shapeItem.id ? 'Edit' : 'Add'}
            >
              <Field required>Name</Field>
              <Field required type="range" min={0} max={42}>
                Sides
              </Field>
            </Formol>
          </div>
        </div>
      </section>
    )
  }
}
