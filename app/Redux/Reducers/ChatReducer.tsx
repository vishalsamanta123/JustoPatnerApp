import { GET_CHAT_ALL_USER_PROPERTY, GET_CHAT_PROPERTY_LIST, PROPERTY_LIST_ERROR, USER_CHAT_LIST_ERROR } from "../types";

const initialState = {
    response: null,
    list: false,
}

export function propertyChatReducer(state = initialState, action: any) {
    switch (action.type) {
      case GET_CHAT_PROPERTY_LIST:
        return {
          ...state,
          list: true,
          response: action.payload,
        };
      case PROPERTY_LIST_ERROR:
        return {
          ...state,
          list: false,
          response: action.payload,
        };
      default:
        return state;
    }
  }
export function allUserChatListReducer(state = initialState, action: any) {
    switch (action.type) {
      case GET_CHAT_ALL_USER_PROPERTY:
        return {
          ...state,
          list: true,
          response: action.payload,
        };
      case USER_CHAT_LIST_ERROR:
        return {
          ...state,
          list: false,
          response: action.payload,
        };
      default:
        return state;
    }
  }