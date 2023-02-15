import { DEAL_FLOW_DETAIL, DEAL_FLOW_DETAIL_ERROR, DEAL_FLOW_LIST, DEAL_FLOW_LIST_ERROR, } from "../types";
const initialStateForm = {
    response: null,
    update: false,
};

export function dealFlowReducer(state = initialStateForm, action: any) {
    switch (action.type) {
        case DEAL_FLOW_LIST:
            return {
                ...state,
                list: true,
                response: action.payload,
            };
        case DEAL_FLOW_LIST_ERROR:
            return {
                ...state,
                update: false,
                response: action.payload,
            };
        case DEAL_FLOW_DETAIL:
            return {
                ...state,
                detail: true,
                response: action.payload,
            };
        case DEAL_FLOW_DETAIL_ERROR:
            return {
                ...state,
                detail: false,
                response: action.payload,
            };
        default:
            return state;
    }
}
