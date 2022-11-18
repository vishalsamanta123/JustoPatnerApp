import { ADD_VISITOR, ADD_VISITOR_FORM, EDIT_VISITOR, GET_VISITOR_DETAIL, VISITOR_LIST, VISITOR_STATUSUPDATE } from "../types";

const initialState = {
  response: null,
  detail: false,
  create: false,
};
const initialStateForm = {
  response: null,
  update: false,
};

export function visitorReducer(state = initialState, action: any) {
  switch (action.type) {
    case ADD_VISITOR:
      return {
        ...state,
        detail: false,
        create: true,
        response: null,
      };
    case EDIT_VISITOR:
      return {
        ...state,
        detail: false,
        create: true,
        response: null,
      };
    case GET_VISITOR_DETAIL:
      return {
        ...state,
        create: false,
        detail: true,
        response: action.payload,
      };
    case VISITOR_LIST:
      return {
        ...state,
        detail: false,
        create: false,
        loading: false,
        response: action.payload,
      };
    case VISITOR_STATUSUPDATE:
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

export function addVisitorReducer(state = initialStateForm, action: any) {
  switch (action.type) {
    case ADD_VISITOR_FORM:
      return {
        ...state,
        update: false,
        response: action.payload,
      };
    default:
      return state;
  }
}