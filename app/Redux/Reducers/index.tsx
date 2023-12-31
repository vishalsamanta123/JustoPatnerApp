import { authStore, changePasswordReducer, forgotReducer, loadingReducer, otpVerifyReducer, profileDataReducer, updatepasswordReducer, userDataReducer } from "./AuthReducer";
import { propertyReducer, propertyDetailReducer, removeStatusReducer } from "./propertyReducers";
import { createChannlePartnerReducer, emailAndMobileReducer, registerDataReducer, registrationFormReducer } from "./ReggistrationReducer";
import { agentReducer, addAgentReducer, addAgentFormReducer, editAgentReducer } from './AgentReducer';
import { addVisitorReducer, editVisitorReducer, uploadImageReducer, uploadCSVFileEReducer, visitorListReducer, visitorReducer, checkVisitorReducer } from "./LeadsReducer";
import { masterDataReducer } from "./MasterReducer";
import { editAddFollowupReducer, followUpReducer } from "./FollowUpReducer";
import { editUserReducer, settingReducer } from "./SettingReducer";
import { appointmentReducer, editAddAppointmentReducer } from "./AppointmentReducer";
import { dashboardReducer, generateQrCode, statusUpdateReducer } from "./DashboardReducer";
import { deleteNotificationReducer, notificationListReducer } from "./NotificationReducer";
import { supportForumReducer, supportForumUpdateReducer } from "./SupportForumReducer";
import { leaderBoardReducer } from "./LearderBoardReducer";
import { allUserChatListReducer, propertyChatReducer, updateChatStatus } from "./ChatReducer";
import { firebaseReducer } from "./FirebaseReducer";
import { userAppointmentReducer, userUpdateAppointmentReducer } from "./AppointmentWithUserReducer";
import permissionReducer, { notificationCountReducer } from "./permissionReducer";
import { SupportAddReducer, SupportReducer } from "./SupportReducer";
import { dealFlowReducer } from "./DealFlowReducer";

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
    deleteNotificationData: deleteNotificationReducer,
    firebaseData: firebaseReducer,

    //dashbaoard
    dashboardData: dashboardReducer,
    statusUpdate: statusUpdateReducer,
    qrCodeData: generateQrCode,
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
    checkVisitorData: checkVisitorReducer,
    editVisitorData: editVisitorReducer,
    addVisitorData: addVisitorReducer,
    uploadVisitorDetailImageData: uploadImageReducer,
    uploadVisitorDetailCSVFileData: uploadCSVFileEReducer,


    userAppointmentData: userAppointmentReducer,
    updateStatusAppointmentData: userUpdateAppointmentReducer,

    masterData: masterDataReducer,
    followUp: followUpReducer,
    editAddFollowup: editAddFollowupReducer,
    appointment: appointmentReducer,
    editAddAppointment: editAddAppointmentReducer,
    settingData: settingReducer,
    editUserData: editUserReducer,

    //support Forum
    supportForumData: supportForumReducer,
    supportForumUpdateData: supportForumUpdateReducer,

    //ledearboard
    leaderBoard: leaderBoardReducer,

    // chat management
    propertyChatData: propertyChatReducer,
    chatStatusData: updateChatStatus,
    allUserchatList: allUserChatListReducer,

    // Permissions
    permissions: permissionReducer,
    notificationCount: notificationCountReducer,

    // Raise Ticket (Support)
    SupportAdd: SupportAddReducer,
    SupportData: SupportReducer,

    //deal Flow
    dealFlow: dealFlowReducer,
}