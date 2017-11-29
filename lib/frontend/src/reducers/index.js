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

const status = (state = { code: 200, url: null }, action) => {
  switch (action.type) {
    case 'SET_CODE':
      return { ...state, code: action.code }
    case 'SET_REDIRECT':
      return { ...state, code: action.code, url: action.url }
    case LOCATION_CHANGE:
      return { code: 200, url: null }
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
