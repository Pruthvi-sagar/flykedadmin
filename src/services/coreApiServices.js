import axios from 'axios'
import * as authAction from '../actions/authAction.js'
import store from '../store'

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
}

const attachDefaultContentType = (header) => {
  if (header['Content-Type'] === null || header['Content-Type'] === undefined) {
    header['Content-Type'] = 'application/json'
  }
  return header
}

// get method
export const get = async (api, headers = {}) => {
  headers = attachDefaultContentType(headers)
  let response = await axios
    .get(api, { headers: headers })
    .then((res) => ({
      data: res.data,
      status: res.status,
    }))
    .catch((err) => err.response)
  if (response?.status && response?.status === 403) {
    store.dispatch(authAction.sessionLogout())
  }

  return response
}

// Post method
export const post = async (api, body, headers = {}) => {
  headers = attachDefaultContentType(headers)
  let response = await axios
    .post(api, body, {
      headers: headers,
    })
    .then((res) => ({ data: res.data, status: res.status }))
    .catch((err) => err.response)
  if (response?.status && response?.status === 403) {
    store.dispatch(authAction.sessionLogout())
  }

  return response
}

// Put method
export const put = async (api, body, headers = {}) => {
  headers = attachDefaultContentType(headers)
  let args = [api, body]

  if (headers) {
    args = [
      api,
      body,
      {
        headers: headers,
      },
    ]
  }
  let response = await axios
    .put(...args)
    .then((res) => ({ data: res.data, status: res.status }))
    .catch((err) => err.response)
  if (response.status && response.status === 403) {
    store.dispatch(authAction.sessionLogout())
  }

  return response
}
// Patch method
export const patch = async (api, body, headers = {}) => {
  headers = attachDefaultContentType(headers)
  let args = [api, body]

  if (headers) {
    args = [
      api,
      body,
      {
        headers: headers,
      },
    ]
  }
  let response = await axios
    .patch(...args)
    .then((res) => ({ data: res.data, status: res.status }))
    .catch((err) => err.response)
  if (response.status && response.status === 403) {
    store.dispatch(authAction.sessionLogout())
  }

  return response
}

// delete
export const plainDelete = async (api, headers) => {
  headers = attachDefaultContentType(headers)
  let args = [api]
  if (headers) {
    args = [
      api,
      {
        headers: headers,
      },
    ]
  }
  let response = await axios
    .delete(...args)
    .then((res) => ({ data: res.data, status: res.status }))
    .catch((err) => err.response)
  if (response.status && response.status === 403) {
    store.dispatch(authAction.sessionLogout())
  }

  return response
}

// post form data
export const postFormData = async (api, body) => {
  let result = await axios.post(api, JSON.stringify(body), config)
  let response = {
    status: result.status,
    data: result.data,
  }
  if (response.status && response.status === 403) {
    store.dispatch(authAction.sessionLogout())
  }

  return response
}

export const mediaUpload = async (url, media_type, media, token) => {
  let headers = {
    Authorization: `Bearer ${token}`,
    accept: 'application/json',
    'Content-Type': `multipart/form-data`,
  }
  let formData = new FormData()
  formData.append('fileType', media_type)
  formData.append('file', media)

  let result = await axios.post(url, formData, { headers })
  if (result.status_code && result.status_code === 403) {
    store.dispatch(authAction.sessionLogout())
  }

  return {
    status: result.status_code,
    data: result.data,
  }
}
