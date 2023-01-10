import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { GET_USER_APPOINTMENT_LIST, GET_USER_APPOINTMENT_LIST_ERROR, START_LOADING, STOP_LOADING, UPDATE_USERAPPOINTMENT_STATUS, UPDATE_USERAPPOINTMENT_STATUS_ERROR } from "../types";

export const getUserAppointmentList = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_USER_APPOINTMENT_LIST, params);
        if (res.data.status == 200) {
            dispatch({
                type: GET_USER_APPOINTMENT_LIST,
                payload: res.data,
            });
        } else {
            dispatch({
                type: GET_USER_APPOINTMENT_LIST_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: GET_USER_APPOINTMENT_LIST_ERROR,
            payload: [],
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const updateUserAppointmentStatus = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.UPDATE_USER_APPOINTMENT_STATUS, params);
        if (res.data.status == 200) {
            dispatch({
                type: UPDATE_USERAPPOINTMENT_STATUS,
                payload: res.data,
            });
        } else {
            dispatch({
                type: UPDATE_USERAPPOINTMENT_STATUS_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: UPDATE_USERAPPOINTMENT_STATUS_ERROR,
            payload: [],
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};