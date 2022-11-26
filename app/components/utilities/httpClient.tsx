import { GLOBAL_URL, IS_LOADING } from "./constant";
import axios from "axios";

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
  // console.log('url: ', url);
  // console.log('data: ', data);
  // console.log('method: ', method);
  try {
    // IS_LOADING = true;
    const response = await httpClient({
      method,
      url,
      data,
      headers: header,
      // withCredentials: false,
    });
    if (response.status === 200) {
      return response;
    }
    if (response.status === 201) {
      return response;
    }
  } catch (error: any) {
  console.log('errordsfdfdfs: ', error);
    if (error.response) {
      if (error.response.status === 401) {
        console.log(`${url}: `, error.response);
        return error.response;
      }
      return error.response;
      // console.log("Error data : ", error.response.data);
      // console.log("Error status : ", error.response.status);
      // console.log("Error headers : ", error.response.headers);
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



