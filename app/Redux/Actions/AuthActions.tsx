import { USER_LOGIN, USER_LOGOUT, LOGIN_ERROR, TOKEN_GENRATE, FORGOT_PASSWORD, FORGOT_ERROR, OTPVERIFY, OTPVERIFY_ERROR, UPDATEPASSWORD, UPDATEPASSWORD_ERROR, RESENDOTP, RESENDOTP_ERROR, CHANGEPASSWORD, CHANGEPASSWORD_ERROR, START_LOADING, STOP_LOADING, PROFILE_DATA, PROFILE_DATA_ERROR } from '../types'
import axios from 'axios';
import apiEndPoints from '../../components/utilities/apiEndPoints';
import { apiCall } from 'app/components/utilities/httpClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleApiError } from 'app/components/ErrorMessage/HandleApiErrors';

export const userLogin = (loginDetail: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.LOGIN, loginDetail);
        if (res.data.status === 200) {
            // await AsyncStorage.setItem("AuthToken", res?.data?.token);
            dispatch({
                type: USER_LOGIN,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: LOGIN_ERROR,
                payload: res.data,
            })
        }
    }
    catch (e) {
        dispatch({
            type: LOGIN_ERROR,
            payload: console.log(e),
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}
export const getProfileData = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.GET_AGENT_DETAIL_, params);
        if (res.data.status === 200) {
            dispatch({
                type: PROFILE_DATA,
                payload: res.data,
            });
        } else {
            handleApiError(res.data)
            return [];
        }
    } catch (e) {
        dispatch({
            type: PROFILE_DATA_ERROR,
            payload: console.log(e),
        });
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
};
export const forgotemailverify = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.FORGOTPASSWORD, params);
        if (res.data.status === 200) {
            /*  await AsyncStorage.setItem("AuthToken", res?.data?.token);   */
            dispatch({
                type: FORGOT_PASSWORD,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: FORGOT_ERROR,
                payload: res.data,
            })
        }
    }
    catch (e) {
        dispatch({
            type: FORGOT_ERROR,
            payload: 'Server Error',
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}

export const otpVerify = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.OTPVERIFY, params);
        if (res.data.status === 200) {
            /*  await AsyncStorage.setItem("AuthToken", res?.data?.token);   */
            dispatch({
                type: OTPVERIFY,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: OTPVERIFY_ERROR,
                payload: res.data,
            })
        }
    }
    catch (e) {
        dispatch({
            type: OTPVERIFY_ERROR,
            payload: 'Server Error',
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}
export const Resendotp = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.RESENDOTP, params);
        if (res.data.status === 200) {
            /*  await AsyncStorage.setItem("AuthToken", res?.data?.token);   */
            dispatch({
                type: RESENDOTP,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: OTPVERIFY_ERROR,
                payload: res.data,
            })
        }
    }
    catch (e) {
        dispatch({
            type: OTPVERIFY_ERROR,
            payload: 'Server Error',
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}


export const updatepassword = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.UPDATEPASSWORD, params);
        if (res.data.status === 200) {
            /*  await AsyncStorage.setItem("AuthToken", res?.data?.token);   */
            dispatch({
                type: UPDATEPASSWORD,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: UPDATEPASSWORD_ERROR,
                payload: res.data,
            })
        }
    }
    catch (e) {
        dispatch({
            type: UPDATEPASSWORD_ERROR,
            payload: 'Server Error',
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}

export const changePassword = (params: any) => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("post", apiEndPoints.CHANGEPASSWORD, params);
        if (res.data.status === 200) {
            /*  await AsyncStorage.setItem("AuthToken", res?.data?.token);   */
            dispatch({
                type: CHANGEPASSWORD,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            dispatch({
                type: CHANGEPASSWORD_ERROR,
                payload: res.data,
            })
        }
    }
    catch (e) {
        dispatch({
            type: UPDATEPASSWORD_ERROR,
            payload: 'Server Error',
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}

export const userLogout = () => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        await AsyncStorage.removeItem("persistantState");
        await AsyncStorage.removeItem("AuthToken");
        await AsyncStorage.removeItem('userData')
        await AsyncStorage.removeItem('firebase_id')
        dispatch({
            type: USER_LOGOUT,
            payload: null
        })
    }
    catch (e) {
        dispatch({
            type: LOGIN_ERROR,
            payload: console.log(e),
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}

export const jwtTokenGenrate = () => async (dispatch: any) => {
    dispatch({ type: START_LOADING })
    try {
        const res = await apiCall("get", apiEndPoints.JWTTOKEN, {});
        if (res.data.status == 200) {
            dispatch({
                type: TOKEN_GENRATE,
                payload: res.data
            })
        } else {
            handleApiError(res?.data)
            return null;
        }

    }
    catch (e) {
        dispatch({
            type: LOGIN_ERROR,
            payload: console.log(e),
        })
    }
    finally {
        dispatch({ type: STOP_LOADING })
    }
}
