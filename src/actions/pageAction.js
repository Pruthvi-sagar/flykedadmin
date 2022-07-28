import { API } from '../config/api'
import { axiosGetWithToken, axiosPut } from '../services/apiServices'
import {
  PUBLISHED_PAGES,
  PENDING_PAGES,
  SEARCH_PAGES,
  EDIT_PAGE,
  PAGE_POST,
  SET_CURRENT_PUBLISHED_PAGE,
  SET_CURRENT_PENDING_PAGE,
  SELECTED_PAGE_TITLE,
  SET_CURRENT_PAGE_POSTS_PAGE,
} from './types'
export const SET_PAGE_DETAILS = 'SET_PAGE_DETAILS'
export const SET_PAGE_DETAILS_LOADER = 'SET_PAGE_DETAILS_LOADER'
export const SET_PAGE_POST_THUMBNAILS = 'SET_PAGE_POST_THUMBNAILS'
export const SET_PAGE_POST_THUMBNAILS_LOADER = 'SET_PAGE_POST_THUMBNAILS_LOADER'
export const SET_CURRENT_THUMBNAILS_PAGE = 'SET_CURRENT_THUMBNAILS_PAGE'
export const CLEAR_PAGE_DETAILS = 'CLEAR_PAGE_DETAILS'
export const SET_TAGS = 'SET_TAGS'

export const fetchPublishedPages = (onLoad, limit = 10, currentpage = 1) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    axiosGetWithToken(
      `${API.PUBLISHED_PAGES}?limit=${limit}&page=${currentpage}`,
      token
    ).then((res) => {
      onLoad()
      if (res?.status === 200) {
        dispatch({
          type: PUBLISHED_PAGES,
          payload: res.data.data,
        })
      } else {
        console.log('SOME EROR')
      }
    })
  }
}

export const fetchPendingPages = (onLoad, limit = 10, currentpage = 1) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    axiosGetWithToken(
      `${API.PENDING_PAGES}?limit=${limit}&page=${currentpage}`,
      token
    ).then((res) => {
      onLoad()
      if (res.status === 200) {
        dispatch({
          type: PENDING_PAGES,
          payload: res.data.data,
        })
      } else {
        console.log('SOME EROR')
      }
    })
  }
}

export const searchPages = (term) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    axiosGetWithToken(`${API.SEARCH_PAGES}${term}&limit=40`, token).then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: SEARCH_PAGES,
          payload: res.data.data,
        })
      } else {
        console.log('SOME EROR')
      }
    })
  }
}

export const approvePages = (id, body, refresh, handleClickOpen, callback) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    axiosPut(`${API.PAGE}/${id}/approve`, body, token).then((res) => {
      if (res.status === 200) {
        if(callback) callback()
        if (refresh) refresh()
        if (handleClickOpen) handleClickOpen()
      } else {
        console.log('SOME EROR')
      }
    })
  }
}
export const rejectPages = (id, refresh, handleClickOpen, callback) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    axiosPut(`${API.PAGE}/${id}/reject`, {}, token).then((res) => {
      if (res.status === 200) {
        if (refresh) refresh()
        if (handleClickOpen) handleClickOpen()
        callback();
      } else {
        console.log('SOME EROR')
      }
    })
  }
}

export const mergePage = (id, body, refresh, handleClickOpen, callback) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    axiosPut(`${API.PAGE}/${id}/merge`, body, token).then((res) => {
      if (res.status === 200) {
        if (refresh) refresh()
        if (handleClickOpen) handleClickOpen()
        callback();
      } else {
        console.log('SOME EROR')
      }
    })
  }
}

export const editPage = (id, data, refresh, editClose, setAlert, handleLoader) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    axiosPut(`${API.PAGE}/${id}`, data, token).then((res) => {
      if (res.status === 200) {
        setAlert('success', 'Page edited successfully');
        if (refresh) refresh()
        if(data?.title && data?.category) editClose()
        dispatch({
          type: EDIT_PAGE,
          payload: res.data.data,
        })
        if(handleLoader) {
          handleLoader();
        }
      } else {
        setAlert('error', res.data.message || 'Something went wrong please try again');
        if(handleLoader) {
          handleLoader();
        }
        console.log('SOME EROR')
      }
    })
  }
}


export const editAndApprovePage = (id, data, approve, loader, setAlert) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
  try {
    axiosPut(`${API.PAGE}/${id}`, data, token).then((res) => {
      if (res.status === 200) {
        setAlert('success', 'Page edited successfully');
        if (approve) approve()
        dispatch({
          type: EDIT_PAGE,
          payload: res.data.data,
        })
      } else {
        setAlert('error', res.data.message || 'Something went wrong please try again');
      }
    })
    }
  catch(err) {
    console.log('error',err)
  }
  finally {
      loader();
  }
  }
}

