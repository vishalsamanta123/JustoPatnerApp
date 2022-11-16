import { USER_LOGIN, USER_LOGOUT, LOGIN_ERROR, TOKEN_GENRATE } from '../types'
import axios from 'axios';
import apiEndPoints from '../../components/utilities/apiEndPoints';
import { apiCall } from 'app/components/utilities/httpClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const userLogin = (loginDetail: any) => async (dispatch: any) => {
    try {
        const res = await apiCall("post", apiEndPoints.LOGIN, loginDetail);
        console.log("userLogin -> res", res)
        if(res.data.status === 200){
        
        console.log("jwtTokenGenrate -> res?.data?.token", res?.data?.token)
        await AsyncStorage.setItem("AuthToken", res?.data?.token);    

        dispatch({
            type: USER_LOGIN,
            payload: res.data
        })
       }else{
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
}

export const userLogout = () => async (dispatch: any) => {
    try {
      await AsyncStorage.removeItem("persistantState");
      await AsyncStorage.removeItem("AuthToken");
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
}

export const jwtTokenGenrate = () => async (dispatch: any) => {
    try {
        const res = await apiCall("get", apiEndPoints.JWTTOKEN, {});
        if (res.data.status == 200) {

          

            dispatch({
                type: TOKEN_GENRATE,
                payload: res.data
            })
        } else {
            return null;
        }

    }
    catch (e) {
        dispatch({
            type: LOGIN_ERROR,
            payload: console.log(e),
        })
    }
}
