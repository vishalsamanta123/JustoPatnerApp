import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { GET_VISITOR_DETAIL, VISITOR_ERROR, VISITOR_LIST, VISITOR_STATUSUPDATE, ADD_VISITOR, ADD_VISITOR_FORM, EDIT_VISITOR } from "../types";

export const getAllLeadsList = (params: any) => async (dispatch: any) => {
    try {
        console.log('params: ', params);
        const res = await apiCall("post", apiEndPoints.VISITORLIST, params);
        console.log('res: VISITORLIST', res);
        if (res.data.status == 200) {
            dispatch({
                type: VISITOR_LIST,
                payload: res.data,
            });
        } else {
            dispatch({
                type: VISITOR_LIST,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: VISITOR_ERROR,
            payload: console.log(e),
        });
    }
};

export const statusUpdate = (params: any) => async (dispatch: any) => {
    try {
        const res = await apiCall("post", apiEndPoints.VISITOR_STATUS_UPDATE, params);
        if (res.data.status == 200) {
            dispatch({
                type: VISITOR_STATUSUPDATE,
                payload: res.data,
            });
        } else {
            return [];
        }
    } catch (e) {
        dispatch({
            type: VISITOR_ERROR,
            payload: console.log(e),
        });
    }
};
export const addVisitor = (params: any) => async (dispatch: any) => {
    console.log('params: ', params);
    try {
        // const header = { "Content-Type": "multipart/form-data", "access-control-allow-origin": "*" }
        const res = await apiCall("post", apiEndPoints.ADD_VISITOR_, params);
        //console.log('res======: ', res);
        if (res.data.status == 200) {
            dispatch({
                type: ADD_VISITOR,
                payload: res.data,
            });
        } else {
            return [];
        }
    } catch (e) {

        console.log('hhhhhhhhhh',e)
        dispatch({
            type: VISITOR_ERROR,
            payload: console.log(e),
        });
    }
};
export const editVisitor = (params: any) => async (dispatch: any) => {
    try {
        console.log('params: ', params);
        const res = await apiCall("post", apiEndPoints.EDIT_VISITOR_, params);
        //console.log('res: ', res);
        if (res.data.status == 200) {
            dispatch({
                type: EDIT_VISITOR,
                payload: res.data,
            });
        } else {
            return [];
        }
    } catch (e) {
        console.log('hhh',e)
        dispatch({
            type: VISITOR_ERROR,
            payload: console.log(e),
        });
    }
};
export const addVisitorForm = (params: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: ADD_VISITOR_FORM,
            payload: params,
        });
    } catch (e) {
        dispatch({
            type: VISITOR_ERROR,
            payload: console.log(e),
        });
    }
};

export const getVisitorDetail = (params: any) => async (dispatch: any) => {
    try {
        const res = await apiCall("post", apiEndPoints.GET_VISITOR_DETAIL_, params);
        console.log('res: GET_VISITOR_DETAIL__', res);
        if (res.data.status === 200) {
            dispatch({
                type: GET_VISITOR_DETAIL,
                payload: res.data,
            });
        } else {
            return [];
        }
    } catch (e) {
        dispatch({
            type: VISITOR_ERROR,
            payload: console.log(e),
        });
    }
};