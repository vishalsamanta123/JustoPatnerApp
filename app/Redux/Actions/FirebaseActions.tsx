import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import {
  FIREBASE_UPDATE,
  FIREBASE_UPDATE_ERROR,
  START_LOADING,
  STOP_LOADING,
} from "../types";

export const updateFirebase = (params: any) => async (dispatch: any) => {
  dispatch({ type: START_LOADING });
  try {
    const res = await apiCall("post", apiEndPoints.FIREBASE_UPDATE, params);
    console.log('res: IN UPDATE FIREBASE', res);
    if (res.data.status === 200) {
      /*  await AsyncStorage.setItem("AuthToken", res?.data?.token);   */
      dispatch({
        type: FIREBASE_UPDATE,
        payload: res.data,
      });
    } else {
      dispatch({
        type: FIREBASE_UPDATE_ERROR,
        payload: res.data,
      });
    }
  } catch (e) {
    dispatch({
      type: FIREBASE_UPDATE_ERROR,
      payload: "Server Error",
    });
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};
