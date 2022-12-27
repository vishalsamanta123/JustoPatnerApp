import { handleApiError } from "app/components/ErrorMessage/HandleApiErrors";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import {
  REGISTRATION_FORM_REMOVE, CHECK_EMAIL_MOBILE,
  CHECK_EMAIL_MOBILE_ERROR, CREATE_CHANNEL_PARTNER,
  CREATE_CHANNEL_PARTNER_ERROR, REGISTRATION_ERROR,
  REGISTRATION_FORM, REMOVE_CREATE_CHANNEL_PARTNER,
  REMOVE_EMAIL_NUMBER_CHECK, START_LOADING, STOP_LOADING
} from "../types";

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

export const RegistrationFormRemv = () => async (dispatch: any) => {
  try {
    dispatch({
      type: REGISTRATION_FORM_REMOVE,
      payload: null,
    });
  } catch (e) {
    dispatch({
      type: REGISTRATION_ERROR,
      payload: console.log(e),
    });
  }
};

export const createChannelPartner = (item: any) => async (dispatch: any) => {
  console.log('item: ', item);
  dispatch({ type: START_LOADING })
  try {
    const header = { "Content-Type": "multipart/form-data", "access-control-allow-origin": "*" }
    const res = await apiCall("post", apiEndPoints.CREATECHANNELPARTNER, item, header);
    console.log('res: CREATECHANNELPARTNER', res);
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
        payload: res.data,
        check_type: item.mobile ? "mobile" : item.email ? "email" : "",
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
export const emailCheckRemove = () => async (dispatch: any) => {
  try {
    dispatch({
      type: REMOVE_EMAIL_NUMBER_CHECK,
      payload: null,
    });
  } catch (e) {
    dispatch({
      type: CHECK_EMAIL_MOBILE_ERROR,
      payload: console.log(e),
    });
  }
};
export const removeRegisterData = () => async (dispatch: any) => {
  try {
    dispatch({
      type: REMOVE_CREATE_CHANNEL_PARTNER,
      payload: null,
    });
  } catch (e) {
    dispatch({
      type: CHECK_EMAIL_MOBILE_ERROR,
      payload: console.log(e),
    });
  }
};
