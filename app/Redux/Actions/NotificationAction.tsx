import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { GET_NOTIFICATION_LIST, NOTIFICATION_ERROR, START_LOADING, STOP_LOADING } from "../types";

export const getNotificationList = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    console.log('params: ', params);
    try {
        const res = await apiCall("post", apiEndPoints.NOTIFICATION_LIST, params);
        console.log('res: IN NOTIFICATION', res);
        if (res.data.status == 200) {
            dispatch({
                type: GET_NOTIFICATION_LIST,
                payload: res.data,
            });
        } else {
            dispatch({
                type: NOTIFICATION_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: NOTIFICATION_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};