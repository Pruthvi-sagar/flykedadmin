import {
  get,
  mediaUpload,
  patch,
  plainDelete,
  post,
  postFormData,
  put,
} from './coreApiServices'

export const axiosGet = (api) => {
  return get(api)
}

export const axiosGetWithToken = async (api, token) => {
  let headers = {
    Authorization: `Bearer ${token}`,
  }

  let result = await get(api, headers)
  return result
}

export const axiosPost = (api, body) => {
  return post(api, body)
}

export const axiosPostWithHeader = (api, body, token) => {
  let headers = {
    Authorization: `Bearer ${token}`,
  }
  return post(api, body, headers)
}

export const axiosPostWithToken = (api, body, token) => {
  let headers = {
    Authorization: `Bearer ${token}`,
  }
  return post(api, body, headers)
}

export const axiosPostFormData = async (api, body) => {
  return postFormData(api, body)
}

export const axiosPut = (api, body, token = null) => {
  let headers = token === null ? {} : { Authorization: `Bearer ${token}` }
  return put(api, body, headers)
}

export const axiosPatchWithToken = (api, body, token = null) => {
  let headers = token === null ? {} : { Authorization: `Bearer ${token}` }
  return patch(api, body, headers)
}

export const axiosDelete = (api, token = null) => {
  let headers = token === null ? {} : { Authorization: `Bearer ${token}` }
  return plainDelete(api, headers)
}

export const axiosMediaUpload = async (url, media_type, media, token) => {
  return mediaUpload(url, media_type, media, token)
}
