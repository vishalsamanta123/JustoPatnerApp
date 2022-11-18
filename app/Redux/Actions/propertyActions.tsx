import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { GETPROPERTY_DETAIL, PROPERTY_ERROR, PROPERTY_LIST, PROPERTY_STATUS_UPDATE } from "../types";

export const getAllProperty = (params: any) => async (dispatch: any) => {
    try {
        const res = await apiCall("post", apiEndPoints.PROPERTYLIST, params);
        if (res.data.status == 200) {
            dispatch({
                type: PROPERTY_LIST,
                payload: res.data,
            });
        } else {
            dispatch({
                type: PROPERTY_LIST,
                payload: [],
            });
        }
    } catch (e) {

        dispatch({
            type: PROPERTY_ERROR,
            payload: console.log(e),
        });
    }
};
export const getFilterProperty = (params: any) => async (dispatch: any) => {
    try {
        const res = await apiCall("post", apiEndPoints.PROPERTYFILTER, params);
        if (res.data.status == 200) {
            dispatch({
                type: PROPERTY_LIST,
                payload: res.data,
            });
        } else {
            dispatch({
                type: PROPERTY_LIST,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: PROPERTY_ERROR,
            payload: console.log(e),
        });
    }
};

export const getPropertyDetail = (params: any) => async (dispatch: any) => {
    try {
        const res = await apiCall("post", apiEndPoints.GETPROPERTYDETAIL, params);
        
        if (res.data.status == 200) {
            dispatch({
                type: GETPROPERTY_DETAIL,
                payload: res.data,
            }); 
        } else {
             dispatch({
                type: GETPROPERTY_DETAIL,
                payload: [],
            }); 
        }
    } catch (e) {
        dispatch({
            type: PROPERTY_ERROR,
            payload: console.log(e),
        });
    }
};
export const statusUpdate = (params: any) => async (dispatch: any) => {
    try {
        const res = await apiCall("post", apiEndPoints.PROPERTYSUBSCRIBE, params);
        if (res.data.status == 200) {
            dispatch({
                type: PROPERTY_STATUS_UPDATE,
                payload: res.data,
            }); 
        } else {
             dispatch({
                type: PROPERTY_ERROR,
                payload: [],
            }); 
        }
    } catch (e) {
        dispatch({
            type: PROPERTY_ERROR,
            payload: console.log(e),
        });
    }
};