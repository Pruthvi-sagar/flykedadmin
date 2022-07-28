import { PUBLISHED_POSTS, SEARCH_CONTRIBUTORS, ARCHIVED_POST_LIST, ARCHIVED_PAGE_NO } from '../actions/types';
import { SET_CURRENT_POSTS_PAGE } from '../actions/filterAction';
import { POST_COMMENTS, UPDATE_PUBLISHED_POSTLIST, DIDYOUKNOW_POSTS,SET_CURRENT_DIDYOUKNOW_PAGE } from '../actions/postAction';
const initialState = {
  publishedPostList: {},
  searchContributorsList: [],
  publishedPostCurrentPage: 1,
  postComments: [],
  // searchTerm: '',
  archivedPostList: [],
  archivedPostCurrentPage: 1,
  //didyouknow
   didYouKnowPostList: {},
  didYouKnowPostCurrentPage: 1,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ARCHIVED_POST_LIST: {
      return {
        ...state,
        archivedPostList: action?.payload,
        archivedPostCurrentPage: action?.payload?.currentPage || 1,
      }; 
    }
    case ARCHIVED_PAGE_NO: {
      return {
        ...state,
        archivedPostCurrentPage: action.payload,
      };
    }
    case PUBLISHED_POSTS: {
      return {
        ...state,
        publishedPostList: action.payload,
        publishedPostCurrentPage: action.payload.currentPage,
      };
    }
     case DIDYOUKNOW_POSTS: {
      return {
        ...state,
        didYouKnowPostList: action.payload,
        didYouKnowPostCurrentPage: action.payload.currentPage,
      };
    }
    case SEARCH_CONTRIBUTORS: {
      return {
        ...state,
        searchContributorsList: action.payload,
      };
    }
    case SET_CURRENT_POSTS_PAGE: {
      return {
        ...state,
        publishedPostCurrentPage: action.payload,
      };
    }
     case SET_CURRENT_DIDYOUKNOW_PAGE: {
      return {
        ...state,
        didYouKnowPostCurrentPage: action.payload,
      };
    }
    case POST_COMMENTS: {
      return {
        ...state,
        postComments: action.payload,
      };
    }
    case UPDATE_PUBLISHED_POSTLIST: {
      return {
        ...state,
        publishedPostList: {
          ...state.publishedPostList,
          results: action.payload
        },
      };
    }
    // case SEARCH_TERM: {
    //   return {
    //     ...state, searchTerm: action.payload,
    //   }
    // }
    default:
      return state;
  }
};

export default postReducer;
