import authStore from "./AuthReducer";
import { propertyReducer } from "./propertyReducers";
import { registrationFormReducer } from "./ReggistrationReducer";

export const reducers= {
    login:authStore,
    registrationForm: registrationFormReducer,
    propertyData: propertyReducer,
}