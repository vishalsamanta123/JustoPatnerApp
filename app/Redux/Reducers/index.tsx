import authStore from "./AuthReducer";
import { propertyReducer } from "./propertyReducers";
import { registrationFormReducer } from "./ReggistrationReducer";
import { agentReducer, addAgentReducer, } from './AgentReducer';

export const reducers = {
    login: authStore,
    registrationForm: registrationFormReducer,
    propertyData: propertyReducer,
    agentData: agentReducer,
    addAgentForm: addAgentReducer,
}