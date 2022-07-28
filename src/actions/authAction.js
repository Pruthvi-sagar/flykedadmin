import { API } from '../config/api'
import { axiosPost } from '../services/apiServices'
import {
  removeLocalStorage,
  saveLocalStorage,
} from '../services/storageServices'
import { SUCCESS_ALERT, ERROR_ALERT } from './commonAction'
import { LOGIN, LOGOUT } from './types'

export const login = (emailId, password, redirectUser, pageLoader) => {
  
  const body = {
    email: emailId,
    password: password,
  }

  return async (dispatch) => {
    axiosPost(API.LOGIN, body).then((res) => {
      if (res?.status === 200) {
        try {
          dispatch({
            type: LOGIN,
            payload: res.data,
          })
          saveLocalStorage('token', res?.data?.token)
          saveLocalStorage('userData', res?.data?.data?.user)
          redirectUser()
        } catch {
          dispatch({
            type: ERROR_ALERT,
            payload: res.data.message,
          })
          if(pageLoader) {
            pageLoader()
          }
        }
      } else {
        dispatch({
          type: ERROR_ALERT,
          payload: res.data.message,
        })
        if(pageLoader) {
          pageLoader()
        }
      }
    })
  }
}

export const sessionLogout = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT, token: null, user: {} })
    removeLocalStorage('userData')
    removeLocalStorage('token')
  }
}
