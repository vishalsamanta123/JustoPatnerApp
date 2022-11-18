import authStore from "./AuthReducer";
import { propertyReducer,propertyDetailReducer } from "./propertyReducers";
import { registrationFormReducer } from "./ReggistrationReducer";
import { agentReducer, addAgentReducer, } from './AgentReducer';
import { masterDataReducer } from "./MasterReducer";

export default  {
    login: authStore,
    registrationForm: registrationFormReducer,
    propertyData: propertyReducer,
    propertydetailData: propertyDetailReducer,
    agentData: agentReducer,
    addAgentForm: addAgentReducer,
    masterData: masterDataReducer,
}