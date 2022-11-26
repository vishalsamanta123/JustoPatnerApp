import { UPDATE_PROFILE_ERROR, UPDATE_PROFILE } from "../types";
import apiEndPoints from "../../components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { handleApiError } from "app/components/ErrorMessage/HandleApiErrors";

export const updateUserSettingData =
  (userDetail: any) => async (dispatch: any) => {
    try {
      const header = {
        "Content-Type": "multipart/form-data",
        "access-control-allow-origin": "*",
      };
      const res = await apiCall(
        "post",
        apiEndPoints.UPDATECHANNELPARTNER,
        userDetail,
        header
      );
      console.log("res.data: ====>>>> ", res);
      if (res.data.status == 200) {
        dispatch({
          type: UPDATE_PROFILE,
          payload: res.data,
        });
      } else {
        handleApiError(res?.data)
        dispatch({
          type: UPDATE_PROFILE_ERROR,
          payload: res.data,
        });
      }
    } catch (e) {
      dispatch({
        type: UPDATE_PROFILE_ERROR,
        payload: console.log(e),
      });
    }
  };
