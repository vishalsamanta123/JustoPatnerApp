import { handleApiError } from "app/components/ErrorMessage/HandleApiErrors";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { GET_VISITOR_DETAIL, VISITOR_ERROR, VISITOR_LIST, VISITOR_STATUSUPDATE, ADD_VISITOR, ADD_VISITOR_FORM, EDIT_VISITOR, REMOVE_VISITOR, START_LOADING, STOP_LOADING, UPLOAD_IMAGE, UPLOAD_IMAGE_ERROR, UPLOAD_IMAGE_REMOVE, UPLOAD_CSV_FILE, UPLOAD_CSV_FILE_ERROR, UPLOAD_CSV_FILE_REMOVE, ADD_VISITOR_WITHOUT_PROPERTY, GET_BULK_CSV, GET_BULK_CSV_ERROR, GET_USERVISIT_LIST_ERROR, GET_USERVISIT_LIST } from "../types";

export const getAllLeadsList = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.VISITORLIST, params);
        if (res.data.status == 200) {
            dispatch({
                type: VISITOR_LIST,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
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
    finally {
        dispatch({ type: STOP_LOADING })
    }
};

export const statusUpdate = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.VISITOR_STATUS_UPDATE, params);
        if (res.data.status == 200) {
            dispatch({
                type: VISITOR_STATUSUPDATE,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            dispatch({
                type: VISITOR_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: VISITOR_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const addVisitor = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.ADD_VISITOR_, params);
        if (res.data.status == 200) {
            dispatch({
                type: ADD_VISITOR,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            return [];
        }
    } catch (e) {
        dispatch({
            type: VISITOR_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const getUserVisitList = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_USERVISTLIST, params);
        if (res.data.status === 200) {
            dispatch({
                type: GET_USERVISIT_LIST,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            dispatch({
                type: GET_USERVISIT_LIST_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: GET_USERVISIT_LIST_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const addVisitorWithoutProperty = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.CREATE_VISIT_WITHOUT_PROPERTY, params);
        if (res.data.status == 200) {
            dispatch({
                type: ADD_VISITOR_WITHOUT_PROPERTY,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            return [];
        }
    } catch (e) {
        dispatch({
            type: VISITOR_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const addVisitorRemove = () => async (dispatch: any) => {
    try {
        dispatch({
            type: REMOVE_VISITOR,
            payload: null,
        });
    } catch (e) {
        dispatch({
            type: VISITOR_ERROR,
            payload: console.log(e),
        });
    }
};
export const editVisitor = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.EDIT_VISITOR_, params);
        if (res.data.status == 200) {
            dispatch({
                type: EDIT_VISITOR,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            return [];
        }
    } catch (e) {
        dispatch({
            type: VISITOR_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};

export const getVisitorDetail = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_VISITOR_DETAIL_, params);
        if (res.data.status === 200) {
            dispatch({
                type: GET_VISITOR_DETAIL,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            return [];
        }
    } catch (e) {
        dispatch({
            type: VISITOR_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const getBulkCSVfile = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_BULK_CSVFILE, params);
        if (res.data.status === 200) {
            dispatch({
                type: GET_BULK_CSV,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            return [];
        }
    } catch (e) {
        dispatch({
            type: GET_BULK_CSV_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const uploadImage = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const header = {
            "Content-Type": "multipart/form-data",
            "access-control-allow-origin": "*",
        };
        const res = await apiCall("post", apiEndPoints.UPLOAD_IMAGE, params, header);
        if (res.data.status === 200) {
            dispatch({
                type: UPLOAD_IMAGE,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            return [];
        }
    } catch (e) {
        dispatch({
            type: UPLOAD_IMAGE_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const uploadCSVFile = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const header = {
            "Content-Type": "multipart/form-data",
            "access-control-allow-origin": "*",
        };
        const res = await apiCall("post", apiEndPoints.UPLOAD_CSVFile, params, header);
        if (res?.data?.status === 200) {
            dispatch({
                type: UPLOAD_CSV_FILE,
                payload: res?.data,
            });
        } else {
            handleApiError(res.data)
            return [];
        }
    } catch (e) {
        dispatch({
            type: UPLOAD_CSV_FILE_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const UploadImageRemove = () => async (dispatch: any) => {
    try {
        dispatch({
            type: UPLOAD_IMAGE_REMOVE,
            payload: null,
        });
    } catch (e) {
        dispatch({
            type: VISITOR_ERROR,
            payload: console.log(e),
        });
    }
};

export const UploadCSVFileRemove = () => async (dispatch: any) => {
    try {
        dispatch({
            type: UPLOAD_CSV_FILE_REMOVE,
            payload: null,
        });
    } catch (e) {
        dispatch({
            type: VISITOR_ERROR,
            payload: console.log(e),
        });
    }
};