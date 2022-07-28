import { HIDE_ALERT, SHOW_ALERT } from './alerTypes';

const alertReducer = (state, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.type,
        isShown: true,
      };

    case HIDE_ALERT:
      return {
        ...state,
        message: '',
        type: 'success',
        isShown: false,
      };

    default:
      return { ...state };
  }
};

export default alertReducer;
