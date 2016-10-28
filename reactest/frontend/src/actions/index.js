let tid = null

export const incrementCounter = (step = 1) => {
  return {
    type: 'INCREMENT_COUNTER',
    step
  }
}

export const resetCounter = () => {
  return {
    type: 'RESET_COUNTER'
  }
}

export const log = (message) => {
  return {
    type: 'LOG',
    message: {
      id: (new Date()),  // This is bad
      text: message
    }
  }
}

export const deleteLog = (messageId) => {
  return {
    type: 'DELETE_LOG',
    messageId
  }
}

// Thunks
export const startCounter = () => {
  return (dispatch, getState) => {
    const { count } = getState()
    tid = setInterval(() => {
      dispatch(incrementCounter(count.step))
      dispatch(log(`Incremented to ${getState().count.val}`))
    }, 1000)
  }
}

export const stopCounter = () => {
  return () => {
    tid && clearInterval(tid)
    tid = null
  }
}
