import { REMOVE_USERDATA, UPDATE_PROFILE, UPDATE_PROFILE_ERROR } from "../types";
const initialStateForm = {
  response: null,
  update: false,
};

export function settingReducer(state = initialStateForm, action: any) {
  switch (action.type) {
    case UPDATE_PROFILE:
      return {
        ...state,
        update: true,
        response: action.payload,
      };
    case UPDATE_PROFILE_ERROR:
      return {
        ...state,
        update: false,
        response: action.payload,
      };
    default:
      return state;
  }
}
export function editUserReducer(state = initialStateForm, action: any) {
  switch (action.type) {
    case UPDATE_PROFILE:
      return {
        ...state,
        update: true,
        response: action.payload,
      };
    case REMOVE_USERDATA:
      return {
        ...state,
        update: false,
        response: action.payload,
      };
    default:
      return state;
  }
}