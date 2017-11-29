export const setServerDate = date => ({
  type: 'SET_SERVER_DATE',
  date,
})

export const setClientDate = date => ({
  type: 'SET_CLIENT_DATE',
  date,
})

export const setCode = code => ({
  type: 'SET_CODE',
  code,
})

export const setRedirect = (code, url) => ({
  type: 'SET_REDIRECT',
  code,
  url,
})
