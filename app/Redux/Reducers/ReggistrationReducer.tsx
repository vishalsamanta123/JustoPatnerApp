import { CHECK_EMAIL_MOBILE, CHECK_EMAIL_MOBILE_ERROR, CREATE_CHANNEL_PARTNER, CREATE_CHANNEL_PARTNER_ERROR, REGISTRATION_FORM, REGISTRATION_UPDATE, REMOVE_CREATE_CHANNEL_PARTNER, REMOVE_EMAIL_NUMBER_CHECK } from "../types";
const initialStateForm = {
  response: null,
  update: false,
};
const initialStateCreate = {
  response: null,
  isLoading: true,
  isError: true
};

export function registrationFormReducer(state = initialStateForm, action: any) {
  switch (action.type) {
    case REGISTRATION_FORM:
      return {
        ...state,
        update: false,
        response: action.payload,
      };
    case REGISTRATION_UPDATE:
      return {
        ...state,
        update: true,
        response: action.payload,
      };

    default:
      return state;
  }
}
export function createChannlePartnerReducer(state = initialStateCreate, action: any) {
  switch (action.type) {
    case CREATE_CHANNEL_PARTNER:
      return {
        ...state,
        isLoading: false,
        response: action.payload,
      };
    case CREATE_CHANNEL_PARTNER_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: false,
        response: action.payload,
      };
    case CHECK_EMAIL_MOBILE:
      return {
        ...state,
        isLoading: false,
        isError: false,
        response: action.payload,
      };
    case CHECK_EMAIL_MOBILE_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: false,
        response: action.payload,
      };

    default:
      return state;
  }
}
export function emailAndMobileReducer(state = initialStateForm, action: any) {
  switch (action.type) {
    case CHECK_EMAIL_MOBILE:
      return {
        ...state,
        detail: false,
        create: true,
        response: action.payload,
      };
    case REMOVE_EMAIL_NUMBER_CHECK:
      return {
        ...state,
        detail: false,
        create: false,
        response: action.payload,
      };
    default:
      return state;
  }
}
export function registerDataReducer(state = initialStateForm, action: any) {
  switch (action.type) {
    case CREATE_CHANNEL_PARTNER:
      return {
        ...state,
        detail: false,
        create: true,
        response: action.payload,
      };
    case REMOVE_CREATE_CHANNEL_PARTNER:
      return {
        ...state,
        create: false,
        response: action.payload,
      };
    default:
      return state;
  }
}