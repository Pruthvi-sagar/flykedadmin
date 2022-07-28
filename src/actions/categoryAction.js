import { API } from '../config/api'
import {
  axiosGetWithToken,
  axiosMediaUpload,
  axiosPostWithToken,
  axiosPut,
} from '../services/apiServices'
import {
  CATEGORIES,
  SUBCATEGORIES,
  ADD_CATEGORY,
  ADD_SUBCATEGORY,
  EDIT_CATEGORY,
  EDIT_SUBCATEGORY,
  SUBCATEGORIES_LIST,
  ERROR_ALERT,
} from './types'

export const getCategories = (onLoad) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    axiosGetWithToken(API.CATEGORY, token).then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: CATEGORIES,
          payload: res.data.data,
        })
        onLoad()
      } else {
        dispatch({
          type: ERROR_ALERT,
          payload: res.data.message,
        })
      }
    })
  }
}

export const addCategory = (data, onLoad, setAlert) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    axiosPostWithToken(`${API.CATEGORY}`, data, token).then((res) => {
      onLoad()
      if (res.data.status === 201 || res.data.status === 'success' || res.data.status === 'Success') {
        setAlert('success', 'Category added successfully');
        dispatch({
          type: ADD_CATEGORY,
          payload: res.data.doc,
        })
      } else {
        console.log('res.data',res.data)
        setAlert('error', res.data.message || 'Something went wrong. Could not create category.');
        dispatch({
          type: ERROR_ALERT,
          payload: res.data.message,
        })
      }
    })
  }
}

export const editCategory = (id, data, onLoad, setAlert) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    axiosPut(`${API.CATEGORY}/${id}`, data, token).then((res) => {
      onLoad()
      if (res.status === 200) {
        setAlert('success', 'Category edited successfully')
        dispatch({
          type: EDIT_CATEGORY,
          payload: res.data.data,
        })
      } else {
        setAlert('error', res.data.message || 'Something went wrong please try again');
        dispatch({
          type: ERROR_ALERT,
          payload: res.data.message,
        })
      }
    })
  }
}

export const addSubCategory = (data, onLoad, refresh, setAlert) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    axiosPostWithToken(`${API.SUB_CATEGORY}`, data, token).then((res) => {

      if (res.status === 201) {
        setAlert('success', 'Subcategory added successfully');
        dispatch({
          type: ADD_SUBCATEGORY,
          payload: res.data.data,
        })
        onLoad()
        refresh()
      } else {
        setAlert('error', res.data.message || 'Something went wrong please try again');
        dispatch({
          type: ERROR_ALERT,
          payload: res.data.message,
        })
      }
    })
  }
}

export const editSubCategory = (id, data, onLoad, setAlert) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    axiosPut(`${API.SUB_CATEGORY}/${id}`, data, token).then((res) => {
      onLoad()
      if (res.status === 200) {
        setAlert('success', 'Subcategory edited successfully')
        // dispatch({
        //   type: EDIT_SUBCATEGORY,
        //   payload: res.data.data,
        // })
      } else {
        setAlert('error', res.data.message || 'Something went wrong please try again');
        dispatch({
          type: ERROR_ALERT,
          payload: res.data.message,
        })
      }
    })
  }
}

export const getSubCategories = (id, onLoad) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    axiosGetWithToken(`${API.CATEGORY}/${id}`, token).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: SUBCATEGORIES,
          payload: res.data.data,
        })
        onLoad()
      } else {
      }
    })
  }
}


export const clearSubCategories = () => {
  return async (dispatch, getState) => {
        dispatch({
          type: SUBCATEGORIES,
          payload: [],
        })
          dispatch({
          type: SUBCATEGORIES_LIST,
          payload: [],
        })
    }
  }


export const getSubCategoriesList = (onLoad) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    axiosGetWithToken(API.SUB_CATEGORY, token).then((res) => {
      onLoad()
      if (res.status === 200) {
        dispatch({
          type: SUBCATEGORIES_LIST,
          payload: res.data.data,
        })
      } else {
        dispatch({
          type: ERROR_ALERT,
          payload: res.data.message,
        })
      }
    })
  }
}

export const uploadImage = (file, updatePic, fileType) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    axiosMediaUpload(API.MEDIA_UPLOAD, fileType || 'user', file, token).then((res) => {
      if (res?.data?.status === 'success') {
        updatePic(res.data.data)
      } else {
        updatePic('')
        dispatch({
          type: ERROR_ALERT,
          payload: res.data.message,
        })
      }
    })
  }
}
