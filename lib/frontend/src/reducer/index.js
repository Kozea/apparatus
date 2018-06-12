import { combineReducers } from 'redux'

import api from '../api'
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

export default combineReducers({
  date,
  api: combineReducers(api.reducers),
})
