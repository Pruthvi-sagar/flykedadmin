import {
  PENDING_PAGES,
  PUBLISHED_PAGES,
  SEARCH_PAGES,
  PAGE_POST,
  SET_CURRENT_PUBLISHED_PAGE,
  SET_CURRENT_PENDING_PAGE,
  SELECTED_PAGE_TITLE,
  SET_CURRENT_PAGE_POSTS_PAGE,
  SEARCH_CONTRIBUTORS,
} from '../actions/types'
import {UPDATE_PUBLISHED_PAGEPOSTLIST}  from '../actions/postAction'
import {SET_PAGE_DETAILS, SET_PAGE_DETAILS_LOADER, SET_TAGS, SET_PAGE_POST_THUMBNAILS, CLEAR_PAGE_DETAILS, SET_PAGE_POST_THUMBNAILS_LOADER, SET_CURRENT_THUMBNAILS_PAGE} from '../actions/pageAction'

const initialState = {
  publishedPageList: {},
  pendingPageList: {},
  searchList: {},
  pagePostList: {},
  publishedPageCurrentPage: 1,
  pendingPageCurrentPage: 1,
  selectedPageName: '',
  publishedPagePostsCurrentPage: 1,
  searchContributorsList: [],
  pageDetails: {},
  pageDetailsLoader: true,
  pagePostThumbnails: {},
  pagePostThumbnailsLoader: true,
  thumbnailsCurrentPage: 1,
  tags: []
}

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
     case SET_TAGS: {
      return {
        ...state,
      tags: action.payload,
      }
    }
    case CLEAR_PAGE_DETAILS: {
      return {
        ...state,
      pageDetails: {},
      pageDetailsLoader: true,
      pagePostThumbnails: {},
      pagePostThumbnailsLoader: true,
      thumbnailsCurrentPage: 1
      }
    }
    case SET_PAGE_POST_THUMBNAILS: {
      return {
        ...state,
        pagePostThumbnails: action.payload,
      }
    }
    case SET_CURRENT_THUMBNAILS_PAGE: {
      return {
        ...state,
        thumbnailsCurrentPage: action.payload,
      }
    }
    case SET_PAGE_POST_THUMBNAILS_LOADER: {
      return {
        ...state,
        pagePostThumbnailsLoader: action.payload,
      }
    }
     case SET_PAGE_DETAILS: {
      return {
        ...state,
        pageDetails: action.payload,
      }
    }
    case SET_PAGE_DETAILS_LOADER: {
      return {
        ...state,
        pageDetailsLoader: action.payload,
      }
    }
    case PUBLISHED_PAGES: {
      return {
        ...state,
        publishedPageList: action.payload,
        publishedPageCurrentPage: action.payload.currentPage,
      }
    }
    case PENDING_PAGES: {
      return {
        ...state,
        pendingPageList: action.payload,
      }
    }
    case SEARCH_PAGES: {
      return {
        ...state,
        searchList: action.payload,
      }
    }
    case PAGE_POST: {
      return {
        ...state,
        pagePostList: action.payload,
      }
    }
    case SET_CURRENT_PUBLISHED_PAGE: {
      return {
        ...state,
        publishedPageCurrentPage: action.payload,
      }
    }

    case SET_CURRENT_PENDING_PAGE: {
      return {
        ...state,
        pendingPageCurrentPage: action.payload,
      }
    }
    case SELECTED_PAGE_TITLE: {
      return {
        ...state,
        selectedPageName: action.payload,
      }
    }
    case SET_CURRENT_PAGE_POSTS_PAGE: {
      return {
        ...state,
        publishedPagePostsCurrentPage: action.payload,
      }
    }
  
  case SEARCH_CONTRIBUTORS: {
    return {
      ...state,
      searchContributorsList: action.payload,
    }
  }

    case UPDATE_PUBLISHED_PAGEPOSTLIST: {
    return {
      ...state,
      pagePostList: {
        ...state.pagePostList,
        results: action.payload,
      }
    }
  }

    default:
      return state
  }
}

export default pageReducer
