import { API } from '../config/api';
import { PENDING_POST_LIST, LOADING, PAGE_LOADING, POST_APPROVIE_REJECT_LOADING, CURRENT_PAGE_NUMBER, UNASSIGNED_POST_LIST, ALERT_DIALOG, POST_UPDATE_LOADING } from './types';
import axiosInstance from '../services/axiosInstance';
import moment from 'moment-mini';

export const handlePostApprovieReject = (type, body, setAlert, handleCallBack) => async (dispatch) => {
    dispatch({ type: POST_APPROVIE_REJECT_LOADING, payload: true });
    const api = type === 'approve' ? API.POST_APPROVIE_API : API.POST_REJECT_API;
    try {
        const { data } = await axiosInstance.post(api, { ...body }, {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (data?.status === 'success') {
            const des = type === 'approve' ? 'Post have been published, you can see them in respective pages.': 'Post has not published, and it has been rejected.'
          dispatch({ type: ALERT_DIALOG, payload: { open: true, title: data?.message, description: des }});
          handleCallBack();
        }
      } catch (err) {
        setAlert('error', err?.response?.data?.message);
      } finally {
        dispatch({ type: POST_APPROVIE_REJECT_LOADING, payload: false });
      }
};

export const handleStoryApprovieReject = (type, body, setAlert, handleCallBack) => async (dispatch) => {
    dispatch({ type: POST_APPROVIE_REJECT_LOADING, payload: true });
    const api = type === 'approve' ? API.STORY_APPROVE_API : API.STORY_REJECT_API;
    try {
        const { data } = await axiosInstance.post(api, { ...body }, {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (data?.status === 'success') {
            const des = type === 'approve' ? 'Story have been published, you can see them in respective pages.': 'Story has not been published, and it has been rejected.'
          dispatch({ type: ALERT_DIALOG, payload: { open: true, title: data?.message, description: des }});
          handleCallBack();
        }
      } catch (err) {
        setAlert('error', err?.response?.data?.message);
      } finally {
        dispatch({ type: POST_APPROVIE_REJECT_LOADING, payload: false });
      }
};

export const getPendingUnAssignedPostList = (postType, pageNo, setAlert, filters, loader) => async (dispatch) => {
    // dispatch({ type: LOADING, payload: true });
    const page = filters?.page ? `&postPage=${filters?.page}` : '';
     const segment = filters?.segmentType ? `&segmentType=${filters?.segmentType}` : '';
    const contributor = filters?.contributor ? `&createdBy=${filters?.contributor}` : '';
    const typePostBirth = filters?.postType?.birthday ? `&postType=onBirthday` : '';
    const typePostFact = filters?.postType?.fact ? `&postType=fact` : '';
    const typePostInNews = filters?.postType?.inTheNews ? `&postType=inNews` : '';
    const typePostOnTheDay = filters?.postType?.onTheDay ? `&postType=onThisDay` : '';
    const startDate = filters?.date?.startDate ? `&createdAt[gte]=${moment(filters?.date?.startDate).format('YYYY-MM-DD')}` : '';
    const endDate = filters?.date?.endDate ? `&createdAt[lte]=${moment(filters?.date?.endDate).format('YYYY-MM-DD')}` : '';
    const filter = `${page}${segment}${contributor}${typePostBirth}${typePostFact}${typePostInNews}${typePostOnTheDay}${startDate}${endDate}`
    const url = postType === 'pendingPosts' ? `${API.GET_PENDING_POSTS}?page=${pageNo}${filter}` : `${API.GET_UNASSIGNED_POSTS}?page=${pageNo}${filter}`
    try {
      const { data } = await axiosInstance.get(url,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (data?.status === 'success') {
          if(postType === 'pendingPosts') {
            dispatch({ type: PENDING_POST_LIST, payload: data?.data });
          } else {
            dispatch({ type: UNASSIGNED_POST_LIST, payload: data?.data});
          }
        
        dispatch({ type: CURRENT_PAGE_NUMBER, payload: data?.data?.currentPage });
        if(loader) {
          loader()
        }
      }
    } catch (err) {
      setAlert('error', err?.response?.data?.message);
    } finally {
      dispatch({ type: LOADING, payload: false });
      if(loader) {
        loader()
      }
    }
  };

  export const getPendingUnAssignedStoriesList = (postType, pageNo, setAlert, filters, loader) => async (dispatch) => {
    // dispatch({ type: LOADING, payload: true });
    const page = filters?.page ? `&postPage=${filters?.page}` : '';
     const segment = filters?.segmentType ? `&segmentType=${filters?.segmentType}` : '';
    const contributor = filters?.contributor ? `&createdBy=${filters?.contributor}` : '';
    const typePostBirth = filters?.postType?.birthday ? `&postType=onBirthday` : '';
    const typePostFact = filters?.postType?.fact ? `&postType=fact` : '';
    const typePostInNews = filters?.postType?.inTheNews ? `&postType=inNews` : '';
    const typePostOnTheDay = filters?.postType?.onTheDay ? `&postType=onThisDay` : '';
    const startDate = filters?.date?.startDate ? `&createdAt[gte]=${moment(filters?.date?.startDate).format('YYYY-MM-DD')}` : '';
    const endDate = filters?.date?.endDate ? `&createdAt[lte]=${moment(filters?.date?.endDate).format('YYYY-MM-DD')}` : '';
    const filter = `${page}${segment}${contributor}${typePostBirth}${typePostFact}${typePostInNews}${typePostOnTheDay}${startDate}${endDate}`
    const url = postType === 'pendingPosts' ? `${API.GET_PENDING_STORIES}?page=${pageNo}${filter}` : `${API.GET_UNASSIGNED_STORIES}?page=${pageNo}${filter}`
    try {
      const { data } = await axiosInstance.get(url,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (data?.status === 'success') {
          if(postType === 'pendingPosts') {
            dispatch({ type: PENDING_POST_LIST, payload: data?.data });
          } else {
            dispatch({ type: UNASSIGNED_POST_LIST, payload: data?.data});
          }
        
        dispatch({ type: CURRENT_PAGE_NUMBER, payload: data?.data?.currentPage });
        if(loader) {
          loader()
        }
      }
    } catch (err) {
      setAlert('error', err?.response?.data?.message);
    } finally {
      dispatch({ type: LOADING, payload: false });
      if(loader) {
        loader()
      }
    }
  };
  
  
  export const handleSearchPage = (searchVal, pageNo, setAlert, setResult, results) => async (dispatch) => {
    dispatch({ type: PAGE_LOADING, payload: true });
    try {
      const { data } = await axiosInstance.get(
        `${API.GET_SEARCH_PAGE_LIST}?title=${searchVal}&page=${pageNo || 1}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (data?.status === 'success') {
        if (pageNo !== 1) {
          const fullResult = [...results, ...data?.data?.results];
          const pageResult = data?.data;
          pageResult.results = fullResult;
          setResult(pageResult);
        } else {
          setResult(data?.data);
        }
      }
    } catch (err) {
      if (err?.response?.data?.message === 'Page Does Not Exist!') {
        setResult({ results: [] });
      } else {
        setAlert('error', err?.response?.data?.message || 'Something went wrong please try again');
      }
    } finally {
      dispatch({ type: PAGE_LOADING, payload: false });
    }
  };

  export const updatePostDetails = (id, body, setAlert, callback) => async (dispatch) => {
      // dispatch({ type: POST_UPDATE_LOADING, payload: true });
      try {
          const { data } = await axiosInstance.put(`${API.UPDATE_PUBLISHED_POST}${id}`, { ...body }, {
            headers: {
                'Content-Type': 'application/json',
              },
          });
          if (data?.status === 'success') {
            // setAlert('success', 'post details updated successfully');
            callback('NoClear');
          }
      } catch (err) {
        setAlert('error', err?.response?.data?.message || 'Something went wrong please try again');
      } finally {
        dispatch({ type: POST_UPDATE_LOADING, payload: false });
      }
  }


  export const updateStoryDetails = (id, body, setAlert, callback) => async (dispatch) => {
      // dispatch({ type: POST_UPDATE_LOADING, payload: true });
      try {
          const { data } = await axiosInstance.put(`${API.UPDATE_PUBLISHED_STORY}${id}`, { ...body }, {
            headers: {
                'Content-Type': 'application/json',
              },
          });
          if (data?.status === 'success') {
            // setAlert('success', 'post details updated successfully');
            callback('NoClear');
          }
      } catch (err) {
        setAlert('error', err?.response?.data?.message || 'Something went wrong please try again');
      } finally {
        dispatch({ type: POST_UPDATE_LOADING, payload: false });
      }
  }