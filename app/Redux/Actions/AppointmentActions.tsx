import { handleApiError } from "app/components/ErrorMessage/HandleApiErrors";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { ADD_APPOINTMENT, ADD_APPOINTMENT_ERROR, EDIT_APPOINTMENT, EDIT_APPOINTMENT_ERROR, GET_APPOINTMENT_DETAILS, GET_APPOINTMENT_DETAILS_ERROR, GET_APPOINTMENT_LIST, GET_APPOINTMENT_LIST_ERROR, REMOVE_APPOINTMENT_EDITADD, START_LOADING, STOP_LOADING } from "../types";

export const getAllAppointmentList = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_APPOINTMENT_LIST, params);
        if (res.data.status == 200) {
            dispatch({
                type: GET_APPOINTMENT_LIST,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            dispatch({
                type: GET_APPOINTMENT_LIST_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: GET_APPOINTMENT_LIST_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const getAppointmentDetails = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_APPOINTMENT_DETAILS, params);
        if (res?.data?.status == 200) {
            dispatch({
                type: GET_APPOINTMENT_DETAILS,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            dispatch({
                type: GET_APPOINTMENT_DETAILS_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: GET_APPOINTMENT_DETAILS_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const addAppointment = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.ADD_APPOINTMENT, params);
        if (res.data.status == 200) {
            dispatch({
                type: ADD_APPOINTMENT,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            dispatch({
                type: ADD_APPOINTMENT_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: ADD_APPOINTMENT_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const editAppointment = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.EDIT_APPOINTMENT, params);
        if (res?.data?.status == 200) {
            dispatch({
                type: EDIT_APPOINTMENT,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            dispatch({
                type: EDIT_APPOINTMENT_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: EDIT_APPOINTMENT_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const addEditAppointmntRemove = () => async (dispatch: any) => {
    try {
        dispatch({
            type: REMOVE_APPOINTMENT_EDITADD,
            payload: null,
        });
    } catch (e) {
        dispatch({
            type: GET_APPOINTMENT_DETAILS_ERROR,
            payload: console.log(e),
        });
    }
};