import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { MASTER_LIST,MASTER_ERROR, GET_SOURCING_MANAGER, GET_SOURCING_MANAGER_ERROR} from "../types";

export const getAllMaster = (params: any) => async (dispatch: any) => {
    try {
        const res = await apiCall("post", apiEndPoints.ADDMASTERLIST, params);
        if (res.data.status == 200) {
            dispatch({
                type: MASTER_LIST,
                payload: res.data,
            });
        } else {
            dispatch({
                type: MASTER_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: MASTER_ERROR,
            payload: console.log(e),
        });
    }
};
export const getAllSourcingManager = (params: any) => async (dispatch: any) => {
console.log('params: ', params);
    try {
        const res = await apiCall("post", apiEndPoints.GET_SOURCINGMANAGER, params);
        console.log('res GET_SOURCINGMANAGER: ', res);
        if (res.data.status == 200) {
            dispatch({
                type: GET_SOURCING_MANAGER,
                payload: res.data,
            });
        } else {
            dispatch({
                type: GET_SOURCING_MANAGER_ERROR,
                payload: [],
            });
        }
    } catch (e) {
        dispatch({
            type: GET_SOURCING_MANAGER_ERROR,
            payload: console.log(e),
        });
    }
};
