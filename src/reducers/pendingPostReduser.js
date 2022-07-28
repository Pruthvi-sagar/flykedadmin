import { PENDING_POST_LIST, SELECTED_PENDING_POSTS, LOADING, PAGE_LOADING, PROGRESS_UPLOADED, POST_APPROVIE_REJECT_LOADING, CURRENT_PAGE_NUMBER, UNASSIGNED_POST_LIST, ALERT_DIALOG, POST_UPDATE_LOADING } from '../actions/types';

const initialState = {
    pendingPostList: [],
    selectedPendingPosts:[],
    isLoading: false,
    pageLoading: false,
    progressUpload: 0,
    postApproveRejectLoading: false,
    currentPageNo:1,
    unassignedPostList: [],
    updatePostLoading: false,
    alertDialog: {
        open: false,
        title:'',
        description:'',
    },
}

const pendingPostReduser = (state = initialState, action) => {
    switch (action.type) {
      case PENDING_POST_LIST: {
        return {
          ...state,
          pendingPostList: action?.payload,
        }
      }
      case SELECTED_PENDING_POSTS: {
        return {
          ...state,
          selectedPendingPosts: action?.payload,
        }
      }
      case LOADING: {
        return {
            ...state,
            isLoading: action?.payload,
          }   
      }
      case PAGE_LOADING: {
        return {
            ...state,
            pageLoading: action?.payload,
          }  
      }
      case PROGRESS_UPLOADED: {
        return {
            ...state,
            progressUpload: action?.payload,
        }       
      }
      case POST_APPROVIE_REJECT_LOADING: {
        return {
            ...state,
            postApproveRejectLoading: action?.payload,
        }       
      }
      case CURRENT_PAGE_NUMBER: {
        return {
            ...state,
            currentPageNo: action?.payload,
        }    
      }
      case UNASSIGNED_POST_LIST: {
        return {
            ...state,
            unassignedPostList: action?.payload,
        }    
      }
      case ALERT_DIALOG: {
        return {
            ...state,
            alertDialog: action?.payload
        }      
      }
      case POST_UPDATE_LOADING: {
        return {
            ...state,
            updatePostLoading: action?.payload
        }      
      }
      default:
        return state
    }
  }
  
  export default pendingPostReduser;
  