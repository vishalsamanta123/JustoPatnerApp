import {authStore,changePasswordReducer,forgotReducer, otpVerifyReducer, updatepasswordReducer} from "./AuthReducer";
import { propertyReducer, propertyDetailReducer } from "./propertyReducers";
import { createChannlePartnerReducer, registrationFormReducer } from "./ReggistrationReducer";
import { agentReducer, addAgentReducer, } from './AgentReducer';
import { addVisitorReducer, visitorListReducer, visitorReducer } from "./LeadsReducer";
import { masterDataReducer } from "./MasterReducer";
import { settingReducer } from "./SettingReducer";

export default {
    login: authStore,
    forgotResponce: forgotReducer,
    otpVerifyResponce: otpVerifyReducer,
    updatepasswordResponce: updatepasswordReducer,
    changePasswordResponse: changePasswordReducer,
    registrationForm: registrationFormReducer,
    createChannlePartner: createChannlePartnerReducer,
    propertyData: propertyReducer,
    propertydetailData: propertyDetailReducer,
    agentData: agentReducer,
    addAgentForm: addAgentReducer,
    visitorData: visitorReducer,
    visitorDataList: visitorListReducer,
    addVisitorForm: addVisitorReducer,
    masterData: masterDataReducer,
    settingData: settingReducer,
}