import { API } from '../config/api';
import { axiosGetWithToken, axiosPostWithHeader,axiosPostWithToken, axiosPut } from '../services/apiServices';
import { PUBLISHED_POSTS, SEARCH_CONTRIBUTORS, ARCHIVED_POST_LIST, ARCHIVED_PAGE_NO } from './types';
import { SET_CURRENT_POSTS_PAGE } from './filterAction';

export const POST_COMMENTS = 'POST_COMMENTS';
export const UPDATE_PUBLISHED_POSTLIST = 'UPDATE_PUBLISHED_POSTLIST'
export const UPDATE_PUBLISHED_PAGEPOSTLIST = 'UPDATE_PUBLISHED_PAGEPOSTLIST'
export const DIDYOUKNOW_POSTS = 'DIDYOUKNOW_POSTS'
export const SET_CURRENT_DIDYOUKNOW_PAGE = 'SET_CURRENT_DIDYOUKNOW_PAGE'

export const fetchPublishedPosts = (onLoad, limit = 10, currentpage = 1) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    axiosGetWithToken(
      `${API.PUBLISHED_POSTS}?limit=${limit}&page=${currentpage}`,
      token,
    ).then((res) => {
      onLoad();
      if (res?.status === 200) {
        dispatch({
          type: PUBLISHED_POSTS,
          payload: res.data.data,
        });
      } else {
        console.log('SOME EROR');
      }
    });
  };
};

export const searchContributors = (term) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    axiosGetWithToken(`${API.SEARCH_CONTRIBUTORS}${term}`, token).then(
      (res) => {
        if (res?.status === 200) {
          dispatch({
            type: SEARCH_CONTRIBUTORS,
            payload: res.data.data,
          });
        } else {
          console.log('SOME EROR');
        }
      },
    );
  };
};

export const setPublishedPostCurrentPage = (page) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT_POSTS_PAGE,
    payload: page,
  });
};

export const setArchivedPostCurrentPage = (page) => async (dispatch) => {
  dispatch({
    type: ARCHIVED_PAGE_NO,
    payload: page,
  });
}

export const filterPublishedPost = (onLoad, limit, page, data) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    axiosGetWithToken(
      `${API.PUBLISHED_POSTS}?page=${page}&limit=${limit}&${data}`,
      token,
    ).then((res) => {
      onLoad();
      if (res?.status === 200) {
        dispatch({
          type: PUBLISHED_POSTS,
          payload: res.data.data,
        });
      } else {
        console.log('SOME EROR');
      }
    });
  };
};

export const filterPublishedStories = (onLoad, limit, page, data, longReads) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const api = longReads ? API.VIEW_LONGREADS : API.PUBLISHED_STORIES
    axiosGetWithToken(
      `${api}?page=${page}&limit=${limit}&${data}`,
      token,
    ).then((res) => {
      onLoad();
      if (res?.status === 200) {
        dispatch({
          type: PUBLISHED_POSTS,
          payload: res.data.data,
        });
      } else {
        console.log('SOME EROR');
      }
    });
  };
};

export const fetchArchivePosts = (onLoad, limit, page, data) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    axiosGetWithToken(
      `${API.GET_ARCHIVED_POSTS}?page=${page}&limit=${limit}&${data}`,
      token,
    ).then((res) => {
      onLoad();
      if (res?.status === 200) {
        dispatch({
          type: ARCHIVED_POST_LIST,
          payload: res.data.data,
        });
      } else {
        console.log('SOME EROR');
      }
    });
  };
}


export const fetchPostComments = (postId, loader, pageNo, results) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    axiosGetWithToken(
      `${API.POST_COMMENTS_LIST}/${postId}/comment?limit=${5}&page=${pageNo}`,
      token,
    ).then((res) => {
      if (res?.status === 200) {
        if (parseInt(pageNo, 10) !== 1) {
          console.log(...results, ...res?.data?.data?.results, 'ddddd');
          const fullResult = [...results, ...res?.data?.data?.results];
          const pageResult = res?.data?.data;
          pageResult.results = fullResult;
          dispatch({ type: POST_COMMENTS, payload: res.data.data });
        } else {
          console.log(res?.data?.data?.results, 'ddddd');
          dispatch({ type: POST_COMMENTS, payload: res.data.data });
        }
        loader();
      } else {
        dispatch({
          type: POST_COMMENTS,
          payload: [],
        });
        loader();
      }
    });
  };
};

