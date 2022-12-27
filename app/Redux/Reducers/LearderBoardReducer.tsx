import { DASHBOARD, DASHBOARD_ERROR, LEADERBOARD, LEADERBOARD_ERROR, STATUS_UPDATER, USER_STATUS_UPDATE } from "../types";
const initialStateForm = {
    response: null,
    update: false,
};

export function leaderBoardReducer(state = initialStateForm, action: any) {
    switch (action.type) {
        case LEADERBOARD:
            return {
                ...state,
                data: true,
                response: action.payload,
            };
        case LEADERBOARD_ERROR:
            return {
                ...state,
                update: false,
                response: action.payload,
            };
        default:
            return state;
    }
}
