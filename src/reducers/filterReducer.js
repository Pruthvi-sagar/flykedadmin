import {
  FILTER_PAGE,
  FILTER_APPLIED_PENDING,
  FILTER_APPLIED_PUBLISHED,
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
  FILTER_APPLIED_PUBLISHED_POSTS,
  FILTER_APPLIED_PAGE_POSTS,
  FILTER_DATE_POST_PAGE_POSTS,
  FILTER_POSTTYPE_PAGE_POSTS,
  FILTER_CONTRIBUTOR_PAGE_POSTS,
  FILTER_PAGE_POSTS_PAGE,
  PUBLISHED_PAGE_FILTER,
  PENDING_PAGE_FILTER,
} from '../actions/types';
import { PUBLISHED_POSTS_FILTER, PUBLISHED_PAGE_POSTS_FILTER } from '../actions/filterAction';

const initialState = {
  published: {
    isFilteredPublished: false,
    date: {
      startDate: null,
      endDate: null,
    },
    selectedCategory: '',
    selectedSubCategory: '',
    page: '',
  },
  pending: {
    selectedCategory: '',
    selectedSubCategory: '',
    isFilteredPending: false,
    date: {
      startDate: null,
      endDate: null,
    },
    page: '',
  },
  postPublished: {
    isFilteredPublishedPosts: false,
    date: {
      startDate: null,
      endDate: null,
    },
    contributor: null,
    postType: null,
    page: null,
  },
  pagePosts: {
    isFilteredPagePosts: false,
    date: {
      startDate: null,
      endDate: null,
    },
    contributor: null,
    postType: null,
  },
}

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_APPLIED_PENDING: {
      return {
        ...state,
        pending: { ...state.pending, isFilteredPending: action.payload },
      }
    }

    case FILTER_APPLIED_PUBLISHED: {
      return {
        ...state,
        published: { ...state.published, isFilteredPublished: action.payload },
      }
    }

    case FILTER_CATEGORY_PUBLISHED: {
      return {
        ...state,
        published: { ...state.published, selectedCategory: action.payload },
      }
    }

    case FILTER_CATEGORY_PENDING: {
      return {
        ...state,
        pending: { ...state.pending, selectedCategory: action.payload },
      }
    }

    case FILTER_SUBCATEGORY_PUBLISHED: {
      return {
        ...state,
        published: { ...state.published, selectedSubCategory: action.payload },
      }
    }

    case FILTER_SUBCATEGORY_PENDING: {
      return {
        ...state,
        pending: { ...state.pending, selectedSubCategory: action.payload },
      }
    }

    case FILTER_DATE_PENDING: {
      return {
        ...state,
        pending: {
          ...state.pending,
          startDate: action.payload.start,
          endDate: action.payload.end,
        },
      }
    }

    case FILTER_DATE_PUBLISHED: {
      return {
        ...state,
        published: {
          ...state.published,
          startDate: action.payload.start,
          endDate: action.payload.end,
        },
      }
    }

    case FILTER_PAGE: {
      return {
        ...state,
        published: {
          ...state.published,
          page: action.payload,
        },
      }
    }

    case PUBLISHED_PAGE_FILTER: {
      return {
        ...state,
        published: {
          ...action.payload,
        },
      }
    }

    case PENDING_PAGE_FILTER: {
      return {
        ...state,
        pending: {
          ...action.payload,
        },
      }
    }
    // PUBLISHED POSTS
    case FILTER_APPLIED_PUBLISHED_POSTS: {
      return {
        ...state,
        postPublished: {
          ...state.postPublished,
          isFilteredPublishedPosts: action.payload,
        },
      }
    }

    case FILTER_POST_PUBLISHED_PAGE: {
      return {
        ...state,
        postPublished: {
          ...state.postPublished,
          page: action.payload,
        },
      }
    }

    case FILTER_CONTRIBUTOR_PUBLISHED: {
      return {
        ...state,
        postPublished: {
          ...state.postPublished,
          contributor: action.payload,
        },
      }
    }

    case FILTER_POSTTYPE_PUBLISHED: {
      return {
        ...state,
        postPublished: {
          ...state.postPublished,
          postType: action.payload,
        },
      }
    }

    case FILTER_DATE_POST_PUBLISHED: {
      return {
        ...state,
        postPublished: {
          ...state.postPublished,
          startDate: action.payload.start,
          endDate: action.payload.end,
        },
      }
    }

    // Page Posts
    case FILTER_APPLIED_PAGE_POSTS: {
      return {
        ...state,
        pagePosts: { ...state.pagePosts, isFilteredPagePosts: action.payload },
      }
    }

    case FILTER_PAGE_POSTS_PAGE: {
      return {
        ...state,
        pagePosts: {
          ...state.pagePosts,
          page: action.payload,
        },
      }
    }

    case FILTER_CONTRIBUTOR_PAGE_POSTS: {
      return {
        ...state,
        pagePosts: {
          ...state.pagePosts,
          contributor: action.payload,
        },
      }
    }

    case FILTER_POSTTYPE_PAGE_POSTS: {
      return {
        ...state,
        pagePosts: {
          ...state.pagePosts,
          postType: action.payload,
        },
      }
    }

    case FILTER_DATE_POST_PAGE_POSTS: {
      return {
        ...state,
        pagePosts: {
          ...state.pagePosts,
          startDate: action.payload.start,
          endDate: action.payload.end,
        },
      }
    }

    case PUBLISHED_POSTS_FILTER: {
      return {
        ...state,
        postPublished: {
          ...action.payload,
        },
      }
    }

    case PUBLISHED_PAGE_POSTS_FILTER: {
      return {
        ...state,
        pagePosts: {
          ...action.payload,
        },
      };
    }

    default:
      return state
  }
}

export default filterReducer