export const filterPendingPage = (onLoad, limit, page, data) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    axiosGetWithToken(
      `${API.PENDING_PAGES}?page=${page}&limit=${limit}&${data}`,
      token
    ).then((res) => {
      onLoad()
      if (res.status === 200) {
        dispatch({
          type: PENDING_PAGES,
          payload: res.data.data,
        })
      } else {
        console.log('SOME EROR')
      }
    })
  }
}

export const filterPublishedPage = (onLoad, limit, page, data) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    axiosGetWithToken(
      `${API.PUBLISHED_PAGES}?page=${page}&limit=${limit}&${data}`,
      token
    ).then((res) => {
      onLoad()
      if (res.status === 200) {
        dispatch({
          type: PUBLISHED_PAGES,
          payload: res.data.data,
        })
      } else {
        console.log('SOME EROR')
      }
    })
  }
}

export const fetchPagePosts = (onLoad, id, limit = 10, currentpage = 1) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    axiosGetWithToken(`${API.PAGE}/${id}/post`, token).then((res) => {
      if (onLoad) onLoad()
      if (res?.status === 200) {
        dispatch({
          type: PAGE_POST,
          payload: res.data.data,
        })
      } else {
        console.log('SOME EROR')
      }
    })
  }
}

export const filterPagePosts = (onLoad, id, limit, page, data) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    axiosGetWithToken(
      `${API.PAGE}/${id}/post?page=${page}&limit=${limit}&${data}`,
      token
    ).then((res) => {
      if(onLoad) onLoad()
      if (res?.status === 200) {
        dispatch({
          type: PAGE_POST,
          payload: res.data.data,
        })
      } else {
        console.log('SOME EROR')
      }
    })
  }
}

export const setPublishedPageCurrentPage = (page) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT_PUBLISHED_PAGE,
    payload: page,
  })
}

export const setPendingPageCurrentPage = (page) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT_PENDING_PAGE,
    payload: page,
  })
}
export const setPublishedPagePostsCurrentPage = (page) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT_PAGE_POSTS_PAGE,
    payload: page,
  })
}

export const getSelectedPageTitle = (title) => async (dispatch) => {
  dispatch({
    type: SELECTED_PAGE_TITLE,
    payload: title,
  })
}

export const viewPageDetails = (id, loader) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
       dispatch({
          type: SET_PAGE_DETAILS_LOADER,
          payload: true,
        })
  try {
    axiosGetWithToken(
      `${API.GET_PAGE_DETAILS}/${id}/edit`,
      token
    ).then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: SET_PAGE_DETAILS,
          payload: res.data.data,
        })
      dispatch({
      type: SET_PAGE_DETAILS_LOADER,
      payload: false,
    })
      } else {
      dispatch({
      type: SET_PAGE_DETAILS_LOADER,
      payload: false,
    })
      }
    })
    }
  catch(err) {
    console.log('error',err)
  }
  }
}


export const viewPagePostThumbnails = (id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    const currentPage = getState().page.thumbnailsCurrentPage;
       dispatch({
          type: SET_PAGE_POST_THUMBNAILS_LOADER,
          payload: true,
        })
  try {
    axiosGetWithToken(
      `${API.GET_PAGE_THUMBNAILS}/${id}/thumbnails?limit=${10}&page=${currentPage}`,
      token
    ).then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: SET_PAGE_POST_THUMBNAILS,
          payload: res.data.data,
        })
      dispatch({
      type: SET_PAGE_POST_THUMBNAILS_LOADER,
      payload: false,
    })
      } else {
      dispatch({
      type: SET_PAGE_POST_THUMBNAILS_LOADER,
      payload: false,
    })
      }
    })
    }
  catch(err) {
    console.log('error',err)
  }
  }
}


export const setThumbnailsCurrentPage = (page) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT_THUMBNAILS_PAGE,
    payload: page,
  })
}

export const clearPageDetails = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PAGE_DETAILS,
  })
  dispatch({
    type: SET_PAGE_POST_THUMBNAILS,
    payload: {},
  })
}

export const getTags = (id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
  try {
    axiosGetWithToken(
      `${API.GET_TAGS}`,
      token
    ).then((res) => {
      if (res?.data?.status === 'success') {
        dispatch({
          type: SET_TAGS,
          payload:res.data.data.results,
        })
      } else {
      dispatch({
      type: SET_TAGS,
      payload: [],
    })
      }
    })
    }
  catch(err) {
    console.log('error',err)
  }
  }
}