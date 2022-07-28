import {
  axiosGetWithToken,
  axiosPostWithToken,
  axiosPut,
} from '../services/apiServices'
export const isLoggedIn = (log) => {
  return {
    type: 'LOGGED_IN',
    payload: log,
  }
}

export const loginToken = (token) => {
  return {
    type: 'LOGGED_TOKEN',
    payload: token,
  }
}

export const fetchCategories = () => async (dispatch, getState) => {
  const response = await axiosGetWithToken(
    'https://1e00b2olq2.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/category',
    getState().token
  )
  dispatch({ type: 'FETCH_CATEGORIES', payload: response.data })
}

export const fetchsubCategories = (id) => async (dispatch, getState) => {
  const response = await axiosGetWithToken(
    `https://1e00b2olq2.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/category/${id}`,
    getState().token
  )
  dispatch({ type: 'FETCH_SUBCATEGORIES', payload: response.data })
}

export const addCategories = (body) => async (dispatch, getState) => {
  const response = await axiosPostWithToken(
    'https://1e00b2olq2.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/category',
    body,
    getState().token
  )
  dispatch({ type: 'ADD_CATEGORY', payload: response })
}

export const addSubcategories = (body) => async (dispatch, getState) => {
  const response = await axiosPostWithToken(
    'https://1e00b2olq2.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/subCategory',
    body,
    getState().token
  )
  dispatch({ type: 'ADD_SUBCATEGORY', payload: response })
}

export const editCategories = (id, body) => async (dispatch, getState) => {
  const response = await axiosPut(
    `https://1e00b2olq2.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/category/${id}`,
    body,
    getState().token
  )
  dispatch({ type: 'EDIT_CATEGORY', payload: response })
}

export const editSubCategories = (id, body) => async (dispatch, getState) => {
  const response = await axiosPut(
    `https://1e00b2olq2.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/subCategory/${id}`,
    body,
    getState().token
  )
  dispatch({ type: 'EDIT_SUBCATEGORY', payload: response })
}

export const fetchPublishedPages =
  (limit, currentpage) => async (dispatch, getState) => {
    const response = await axiosGetWithToken(
      `https://1e00b2olq2.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/page/published?limit=${limit}&page=${currentpage}`,
      getState().token
    )
    dispatch({ type: 'FETCH_PUBLISHED_PAGES', payload: response.data })
  }

export const fetchPendingPages =
  (limit, currentpage) => async (dispatch, getState) => {
    const response = await axiosGetWithToken(
      `https://1e00b2olq2.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/page/pending?limit=${limit}&page=${currentpage}`,
      getState().token
    )
    dispatch({ type: 'FETCH_PENDING_PAGES', payload: response.data })
  }
