import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { GET_AGENT_DETAIL, AGENT_ERROR, AGENT_LIST, AGENT_STATUSUPDATE, ADD_AGENT, ADD_AGENT_FORM, EDIT_AGENT } from "../types";

export const getAllAgentList = (params: any) => async (dispatch: any) => {
    try {
        const res = await apiCall("post", apiEndPoints.AGENTLIST, params);
        if (res.data.status == 200) {
            dispatch({
                type: AGENT_LIST,
                payload: res.data,
            });
        } else {
            dispatch({
                type: AGENT_LIST,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: AGENT_ERROR,
            payload: console.log(e),
        });
    }
};

export const statusUpdate = (params: any) => async (dispatch: any) => {
    try {
        const res = await apiCall("post", apiEndPoints.AGENT_STATUS_UPDATE, params);
        if (res.data.status == 200) {
            dispatch({
                type: AGENT_STATUSUPDATE,
                payload: res.data,
            });
        } else {
            return [];
        }
    } catch (e) {
        dispatch({
            type: AGENT_ERROR,
            payload: console.log(e),
        });
    }
};
export const addAgent = (params: any) => async (dispatch: any) => {
    try {
        const header = { "Content-Type": "multipart/form-data", "access-control-allow-origin": "*" }
        const res = await apiCall("post", apiEndPoints.ADD_AGENT_, params, header);
        if (res.data.status == 200) {
            dispatch({
                type: ADD_AGENT,
                payload: res.data,
            });
        } else {
            return [];
        }
    } catch (e) {
        dispatch({
            type: AGENT_ERROR,
            payload: console.log(e),
        });
    }
};
export const editAgent = (params: any) => async (dispatch: any) => {
    try {
        const header = { "Content-Type": "multipart/form-data", "access-control-allow-origin": "*" }
        const res = await apiCall("post", apiEndPoints.EDIT_AGENT_, params, header);
        if (res.data.status == 200) {
            dispatch({
                type: EDIT_AGENT,
                payload: res.data,
            });
        } else {
            return [];
        }
    } catch (e) {
        dispatch({
            type: AGENT_ERROR,
            payload: console.log(e),
        });
    }
};
export const addAgentForm = (params: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: ADD_AGENT_FORM,
            payload: params,
        });
    } catch (e) {
        dispatch({
            type: AGENT_ERROR,
            payload: console.log(e),
        });
    }
};

export const getAgentDetail = (params: any) => async (dispatch: any) => {
    try {
        const res = await apiCall("post", apiEndPoints.GET_AGENT_DETAIL_, params);
        // console.log('res: GET_AGENT_DETAIL_', res);
        if (res.data.status === 200) {
            dispatch({
                type: GET_AGENT_DETAIL,
                payload: res.data,
            });

            dispatch({
                type: ADD_AGENT_FORM,
                payload: res.data.data[0],
            });

        } else {
            return [];
        }
    } catch (e) {
        dispatch({
            type: AGENT_ERROR,
            payload: console.log(e),
        });
    }
};