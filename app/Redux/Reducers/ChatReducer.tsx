import { GET_CHAT_ALL_USER_PROPERTY, GET_CHAT_PROPERTY_LIST, PROPERTY_LIST_ERROR, UPDATE_CHAT_STATUS, UPDATE_CHAT_STATUS_ERROR, USER_CHAT_LIST_ERROR } from "../types";

const initialState = {
    response: null,
    list: false,
}
const initialState2 = {
  response: null,
  update: false,
};

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

  export function updateChatStatus(state = initialState2, action: any) {
    switch (action.type) {
        case UPDATE_CHAT_STATUS:
            return {
                ...state,
                update: true,
                response: action.payload,
            };
        case UPDATE_CHAT_STATUS_ERROR:
            return {
                ...state,
                update: false,
                response: action.payload,
            };
        default:
            return state;
    }
}