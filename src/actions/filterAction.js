import {
  FILTER_PAGE,
  FILTER_APPLIED_PENDING,
  FILTER_APPLIED_PUBLISHED,
  FILTER_APPLIED_PUBLISHED_POSTS,
  FILTER_CATEGORY_PUBLISHED,
  FILTER_CATEGORY_PENDING,
  FILTER_SUBCATEGORY_PUBLISHED,
  FILTER_SUBCATEGORY_PENDING,
  FILTER_DATE_PENDING,
  FILTER_DATE_PUBLISHED,
  FILTER_CONTRIBUTOR_PUBLISHED,
  FILTER_POSTTYPE_PUBLISHED,
  FILTER_DATE_POST_PUBLISHED,
  FILTER_POST_PUBLISHED_PAGE,
  FILTER_DATE_POST_PAGE_POSTS,
  FILTER_POSTTYPE_PAGE_POSTS,
  FILTER_CONTRIBUTOR_PAGE_POSTS,
  FILTER_PAGE_POSTS_PAGE,
  FILTER_APPLIED_PAGE_POSTS,
  PUBLISHED_PAGE_FILTER,
  SET_CURRENT_PUBLISHED_PAGE,
  SET_CURRENT_PENDING_PAGE,
  PENDING_PAGE_FILTER,
} from './types'

export const PUBLISHED_POSTS_FILTER = 'PUBLISHED_POSTS_FILTER'
export const SET_CURRENT_POSTS_PAGE = 'SET_CURRENT_POSTS_PAGE'
export const PUBLISHED_PAGE_POSTS_FILTER = 'PUBLISHED_PAGE_POSTS_FILTER'
export const SET_CURRENT_PAGE_POSTS_PAGE = 'SET_CURRENT_PAGE_POSTS_PAGE'

export const isFilteredPublished = (data) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FILTER_APPLIED_PUBLISHED,
      payload: data,
    })
  }
}

export const isFilteredPending = (data) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FILTER_APPLIED_PENDING,
      payload: data,
    })
  }
}

export const categoryFilterPublished = (data) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FILTER_CATEGORY_PUBLISHED,
      payload: data,
    })
  }
}

export const categoryFilterPending = (data) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FILTER_CATEGORY_PENDING,
      payload: data,
    })
  }
}

export const subCategoryFilterPublished = (data) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FILTER_SUBCATEGORY_PUBLISHED,
      payload: data,
    })
  }
}

export const subCategoryFilterPending = (data) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FILTER_SUBCATEGORY_PENDING,
      payload: data,
    })
  }
}

export const dateFilterPublished = (start, end) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FILTER_DATE_PUBLISHED,
      payload: { start, end },
    })
  }
}

export const dateFilterPending = (start, end) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FILTER_DATE_PENDING,
      payload: { start, end },
    })
  }
}

export const pageFilter = (page) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FILTER_PAGE,
      payload: page,
    })
  }
}

export const filterPublishedPage = (data, handleClose) => {
  return async (dispatch) => {
    dispatch({
      type: SET_CURRENT_PUBLISHED_PAGE,
      payload: 1,
    })
    dispatch({
      type: PUBLISHED_PAGE_FILTER,
      payload: data,
    })

    handleClose()
  }
}

export const filterPendingPage = (data, handleClose) => {
  return async (dispatch) => {
    dispatch({
      type: SET_CURRENT_PENDING_PAGE,
      payload: 1,
    })
    dispatch({
      type: PENDING_PAGE_FILTER,
      payload: data,
    })

    handleClose()
  }
}

// PUBLISHED POSTS
export const isFilteredPublishedPosts = (data) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FILTER_APPLIED_PUBLISHED_POSTS,
      payload: data,
    })
  }
}

export const publishedPostsPageFilter = (page) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FILTER_POST_PUBLISHED_PAGE,
      payload: page,
    })
  }
}

export const publishedPostsContributorFilter = (contributor) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FILTER_CONTRIBUTOR_PUBLISHED,
      payload: contributor,
    })
  }
}

export const publishedPostsPostTypeFilter = (page) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FILTER_POSTTYPE_PUBLISHED,
      payload: page,
    })
  }
}

export const dateFilterPublishedPosts = (start, end) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FILTER_DATE_POST_PUBLISHED,
      payload: { start, end },
    })
  }
}

// PAGE POSTS
export const isFilteredPagePosts = (data) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FILTER_APPLIED_PAGE_POSTS,
      payload: data,
    })
  }
}

export const pagePostsPageFilter = (page) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FILTER_PAGE_POSTS_PAGE,
      payload: page,
    })
  }
}

export const pagePostsContributorFilter = (contributor) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FILTER_CONTRIBUTOR_PAGE_POSTS,
      payload: contributor,
    })
  }
}

export const pagePostsPostTypeFilter = (page) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FILTER_POSTTYPE_PAGE_POSTS,
      payload: page,
    })
  }
}

export const dateFilterPagePosts = (start, end) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FILTER_DATE_POST_PAGE_POSTS,
      payload: { start, end },
    })
  }
}

export const filterPublishedPosts = (data, handleClose) => {
  return async (dispatch) => {
    dispatch({
      type: SET_CURRENT_POSTS_PAGE,
      payload: 1,
    })
    dispatch({
      type: PUBLISHED_POSTS_FILTER,
      payload: data,
    })

    handleClose()
  }
}

export const filterPagePosts = (data, handleClose) => {
  return async (dispatch) => {
    dispatch({
      type: SET_CURRENT_PAGE_POSTS_PAGE,
      payload: 1,
    })
    dispatch({
      type: PUBLISHED_PAGE_POSTS_FILTER,
      payload: data,
    })

    handleClose()
  }
}
