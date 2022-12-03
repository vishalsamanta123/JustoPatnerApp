import { DASHBOARD, DASHBOARD_ERROR, STATUS_UPDATER, USER_STATUS_UPDATE } from "../types";
const initialStateForm = {
    response: null,
    update: false,
};

export function dashboardReducer(state = initialStateForm, action: any) {
    switch (action.type) {
        case DASHBOARD:
            return {
                ...state,
                data: true,
                response: action.payload,
            };
        case DASHBOARD_ERROR:
            return {
                ...state,
                update: false,
                response: action.payload,
            };
        default:
            return state;
    }
}

export function statusUpdateReducer(state = initialStateForm, action: any) {
    switch (action.type) {
        case USER_STATUS_UPDATE:
            return {
                ...state,
                data: true,
                response: action.payload,
            };
        case STATUS_UPDATER:
            return {
                ...state,
                data: false,
                response: action.payload,
            };
        default:
            return state;
    }
}