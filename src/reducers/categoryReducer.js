import { editCategory } from '../actions/categoryAction'
import {
  ADD_CATEGORY,
  ADD_SUBCATEGORY,
  CATEGORIES,
  EDIT_SUBCATEGORY,
  SUBCATEGORIES,
  SUBCATEGORIES_LIST,
} from '../actions/types'

const initialState = {
  categoryList: [],
  subCategoryList: [],
}

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIES: {
      return {
        ...state,
        categoryList: action.payload,
      }
    }
    case SUBCATEGORIES: {
      return {
        ...state,
        subCategoryList: action.payload,
      }
    }
    case SUBCATEGORIES_LIST: {
      return {
        ...state,
        subCategoryList: action.payload,
      }
    }
    case ADD_CATEGORY: {
      return {
        ...state,
        categoryList: [action.payload, ...state.categoryList],
      }
    }
    case ADD_SUBCATEGORY: {
      return {
        ...state,
        subCategoryList: [action.payload, ...state.subCategoryList],
      }
    }
    case editCategory: {
      return {
        ...state,
        subCategoryList: [action.payload, ...state.subCategoryList],
      }
    }
    case EDIT_SUBCATEGORY: {
      return {
        ...state,
        subCategoryList: [action.payload, ...state.subCategoryList],
      }
    }
    default:
      return state
  }
}

export default categoryReducer
