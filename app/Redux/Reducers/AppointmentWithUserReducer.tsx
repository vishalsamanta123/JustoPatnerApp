import {
  GET_USER_APPOINTMENT_LIST,
  GET_USER_APPOINTMENT_LIST_ERROR,
  UPDATE_USERAPPOINTMENT_STATUS,
  UPDATE_USERAPPOINTMENT_STATUS_ERROR,
} from "../types";

const initialState = {
  getUserListResponse: null,
  userList: false,
};
const editInitialState = {
  updateUserStatusResponse: null,
  statusUpdate: false,
};

export function userAppointmentReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_USER_APPOINTMENT_LIST:
      return {
        ...state,
        userList: true,
        getUserListResponse: action.payload,
      };
    case GET_USER_APPOINTMENT_LIST_ERROR:
      return {
        ...state,
        getUserListResponse: action.payload,
      };

    default:
      return state;
  }
}
export function userUpdateAppointmentReducer(
  state = editInitialState,
  action: any
) {
  switch (action.type) {
    case UPDATE_USERAPPOINTMENT_STATUS:
      return {
        ...state,
        statusUpdate: true,
        updateUserStatusResponse: action.payload,
      };
    case UPDATE_USERAPPOINTMENT_STATUS_ERROR:
    default:
      return state;
  }
}
