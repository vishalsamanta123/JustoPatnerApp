import { TOKEN_GENRATE, USER_LOGIN, USER_LOGOUT, LOGIN_ERROR } from '../types'

const initialState = {
    response: null,
    authToken: false,
    loading: true
}

export default function authStore(state = initialState, action: any){
    switch (action.type) {

        case USER_LOGIN:
        return {
            ...state,
            response: action.payload,
            authToken: true
        }

        case USER_LOGOUT:
        return {
            ...state,
            response: null,
            authToken: false
        }
        
        case LOGIN_ERROR:
        return {
            ...state,
            response: action.payload,
            authToken: false
        }

        case TOKEN_GENRATE:
        return {
            ...state,
            response: action.payload,
            // authToken: false
        }
        default: return state
    }

}
