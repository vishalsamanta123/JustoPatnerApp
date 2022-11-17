import authStore from "./AuthReducer";
import { propertyReducer,propertyDetailReducer } from "./propertyReducers";
import { registrationFormReducer } from "./ReggistrationReducer";
import { agentReducer, addAgentReducer, } from './AgentReducer';

export const reducers = {
    login: authStore,
    registrationForm: registrationFormReducer,
    propertyData: propertyReducer,
    propertydetailData: propertyDetailReducer,
    agentData: agentReducer,
    addAgentForm: addAgentReducer,
}