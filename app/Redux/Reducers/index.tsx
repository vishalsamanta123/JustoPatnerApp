import {authStore,forgotReducer, otpVerifyReducer, updatepasswordReducer} from "./AuthReducer";
import { propertyReducer, propertyDetailReducer } from "./propertyReducers";
import { registrationFormReducer } from "./ReggistrationReducer";
import { agentReducer, addAgentReducer, } from './AgentReducer';
import { addVisitorReducer, visitorReducer } from "./LeadsReducer";
import { masterDataReducer } from "./MasterReducer";

export default {
    login: authStore,
    forgotResponce: forgotReducer,
    otpVerifyResponce: otpVerifyReducer,
    updatepasswordResponce: updatepasswordReducer,
    registrationForm: registrationFormReducer,
    propertyData: propertyReducer,
    propertydetailData: propertyDetailReducer,
    agentData: agentReducer,
    addAgentForm: addAgentReducer,
    visitorData: visitorReducer,
    addVisitorForm: addVisitorReducer,
    masterData: masterDataReducer,
}