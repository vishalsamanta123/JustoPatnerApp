import { DEAL_FLOW_DETAIL, DEAL_FLOW_DETAIL_ERROR, DEAL_FLOW_LIST, DEAL_FLOW_LIST_ERROR, START_LOADING, STOP_LOADING, } from "../types";
import apiEndPoints from "../../components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { handleApiError } from "app/components/ErrorMessage/HandleApiErrors";

export const dealFlowListData = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall(
            "post",
            apiEndPoints.GET_DEAL_FLOW_LIST,
            params
            );
        if (res.data.status == 200) {
            dispatch({
                type: DEAL_FLOW_LIST,
                payload: res.data,
            });
        } else {
            handleApiError(res?.data)
            dispatch({
                type: DEAL_FLOW_LIST_ERROR,
                payload: res.data,
            });
        }
    } catch (e) {
        dispatch({
            type: DEAL_FLOW_LIST_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const dealFlowDetailData = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall(
            "post",
            apiEndPoints.GET_DEAL_FLOW_DETAIL,
            params
        );
        if (res.data.status == 200) {
            dispatch({
                type: DEAL_FLOW_DETAIL,
                payload: res.data,
            });
        } else {
            handleApiError(res?.data)
            dispatch({
                type: DEAL_FLOW_DETAIL_ERROR,
                payload: res.data,
            });
        }
    } catch (e) {
        dispatch({
            type: DEAL_FLOW_DETAIL_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};

