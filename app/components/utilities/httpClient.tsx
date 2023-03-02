import { GLOBAL_URL } from "./constant";
import axios from "axios";
import { useSelector } from "react-redux";
import configureStore from 'app/Redux/Store'
import AsyncStorage from "@react-native-async-storage/async-storage";

const httpClient = axios.create({
  baseURL: `${GLOBAL_URL}/api/`,
});


export function setDefaultHeader(header: any, value: any) {
  httpClient.defaults.headers.common[header] = value;
}


export async function apiCall(
  method: any,
  url: any,
  data: any,
  header = { "Content-Type": "application/json", "access-control-allow-origin": "*" }
) {
  const { response } = configureStore().store.getState().login;
  const generatedToken = await AsyncStorage.getItem("token");
  let headers = {
    ...header,
    "token": response?.token ? response?.token : generatedToken
  }
  try {
    const response = await httpClient({
      method,
      url,
      data,
      headers: headers,
      // withCredentials: false,
    });
    if (response.status === 200) {
      return response;
    }
    if (response.status === 201) {
      return response;
    }
  } catch (error: any) {
    // console.log('errordsfdfdfs: ', error);
    if (error.response) {
      if (error.response.status === 401) {
        // console.log(`${url}: `, error.response);
        return error.response;
      }
      return error.response;
    } else if (error.request) {
      // console.log("Error request 1: ", error.request);
      return error.response;
    } else {
      // console.log("Error message 2: ", error.message);
    }
    // return error;
    return error.response;
  }
}



