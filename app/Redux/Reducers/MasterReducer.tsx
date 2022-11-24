import {
    MASTER_LIST,MASTER_ERROR, GET_SOURCING_MANAGER_ERROR, GET_SOURCING_MANAGER
  } from "../types";
  
  const initialState = {
    response: null,
    detail: false,
    create: false,
  };
 
  export function masterDataReducer(state = initialState, action: any) {
    switch (action.type) {
      case MASTER_LIST:
        return {
          ...state,
          detail: false,
          create: true,
          response: action.payload,
        };
     
      case MASTER_ERROR:
        return {
          ...state,
          detail: false,
          create: true,
          response: action.payload,
        };
      case GET_SOURCING_MANAGER:
        return {
          ...state,
          detail: false,
          create: false,
          response: action.payload,
        };
     
      case GET_SOURCING_MANAGER_ERROR:
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
