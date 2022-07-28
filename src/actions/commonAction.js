export const SUCCESS_ALERT = 'SUCCESS_ALERT'
export const ERROR_ALERT = 'ERROR_ALERT'
export const errorAlert = (message) => ({
  type: ERROR_ALERT,
  payload: message,
})

export const successAlert = (message) => ({
  type: SUCCESS_ALERT,
  payload: message,
})
