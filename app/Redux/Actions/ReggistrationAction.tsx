import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import { CHECK_EMAIL_MOBILE, CHECK_EMAIL_MOBILE_ERROR, CREATE_CHANNEL_PARTNER, CREATE_CHANNEL_PARTNER_ERROR, REGISTRATION_ERROR, REGISTRATION_FORM } from "../types";

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
  try {
    console.log('item: ', item);
    const res = await apiCall("post", apiEndPoints.CREATECHANNELPARTNER, item);
    console.log('res: ', res);
    if (res?.data?.status === 200) {
      console.log('res.data: ', res.data);
      dispatch({
        type: CREATE_CHANNEL_PARTNER,
        payload: res.data
      })
    } else {
      dispatch({
        type: CREATE_CHANNEL_PARTNER_ERROR,
        payload: res.data,
      })
    }
  }
  catch (e) {
    console.log('e: ', e);
    dispatch({
      type: CREATE_CHANNEL_PARTNER_ERROR,
      payload: console.log(e),
    })
  }
}

export const checkEmailMobile = (item: any) => async (dispatch: any) => {
  console.log('item: ', item);
  try {
    const res = await apiCall("post", apiEndPoints.CHECKEMAILMOBILE, item);
    console.log('res: ', res);

    if (res.data.status === 200) {
      console.log('res.data: ', res.data);
      dispatch({
        type: CHECK_EMAIL_MOBILE,
        payload: res.data
      })
    } else {
      dispatch({
        type: CHECK_EMAIL_MOBILE_ERROR,
        payload: res.data,
      })
    }
  } catch (e) {
    dispatch({
      type: CHECK_EMAIL_MOBILE_ERROR,
      payload: console.log(e),
    })
  }
}