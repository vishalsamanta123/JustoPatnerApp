import {
  PROPERTY_LIST,
  ADD_PROPERTY,
  PROPERTY_FORM,
  PROPERTY_EDIT,
  GETPROPERTY_DETAIL,
  PROPERTY_FORM_UPDATE,
  PROPERTY_FILTER_LIST,
  PROPERTY_STATUS_UPDATE,
  REMOVE_PROPERTY_STATUS,
  PROPERTY_ALLOCATE_LIST,
} from "../types";

const initialState = {
  response: null,
  detail: false,
  create: false,
  type: ''
};
const initialStatedetail = {
  response: null,
  detail: false,
  create: false,
  loading: true,
  updateStatus: false,
};
const initialStateForm = {
  response: null,
  update: false,
};

export function propertyReducer(state = initialState, action: any) {
  switch (action.type) {
    case ADD_PROPERTY:
      return {
        ...state,
        detail: false,
        create: true,
        response: action.payload,
      };
    case PROPERTY_EDIT:
      return {
        ...state,
        detail: false,
        create: true,
        response: action.payload,
      };
    case PROPERTY_FILTER_LIST:
      return {
        ...state,
        create: false,
        detail: false,
        response: action.payload,
      };
    case PROPERTY_LIST:
      return {
        ...state,
        detail: false,
        create: false,
        loading: false,
        response: action.payload,
      };
    case PROPERTY_ALLOCATE_LIST:
      return {
        ...state,
        detail: false,
        create: false,
        loading: false,
        type:'ALLOCATE',
        response: action.payload,
      };
    case PROPERTY_STATUS_UPDATE:
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
export function propertyDetailReducer(state = initialStatedetail, action: any) {
  switch (action.type) {
    case GETPROPERTY_DETAIL:
      return {
        ...state,
        create: false,
        detail: true,
        loading: false,
        response: action.payload,
      };

    case PROPERTY_STATUS_UPDATE:
      return {
        ...state,
        detail: false,
        create: true,
        updateStatus: true,
        response: action.payload,
      };
    default:
      return state;
  }
}

export function propertyFormReducer(state = initialStateForm, action: any) {
  switch (action.type) {
    case PROPERTY_FORM:
      return {
        ...state,
        update: false,
        response: action.payload,
      };
    case PROPERTY_FORM_UPDATE:
      return {
        ...state,
        update: true,
        response: action.payload,
      };

    default:
      return state;
  }
}
export function removeStatusReducer(state = initialStateForm, action: any) {
  switch (action.type) {
    case PROPERTY_STATUS_UPDATE:
      return {
        ...state,
        detail: false,
        create: true,
        response: action.payload,
      };
    case REMOVE_PROPERTY_STATUS:
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
