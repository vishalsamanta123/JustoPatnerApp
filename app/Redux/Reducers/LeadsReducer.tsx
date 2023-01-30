import { ADD_VISITOR, ADD_VISITOR_FORM, ADD_VISITOR_WITHOUT_PROPERTY, EDIT_VISITOR, GET_VISITOR_DETAIL, REMOVE_VISITOR, UPLOAD_CSV_FILE, UPLOAD_CSV_FILE_ERROR, UPLOAD_CSV_FILE_REMOVE, UPLOAD_IMAGE, UPLOAD_IMAGE_ERROR, UPLOAD_IMAGE_REMOVE, VISITOR_LIST, VISITOR_STATUSUPDATE } from "../types";

const initialState = {
  response: null,
  detail: false,
  create: false,
};
const initialEditState = {
  response: null,
  detail: false,
  create: false,
};
const initiallistState = {
  response: null,
  detail: false,
  create: false,
};
const initialStateForm = {
  response: null,
  update: false,
};
const initialStateUploadImage = {
  response: null,
  upload: false,
};

export function visitorReducer(state = initialState, action: any) {
  switch (action.type) {
    case ADD_VISITOR:
      return {
        ...state,
        detail: false,
        create: true,
        loading: false,
        response: action.payload,
      };
    case ADD_VISITOR_WITHOUT_PROPERTY:
      return {
        ...state,
        detail: false,
        create: true,
        loading: false,
        response: action.payload,
      };
    case EDIT_VISITOR:
      return {
        ...state,
        detail: false,
        create: false,
        edit: true,
        loading: false,
        response: action.payload,
      };
    case GET_VISITOR_DETAIL:
      return {
        ...state,
        create: false,
        detail: true,
        loading: false,
        response: action.payload,
      };
    /*   case VISITOR_LIST:
        return {
          ...state,
          detail: false,
          create: false,
          loading: false,
          list: true,
          response: action.payload,
        }; */
    case VISITOR_STATUSUPDATE:
      return {
        ...state,
        detail: false,
        create: true,
        loading: false,
        response: action.payload,
      };
    default:
      return state;
  }
}

export function visitorListReducer(state = initiallistState, action: any) {
  switch (action.type) {

    case VISITOR_LIST:
      return {
        ...state,
        detail: false,
        create: false,
        loading: false,
        list: true,
        response: action.payload,
      };

    default:
      return state;
  }
}


export function addVisitorReducer(state = initialStateForm, action: any) {
  switch (action.type) {
    case ADD_VISITOR:
      return {
        ...state,
        detail: false,
        create: true,
        response: action.payload,
      };
    case ADD_VISITOR_WITHOUT_PROPERTY:
      return {
        ...state,
        detail: false,
        create: true,
        response: action.payload,
      };
    case REMOVE_VISITOR:
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
export function editVisitorReducer(state = initialEditState, action: any) {
  switch (action.type) {
    case EDIT_VISITOR:
      return {
        ...state,
        update: true,
        response: action.payload,
      };
    case REMOVE_VISITOR:
      return {
        ...state,
        update: false,
        response: action.payload,
      };
    default:
      return state;
  }
}
export function uploadImageReducer(state = initialStateUploadImage, action: any) {
  switch (action.type) {
    case UPLOAD_IMAGE:
      return {
        ...state,
        upload: true,
        response: action.payload,
      };
    case UPLOAD_IMAGE_REMOVE:
      return {
        ...state,
        upload: false,
        response: action.payload,
      };
    case UPLOAD_IMAGE_ERROR:
      return {
        ...state,
        upload: false,
        response: action.payload,
      };
    default:
      return state;
  }}
  export function uploadCSVFileEReducer(state = initialStateUploadImage, action: any) {
    switch (action.type) {
        case UPLOAD_CSV_FILE:
        return {
          ...state,
          upload: true,
          response: action.payload,
        };
      case UPLOAD_CSV_FILE_REMOVE:
        return {
          ...state,
          upload: false,
          response: action.payload,
        };
        case UPLOAD_CSV_FILE_ERROR:
        return {
          ...state,
          upload: false,
          response: action.payload,
        };
      default:
        return state;
    }
  }

