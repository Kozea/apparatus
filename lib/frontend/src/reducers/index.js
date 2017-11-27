import { LOCATION_CHANGE, routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

import initial from './initial'

const date = (state = initial.date, action) => {
  switch (action.type) {
    case 'SET_SERVER_DATE':
      return {
        ...state,
        server: action.date,
      }
    case 'SET_CLIENT_DATE':
      return {
        ...state,
        client: action.date,
      }
    default:
      return state
  }
}

const status = (state = initial.status, action) => {
  switch (action.type) {
    case 'SET_STATUS':
      return action.status
    case LOCATION_CHANGE:
      return 200
    default:
      return state
  }
}

const reducer = combineReducers({
  date,
  router: routerReducer,
  status,
})

export default reducer
