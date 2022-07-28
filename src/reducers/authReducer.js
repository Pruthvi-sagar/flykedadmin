import { LOGIN, LOGOUT, USER_INFO } from '../actions/types'
import { retrieveLocalStorage } from '../services/storageServices'

const initialState = {
  didTryAutoLogin: false,
  token: retrieveLocalStorage('token'),
  userData: retrieveLocalStorage('userData'),
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        token: action.payload.token,
        userData: action.payload.data.user,
      }
    }
    case USER_INFO: {
      return {
        ...state,
        userData: { ...state.userData, ...action.payload },
      }
    }
    case LOGOUT:
      return {
        token: action.token,
        userData: action.user,
      }
    default:
      return state
  }
}

export default authReducer
