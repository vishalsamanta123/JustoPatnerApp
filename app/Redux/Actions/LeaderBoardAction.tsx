import { START_LOADING, STOP_LOADING, DASHBOARD, DASHBOARD_ERROR, USER_STATUS_UPDATE, USER_STATUS_UPDATE_ERROR, STATUS_UPDATER, LEADERBOARD_ERROR, LEADERBOARD } from "../types";
import apiEndPoints from "../../components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { handleApiError } from "app/components/ErrorMessage/HandleApiErrors";

export const learderBoardData = (userDetail: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall(
            "post",
            apiEndPoints.GET_LEADERBOARD,
            {}
        );
        console.log('res: GET_LEADERBOARD', res);
        if (res.data.status == 200) {
            dispatch({
                type: LEADERBOARD,
                payload: res.data,
            });
        } else {
            handleApiError(res?.data)
            dispatch({
                type: LEADERBOARD_ERROR,
                payload: res.data,
            });
        }
    } catch (e) {
        dispatch({
            type: LEADERBOARD_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
// export const learderBoardDataData = (params: any) => async (dispatch: any) => {
//     dispatch({ type: START_LOADING })
//     try {
//         const res = await apiCall(
//             "post",
//             apiEndPoints.USER_STATUS_UPDATE,
//             params,
//         );
//         if (res.data.status == 200) {
//             dispatch({
//                 type: USER_STATUS_UPDATE,
//                 payload: res.data,
//             });
//         } else {
//             handleApiError(res?.data)
//             dispatch({
//                 type: USER_STATUS_UPDATE_ERROR,
//                 payload: res.data,
//             });
//         }
//     } catch (e) {
//         dispatch({
//             type: DASHBOARD_ERROR,
//             payload: console.log(e),
//         });
//     }
//     finally {
//         dispatch({ type: STOP_LOADING })
//     }
// };
// export const userStatusUpdater = () => async (dispatch: any) => {
//     try {
//         dispatch({
//             type: STATUS_UPDATER,
//             payload: null,
//         });
//     } catch (e) {
//         dispatch({
//             type: DASHBOARD_ERROR,
//             payload: console.log(e),
//         });
//     }
// };
