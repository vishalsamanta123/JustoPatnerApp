import { ADD_APPOINTMENT, ADD_APPOINTMENT_ERROR, EDIT_APPOINTMENT, EDIT_APPOINTMENT_ERROR, GET_APPOINTMENT_DETAILS, GET_APPOINTMENT_DETAILS_ERROR, GET_APPOINTMENT_LIST, GET_APPOINTMENT_LIST_ERROR, REMOVE_APPOINTMENT_EDITADD } from "../types";

const initialState = {
    response: null,
    detail: false,
    create: false,
    list: false,
    update: false
};

export function appointmentReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_APPOINTMENT_LIST:
            return {
                ...state,
                create: false,
                detail: false,
                list: true,
                update: false,
                response: action.payload,
            };
        case GET_APPOINTMENT_LIST_ERROR:
            return {
                ...state,
                create: false,
                detail: false,
                list: true,
                update: false,
                response: action.payload,
            };
        case GET_APPOINTMENT_DETAILS:
            return {
                ...state,
                create: false,
                detail: true,
                list: false,
                update: false,
                response: action.payload,
            };
        case GET_APPOINTMENT_DETAILS_ERROR:
            return {
                ...state,
                create: false,
                detail: true,
                list: false,
                update: false,
                response: action.payload,
            };
        // case ADD_APPOINTMENT:
        //     return {
        //         ...state,
        //         create: true,
        //         detail: false,
        //         list: false,
        //         update: false,
        //         response: action.payload,
        //     };
        case ADD_APPOINTMENT_ERROR:
            return {
                ...state,
                create: true,
                detail: false,
                list: false,
                update: false,
                response: action.payload,
            };
        // case EDIT_APPOINTMENT:
        //     return {
        //         ...state,
        //         create: false,
        //         detail: false,
        //         list: false,
        //         update: true,
        //         response: action.payload,
        //     };
        case EDIT_APPOINTMENT_ERROR:
            return {
                ...state,
                create: false,
                detail: false,
                list: false,
                update: true,
                response: action.payload,
            };
        default:
            return state;
    }
}
export function editAddAppointmentReducer(state = initialState, action: any) {
    switch (action.type) {
        case EDIT_APPOINTMENT:
            return {
                ...state,
                create: false,
                detail: false,
                list: false,
                update: true,
                response: action.payload,
            };
        case ADD_APPOINTMENT:
            return {
                ...state,
                create: true,
                detail: false,
                list: false,
                update: false,
                response: action.payload,
            };
        case REMOVE_APPOINTMENT_EDITADD:
            return {
                ...state,
                update: false,
                create: true,
                response: action.payload,
            };
        default:
            return state;
    }
}