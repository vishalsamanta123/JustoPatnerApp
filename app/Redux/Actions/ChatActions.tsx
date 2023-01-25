import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { GET_CHAT_ALL_USER_PROPERTY, GET_CHAT_PROPERTY_LIST, PROPERTY_LIST_ERROR, START_LOADING, STOP_LOADING, UPDATE_CHAT_STATUS, UPDATE_CHAT_STATUS_ERROR, USER_CHAT_LIST_ERROR } from "../types";

export const getChatListForProperty = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_PROPERTY_LIST_FOR_CHAT, params);
        // console.log('res: ', res);
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

export const chatStatusUpdate = (params: any) => async (dispatch: any) => {
console.log('params: chatStatusUpdate', params);
    dispatch({ type: START_LOADING });
    try {
      const res = await apiCall("post", apiEndPoints.UPDATE_CHAT_STATUS, params);
      console.log('res: chatStatusUpdate', res);
      if (res.data.status === 200) {
        dispatch({
          type: UPDATE_CHAT_STATUS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: UPDATE_CHAT_STATUS_ERROR,
          payload: [],
        });
      }
    } catch (e) {
      dispatch({
        type: UPDATE_CHAT_STATUS_ERROR,
        payload: [],
      });
    } finally {
      dispatch({ type: STOP_LOADING });
    }
  };