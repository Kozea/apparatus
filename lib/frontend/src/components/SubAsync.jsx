import Async from './utils/Async'

export default Async(() =>
  import(/* webpackChunkName: "SubAsync" */ './SubAsyncSync')
)
