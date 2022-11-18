import {
    MASTER_LIST,MASTER_ERROR
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
      default:
        return state;
    }
  }
