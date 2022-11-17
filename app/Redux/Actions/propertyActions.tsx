import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { GETPROPERTY_DETAIL, PROPERTY_ERROR, PROPERTY_LIST } from "../types";

export const getAllProperty = (params: any) => async (dispatch: any) => {
    try {
        //console.log("getAllProperty -> params", params)
        const res = await apiCall("post", apiEndPoints.PROPERTYLIST, params);
        //console.log("getAllProperty -> res", res)
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
        console.log("getPropertyDetail -> res.data", res.data)
        
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