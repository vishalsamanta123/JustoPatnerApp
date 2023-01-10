import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { GET_CHAT_ALL_USER_PROPERTY, GET_CHAT_PROPERTY_LIST, PROPERTY_LIST_ERROR, START_LOADING, STOP_LOADING, USER_CHAT_LIST_ERROR } from "../types";

export const getChatListForProperty = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_PROPERTY_LIST_FOR_CHAT, params);
        if (res.data.status === 200) {
            // await AsyncStorage.setItem("AuthToken", res?.data?.token);
            dispatch({
                type: GET_CHAT_PROPERTY_LIST,
                payload: res.data
            })
        } else {
            dispatch({
                type: PROPERTY_LIST_ERROR,
                payload: [],
            })
        }
    }
    catch (e) {
        dispatch({
            type: PROPERTY_LIST_ERROR,
            payload: console.log(e),
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}
export const getAllChatInProperty = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_ALL_CHAT_IN_PROPERTY, params);
        if (res.data.status === 200) {
            dispatch({
                type: GET_CHAT_ALL_USER_PROPERTY,
                payload: res.data
            })
        } else {
            dispatch({
                type: USER_CHAT_LIST_ERROR,
                payload: [],
            })
        }
    }
    catch (e) {
        dispatch({
            type: USER_CHAT_LIST_ERROR,
            payload: console.log(e),
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}