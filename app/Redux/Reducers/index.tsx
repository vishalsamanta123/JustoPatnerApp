import { authStore, changePasswordReducer, forgotReducer, loadingReducer, otpVerifyReducer, profileDataReducer, updatepasswordReducer, userDataReducer } from "./AuthReducer";
import { propertyReducer, propertyDetailReducer, removeStatusReducer } from "./propertyReducers";
import { createChannlePartnerReducer, emailAndMobileReducer, registerDataReducer, registrationFormReducer } from "./ReggistrationReducer";
import { agentReducer, addAgentReducer, addAgentFormReducer, editAgentReducer } from './AgentReducer';
import { addVisitorReducer, editVisitorReducer, visitorListReducer, visitorReducer } from "./LeadsReducer";
import { masterDataReducer } from "./MasterReducer";
import { followUpReducer } from "./FollowUpReducer";
import { editUserReducer, settingReducer } from "./SettingReducer";
import { appointmentReducer } from "./AppointmentReducer";
import { dashboardReducer, statusUpdateReducer } from "./DashboardReducer";
import { notificationListReducer } from "./NotificationReducer";
import { supportForumReducer, supportForumUpdateReducer } from "./SupportForumReducer";
import { allUserChatListReducer, propertyChatReducer } from "./ChatReducer";

export default {
    loadingReducer: loadingReducer,
    login: authStore,
    userData: userDataReducer,
    profileData: profileDataReducer,
    forgotResponce: forgotReducer,
    otpVerifyResponce: otpVerifyReducer,
    updatepasswordResponce: updatepasswordReducer,
    changePasswordResponse: changePasswordReducer,
    registrationForm: registrationFormReducer,
    createChannlePartner: createChannlePartnerReducer,
    registerData: registerDataReducer,
    emailAndMobileData: emailAndMobileReducer,
    notificationData: notificationListReducer,

    //dashbaoard
    dashboardData: dashboardReducer,
    statusUpdate: statusUpdateReducer,
    //property modal
    propertyData: propertyReducer,
    propertydetailData: propertyDetailReducer,
    removePropertyStatus: removeStatusReducer,

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
    editUserData: editUserReducer,

    //support Forum
    supportForumData: supportForumReducer,
    supportForumUpdateData: supportForumUpdateReducer,
    
    // chat management
    propertyChatData: propertyChatReducer,
    allUserchatList: allUserChatListReducer,

}