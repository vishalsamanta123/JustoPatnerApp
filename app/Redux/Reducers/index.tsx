import { authStore, changePasswordReducer, forgotReducer, loadingReducer, otpVerifyReducer, updatepasswordReducer, userDataReducer } from "./AuthReducer";
import { propertyReducer, propertyDetailReducer } from "./propertyReducers";
import { createChannlePartnerReducer, registrationFormReducer } from "./ReggistrationReducer";
import { agentReducer, addAgentReducer, addAgentFormReducer, editAgentReducer } from './AgentReducer';
import { addVisitorReducer, editVisitorReducer, visitorListReducer, visitorReducer } from "./LeadsReducer";
import { masterDataReducer } from "./MasterReducer";
import { followUpReducer } from "./FollowUpReducer";
import { settingReducer } from "./SettingReducer";
import { appointmentReducer } from "./AppointmentReducer";
import { dashboardReducer, statusUpdateReducer } from "./DashboardReducer";

export default {
    loadingReducer: loadingReducer,
    login: authStore,
    userData: userDataReducer,
    forgotResponce: forgotReducer,
    otpVerifyResponce: otpVerifyReducer,
    updatepasswordResponce: updatepasswordReducer,
    changePasswordResponse: changePasswordReducer,
    registrationForm: registrationFormReducer,
    createChannlePartner: createChannlePartnerReducer,

    //dashbaoard
    dashboardData: dashboardReducer,
    statusUpdate: statusUpdateReducer,
    //property modal
    propertyData: propertyReducer,
    propertydetailData: propertyDetailReducer,

    // agent modal
    agentData: agentReducer,
    addAgentForm: addAgentFormReducer,
    editAgentData: editAgentReducer,
    addAgentData: addAgentReducer,

    // visit modal
    visitorData: visitorReducer,
    visitorDataList: visitorListReducer,
    editVisitorData: editVisitorReducer,
    addVisitorData: addVisitorReducer,


    masterData: masterDataReducer,
    followUp: followUpReducer,
    appointment: appointmentReducer,
    settingData: settingReducer,
}