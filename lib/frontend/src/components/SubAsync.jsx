import Async from './utils/Async'

export default Async({
  resolve: () => import(/* webpackChunkName: "SubAsync" */ './SubAsyncSync'),
})
