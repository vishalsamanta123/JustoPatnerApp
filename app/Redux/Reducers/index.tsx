import authStore from "./AuthReducer";
import { propertyReducer, propertyDetailReducer } from "./propertyReducers";
import { registrationFormReducer } from "./ReggistrationReducer";
import { agentReducer, addAgentReducer, } from './AgentReducer';
import { addVisitorReducer, visitorReducer } from "./LeadsReducer";

export default {
    login: authStore,
    registrationForm: registrationFormReducer,
    propertyData: propertyReducer,
    propertydetailData: propertyDetailReducer,
    agentData: agentReducer,
    addAgentForm: addAgentReducer,
    visitorData: visitorReducer,
    addVisitorForm: addVisitorReducer,
}