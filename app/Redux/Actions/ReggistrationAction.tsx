import { handleApiError } from "app/components/ErrorMessage/HandleApiErrors";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { CHECK_EMAIL_MOBILE, CHECK_EMAIL_MOBILE_ERROR, CREATE_CHANNEL_PARTNER, CREATE_CHANNEL_PARTNER_ERROR, REGISTRATION_ERROR, REGISTRATION_FORM, START_LOADING, STOP_LOADING } from "../types";

export const RegistrationForm = (item: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: REGISTRATION_FORM,
      payload: item,
    });
  } catch (e) {
    dispatch({
      type: REGISTRATION_ERROR,
      payload: console.log(e),
    });
  }
};

export const createChannelPartner = (item: any) => async (dispatch: any) => {
  dispatch({ type: START_LOADING })
  try {
    const res = await apiCall("post", apiEndPoints.CREATECHANNELPARTNER, item);
    if (res?.data?.status === 200) {
      dispatch({
        type: CREATE_CHANNEL_PARTNER,
        payload: res.data
      })
    } else {
      handleApiError(res?.data)
      dispatch({
        type: CREATE_CHANNEL_PARTNER_ERROR,
        payload: [],
      })
    }
  }
  catch (e) {
    dispatch({
      type: CREATE_CHANNEL_PARTNER_ERROR,
      payload: console.log(e),
    })
  }
  finally {
    dispatch({ type: STOP_LOADING })
  }
}

export const checkEmailMobile = (item: any) => async (dispatch: any) => {
  dispatch({ type: START_LOADING })
  try {
    const res = await apiCall("post", apiEndPoints.CHECKEMAILMOBILE, item);
    if (res.data.status === 200) {
      dispatch({
        type: CHECK_EMAIL_MOBILE,
        payload: res.data
      })
    } else {
      handleApiError(res?.data)
      dispatch({
        type: CHECK_EMAIL_MOBILE_ERROR,
        payload: [],
      })
    }
  } catch (e) {
    dispatch({
      type: CHECK_EMAIL_MOBILE_ERROR,
      payload: console.log(e),
    })
  }
  finally {
    dispatch({ type: STOP_LOADING })
  }
}