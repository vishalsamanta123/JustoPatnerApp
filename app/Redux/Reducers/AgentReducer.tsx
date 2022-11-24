import { AGENT_LIST, AGENT_STATUSUPDATE, ADD_AGENT, ADD_AGENT_FORM, GET_AGENT_DETAIL, EDIT_AGENT } from "../types";

const initialState = {
  response: null,
  detail: false,
  create: false,
};
const initialStateForm = {
  response: null,
  update: false,
};

export function agentReducer(state = initialState, action: any) {
  switch (action.type) {
    case ADD_AGENT:
      return {
        ...state,
        detail: false,
        create: true,
        response: null,
      };
    case EDIT_AGENT:
      return {
        ...state,
        detail: false,
        create: true,
        edit: true,
        response: null,
      };
    case GET_AGENT_DETAIL:
      return {
        ...state,
        create: false,
        detail: true,
        response: action.payload,
      };
    case AGENT_LIST:
      return {
        ...state,
        detail: false,
        create: false,
        list: true,
        response: action.payload,
      };
    case AGENT_STATUSUPDATE:
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

export function addAgentReducer(state = initialStateForm, action: any) {
  switch (action.type) {
    case ADD_AGENT_FORM:
      return {
        ...state,
        update: false,
        response: action.payload,
      };
    // case PROPERTY_FORM_UPDATE:
    //   return {
    //     ...state,
    //     update: true,
    //     response: action.payload,
    //   };

    default:
      return state;
  }
}