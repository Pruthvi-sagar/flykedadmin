import { ERROR_ALERT, SUCCESS_ALERT } from '../actions/commonAction'

const commonReducer = (state, { type, payload }) => {
  switch (type) {
    case SUCCESS_ALERT:
      return {
        ...state,
        alertType: 'success',
        alertMessage: payload,
      }
    case ERROR_ALERT:
      return {
        ...state,
        alertType: 'error',
        alertMessage: payload,
      }

    default:
      return {
        ...state,
        alertType: null,
        alertMessage: null,
      }
  }
}

export default commonReducer
