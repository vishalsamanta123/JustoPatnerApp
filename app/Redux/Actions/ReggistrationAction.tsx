import { REGISTRATION_ERROR, REGISTRATION_FORM } from "../types";

export const RegistrationForm = (item: any) => async (dispatch: any) => {
console.log('item: ', item);
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