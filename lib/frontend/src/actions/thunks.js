import fetch from 'isomorphic-fetch'

import { setServerDate } from './'

export const fetchServerDate = () => async dispatch => {
  const response = await fetch('api/date.json')
  if (response.status !== 200) {
    console.error('Bad date request', response)
    return
  }
  const { date } = await response.json()
  dispatch(setServerDate(date))
}
