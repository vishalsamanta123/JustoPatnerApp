import { handleApiError } from "app/components/ErrorMessage/HandleApiErrors";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { GETPROPERTY_DETAIL, PROPERTY_ALLOCATE_LIST, PROPERTY_ERROR, PROPERTY_LIST, PROPERTY_STATUS_UPDATE, REMOVE_PROPERTY_STATUS, START_LOADING, STOP_LOADING } from "../types";

export const getAllProperty = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.PROPERTYLIST, params);
        if (res.data.status == 200) {
            dispatch({
                type: PROPERTY_LIST,
                payload: res.data,
            });
        } else {
            handleApiError(res?.data)
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
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const getAllAlloctaeProperty = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_ALLOCATE_PROPERTY, params);
        if (res.data.status == 200) {
            dispatch({
                type: PROPERTY_ALLOCATE_LIST,
                payload: res.data,
            });
        } else {
            handleApiError(res?.data)
            dispatch({
                type: PROPERTY_ALLOCATE_LIST,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: PROPERTY_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const getFilterProperty = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.PROPERTYFILTER, params);
        if (res.data.status == 200) {
            dispatch({
                type: PROPERTY_LIST,
                payload: res.data,
            });
        } else {
            handleApiError(res?.data)
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
    finally {
        dispatch({ type: STOP_LOADING })
    }
};

export const getPropertyDetail = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GETPROPERTYDETAIL, params);

        if (res.data.status == 200) {
            dispatch({
                type: GETPROPERTY_DETAIL,
                payload: res.data,
            });
        } else {
            handleApiError(res?.data)
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
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const statusUpdate = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.PROPERTYSUBSCRIBE, params);
        if (res.data.status == 200) {
            dispatch({
                type: PROPERTY_STATUS_UPDATE,
                payload: res.data,
            });
        } else {
            handleApiError(res?.data)
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
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const removeStatus = () => async (dispatch: any) => {
    try {
        dispatch({
            type: REMOVE_PROPERTY_STATUS,
            payload: null,
        });
    } catch (e) {
        dispatch({
            type: PROPERTY_ERROR,
            payload: console.log(e),
        });
    }
};