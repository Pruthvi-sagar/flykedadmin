import { combineReducers } from 'redux'
import authReducer from './authReducer'
import categoryReducer from './categoryReducer'
import pageReducer from './pageReducer'
import commonReducer from './commonReducer'
import postReducer from './postReducer'
import filterReducer from './filterReducer'
import pendingPostReduser from './pendingPostReduser';

export default combineReducers({
  auth: authReducer,
  category: categoryReducer,
  page: pageReducer,
  common: commonReducer,
  post: postReducer,
  filter: filterReducer,
  pendingPosts: pendingPostReduser,
})
