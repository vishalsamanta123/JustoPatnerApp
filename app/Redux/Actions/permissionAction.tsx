import { apiCall } from "app/components/utilities/httpClient";
import { PERMISSION_MODULES, PERMISSION_MODULES_ERROR } from "../types";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import { MENUITEMS } from "../PermissionType";

const checkPermission = (data: any, isAdmin: any) => {
  const sideBarList = [
    ...Array.from(
      [...data, ...MENUITEMS]
        .reduce((m, o) => m.set(o.slug, o), new Map())
        .values()
    ),
  ].map((itm: any) => ({
    ...data.find((item: any) => item.slug === itm.slug && item),
    ...itm,
  }));

  let finalList: any = sideBarList.map((item) => {
    if (item.slug) {
      if (data.some((i: any) => i.slug === item.slug)) {
        item.permission = true;
        item.title = item.module_title;
      }
      else {
        item.permission = false;
      }
    }
    return item;
  });
  // console.log('finalList: ', finalList);
  return finalList.sort((a: any, b: any)=>a.sort - b.sort)
  // return finalList.sort(function (a: any, b: any) {
  //   if (a.title) {
  //     var _a = a.title === "Property management" ? "0" : a.title === "Dashboard" ? "1" : "2";
  //     // _a += a.title.localeCompare(b.title) === -1 ? "0" : "1";
  //     var _b = b.title === "Property management" ? "0" : b.title === "Dashboard" ? "1" : "2";
  //     // _b += b.title.localeCompare(a.title) === -1 ? "0" : "1";
  //     return Number(_a) - Number(_b);
  //   }
  // });
};

export const getPermission = (item: any) => async (dispatch: any) => {
  try {
    const res = await apiCall("get", apiEndPoints.PERMISSION_MODULE, item);
    console.log("res IN PERMISSION_MODULE: ", res.data);
    if (res.data.status === 200) {
      let payload = {
        data: await checkPermission(res.data.data, item.isAdmin),
        isAdmin: item.isAdmin,
      };
      dispatch({
        type: PERMISSION_MODULES,
        payload: payload,
      });
    }
  } catch (e) {
    dispatch({
      type: PERMISSION_MODULES_ERROR,
      payload: [],
    });
  }
};