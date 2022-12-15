import { GET_NOTIFICATION_LIST, NOTIFICATION_ERROR } from "../types";

const initialStatedetail = {
    response: null,
    list: false,
    loading: true,
  };

export function notificationListReducer(state = initialStatedetail, action: any) {

    switch (action.type) {
  
      case GET_NOTIFICATION_LIST:
        return {
          ...state,
          list: true,
          loading: false,
          response: action.payload,
        };
  
      case NOTIFICATION_ERROR:
        return {
          ...state,
          list: false,
          loading: false,
          response: null,
        };
      default:
        return state;
    }
  }