export const postArchiveUnArchive = (type, postId, loader, setAlert, callback) => {
  return async (dispatch, getState) => {
    loader(true);
    const token = getState().auth.token;
    const Api = type === 'archive' ? API.ARCHIVE_POST : API.UNARCHIVE_POST;
    axiosPostWithHeader(
      `${Api}/${postId}`,
      {},
      token,
    ).then((res) => {
      loader(false);
      if (res?.status === 200) {
        setAlert('success', type === 'archive' ? 'Post archived successfully': 'Post unarchived successfully');
        callback()
      } else {
        console.log('SOME EROR');
      }
    }).catch((err) => {
      loader(false);
      console.log(err);
    })
  };
}

export const updatePublishedPostList = (id, data, type) => {
  return async (dispatch, getState) => {
    const publishedPostList = getState().post.publishedPostList?.results;
    const publishedPagePostList = getState().page.pagePostList?.results;

    if(type === 'posts') {
    let tempList = publishedPostList;
    const index = tempList.findIndex(item => item._id === id)
    tempList[index] = data;

    dispatch({
      type: UPDATE_PUBLISHED_POSTLIST,
      payload: tempList
    })
    }
    else if(type === 'pagePosts') {
    let tempList = publishedPagePostList;
    const index = tempList.findIndex(item => item._id === id)
    tempList[index] = data;
    dispatch({
      type: UPDATE_PUBLISHED_PAGEPOSTLIST,
      payload: tempList
    })
    }
  };
};

export const editPublishedPost = (id, body, callback) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    axiosPostWithToken(
      `${API.POST_DETAILS_UPDATE_API}${id}/update`,
      body,
      token
    )
    .then((res) => {
      if (res?.status === 200) {
        callback('success');
      } else {
        console.log('SOME EROR',res);
        callback('error');
      }
    })
    .catch((err) => {
      console.log('error',err)
    });
  };
}

export const editPublishedStory = (id, body, callback) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    axiosPut(
      `${API.UPDATE_PUBLISHED_STORY}${id}`,
      body,
      token
    )
    .then((res) => {
      if (res?.status === 200) {
        callback('success');
      } else {
        console.log('SOME EROR',res);
        callback('error');
      }
    })
    .catch((err) => {
      console.log('error',err)
    });
  };
}

//DID YOU KNOW
export const markAsDidYouKnow = (type, data, setAlert, refresh) => {
  return async (dispatch, getState) => {
 const token = getState().auth.token
  try {
    axiosPostWithToken(`${type === 'add' ? API.MARK_AS_DIDYOUKNOW : API.UNMARK_AS_DIDYOUKNOW}`, {post: data}, token).then((res) => {
      if (res.status === 200) {
        if(type === 'add') {
        setAlert('success', 'Posts moved to Did you know Successfully');
        }
        else {
           setAlert('success', 'Posts removed from Did you know Successfully');
        }
         refresh();
      } else {
        setAlert('error', res.data.message || 'Something went wrong please try again');
      }
    })
    }
  catch(err) {
    console.log('error',err)
  }
  }
}

export const fetchDidYouKnowPosts = (onLoad, limit = 10, currentpage = 1) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    axiosGetWithToken(
      `${API.GET_DIDYOUKNOW}?limit=${limit}&page=${currentpage}`,
      token,
    ).then((res) => {
      onLoad();
      if (res?.status === 200) {
        dispatch({
          type: DIDYOUKNOW_POSTS,
          payload: res.data.data,
        });
      } else {
        console.log('SOME EROR');
      }
    });
  };
};

export const filterDidYouKnowPost = (onLoad, limit, page, data) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    axiosGetWithToken(
      `${API.GET_DIDYOUKNOW}?page=${page}&limit=${limit}&${data}`,
      token,
    ).then((res) => {
      onLoad();
      if (res?.status === 200) {
        dispatch({
          type: DIDYOUKNOW_POSTS,
          payload: res.data.data,
        });
      } else {
        console.log('SOME EROR');
      }
    });
  };
};

export const setDidYouKnowCurrentPage = (page) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT_DIDYOUKNOW_PAGE,
    payload: page,
  });
};


export const createLongReads = (data, onLoad, setAlert) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    axiosPostWithToken(`${API.CREATE_LONGREADS}`, data, token).then((res) => {
      if (res.status === 201) {
       onLoad()
        setAlert('success', 'Long Reads added successfully');
      } else {
       onLoad()
        setAlert('error', res.data.message || 'Something went wrong please try again');
      }
    })
  }
}

export const editLongReads = (id, data, onLoad, setAlert) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    axiosPut(`${API.EDIT_LONGREADS}/${id}/update`, data, token).then((res) => {
      if (res.status === 201) {
       onLoad()
        setAlert('success', 'Long Reads Updated successfully');
      } else {
       onLoad()
        setAlert('error', res.data.message || 'Something went wrong please try again');
      }
    })
  }
}