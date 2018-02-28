import Async from './utils/Async'

export default Async({
  resolve: () => import(/* webpackChunkName: "Async" */ './AsyncSync'),
})
