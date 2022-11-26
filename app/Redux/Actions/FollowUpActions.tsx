import { handleApiError } from "app/components/ErrorMessage/HandleApiErrors";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { ADD_FOLLOWUP, ADD_FOLLOWUP_ERROR, FOLLOWUP_DETAILS, FOLLOWUP_DETAILS_ERROR, FOLLOWUP_ERROR, GET_FOLLOWUP_LIST, REMOVE_FOLLOWUP_DATA, UPDATE_FOLLOWUP, UPDATE_FOLLOWUP_ERROR } from "../types";

export const getAllFollowUpList = (params: any) => async (dispatch: any) => {
    try {
        const res = await apiCall("post", apiEndPoints.GET_FOLLOWUP_LIST, params);
        console.log('resGET_FOLLOWUP_LIST: ', res);
        if (res.data.status == 200) {
            dispatch({
                type: GET_FOLLOWUP_LIST,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            dispatch({
                type: FOLLOWUP_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: FOLLOWUP_ERROR,
            payload: console.log(e),
        });
    }
};
export const getAllFollowUpDetails = (params: any) => async (dispatch: any) => {
    try {
        const res = await apiCall("post", apiEndPoints.GET_FOLLOWUP_DETAILS, params);
        console.log('res GET_FOLLOWUP_DETAILS: ', res);
        if (res.data.status == 200) {
            dispatch({
                type: FOLLOWUP_DETAILS,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            dispatch({
                type: FOLLOWUP_DETAILS_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: FOLLOWUP_DETAILS_ERROR,
            payload: console.log(e),
        });
    }
};
export const updateFollowUp = (params: any) => async (dispatch: any) => {
    console.log('params: ', params);
    try {
        const res = await apiCall("post", apiEndPoints.UPDATE_FOLLOWUP, params);
        console.log('res UPDATE_FOLLOWUP ===: ', res);
        if (res.data.status == 200) {
            dispatch({
                type: UPDATE_FOLLOWUP,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            dispatch({
                type: UPDATE_FOLLOWUP_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        console.log('e: ', e);
        dispatch({
            type: UPDATE_FOLLOWUP_ERROR,
            payload: console.log(e),
        });
    }
};
export const addFollowUp = (params: any) => async (dispatch: any) => {
    console.log('params: ', params);
    try {
        const res = await apiCall("post", apiEndPoints.ADD_FOLLOWUP, params);
        console.log('res ADD_FOLLOWUP ===: ', res);
        if (res.data.status == 200) {
            dispatch({
                type: ADD_FOLLOWUP,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            dispatch({
                type: ADD_FOLLOWUP_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        console.log('e: ', e);
        dispatch({
            type: ADD_FOLLOWUP_ERROR,
            payload: console.log(e),
        });
    }
};
export const allfollowupRemove = () => async (dispatch: any) => {
    try {
        dispatch({
            type: REMOVE_FOLLOWUP_DATA,
            payload: null,
        });
    } catch (e) {
        dispatch({
            type: FOLLOWUP_ERROR,
            payload: console.log(e),
        });
    }
};
