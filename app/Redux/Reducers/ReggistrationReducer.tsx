import { REGISTRATION_FORM, REGISTRATION_UPDATE } from "../types";
const initialStateForm = {
    response: null,
    update:false,
  };

export  function registrationFormReducer(state = initialStateForm, action: any) {
    switch (action.type) {
      case REGISTRATION_FORM:
        return {
          ...state,
          update:false,
          response: action.payload,
        };
      case REGISTRATION_UPDATE:
        return {
          ...state,
          update:true,
          response: action.payload,
        };
        
      default:
        return state;
    }
  }