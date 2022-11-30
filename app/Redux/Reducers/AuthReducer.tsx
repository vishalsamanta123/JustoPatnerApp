import { TOKEN_GENRATE, USER_LOGIN, USER_LOGOUT, LOGIN_ERROR, FORGOT_PASSWORD, FORGOT_ERROR, FORGOT_NULL, OTPVERIFY, OTPVERIFY_ERROR, OTPVERIFY_NULL, UPDATEPASSWORD, UPDATEPASSWORD_NULL, UPDATEPASSWORD_ERROR, RESENDOTP, RESENDOTP_ERROR, RESENDOTP_NULL, CHANGEPASSWORD_ERROR, CHANGEPASSWORD, CHANGEPASSWORD_NULL, START_LOADING, STOP_LOADING } from '../types'

const initialState = {
    response: null,
    authToken: false,
    loading: true,

}
const userDataInitialState = {
    response: null,
    authToken: false,
    loading: true,

}
const forgotinitialState = {
    response: null,
    loading: true,
    forgot: false,
    error: false
}
const otpverifyinitialState = {
    response: null,
    loading: true,
    otpverify: false,
    error: false,
    resend: false,
}
const updatepasswordinitialState = {
    response: null,
    loading: true,
    updatepassword: false,
    error: false
}
const changePasswordinitialState = {
    response: null,
    loading: true,
    changepassword: false,
    error: false
}
export function loadingReducer(state = { loading: false }, action: any) {
    switch (action.type) {

        case START_LOADING:
            return {
                ...state,
                loading: true,
            }
        case STOP_LOADING:
            return {
                ...state,
                loading: false,
            }
        default: return state
    }

}
export function userDataReducer(state = userDataInitialState, action: any) {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                response: action.payload,
                authToken: true,
                loading: false,
            }

        case LOGIN_ERROR:
            return {
                ...state,
                response: action.payload,
                authToken: false,
                loading: false,
            }
        default: return state
    }
}
export function authStore(state = initialState, action: any) {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                response: action.payload,
                authToken: true,
                loading: false,
            }


        case USER_LOGOUT:
            return {
                ...state,
                response: null,
                authToken: false,
                loading: false,
            }

        case LOGIN_ERROR:
            return {
                ...state,
                response: action.payload,
                authToken: false,
                loading: false,
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

export function forgotReducer(state = forgotinitialState, action: any) {
    switch (action.type) {

        case FORGOT_PASSWORD:
            return {
                ...state,
                response: action.payload,
                forgot: true,
                error: false,
                loading: false,

            }
        case FORGOT_ERROR:
            return {
                ...state,
                response: action.payload,
                forgot: true,
                error: true,
                loading: false,
            }
        case FORGOT_NULL:
            return {
                ...state,
                response: action.payload,
                forgot: false,
                error: false,
                loading: false,
            }


        default: return state
    }

}

export function otpVerifyReducer(state = otpverifyinitialState, action: any) {
    switch (action.type) {

        case OTPVERIFY:
            return {
                ...state,
                response: action.payload,
                otpverify: true,
                error: false,
                loading: false,
                resend: false,

            }
        case OTPVERIFY_ERROR:
            return {
                ...state,
                response: action.payload,
                otpverify: true,
                error: true,
                loading: false,

            }
        case OTPVERIFY_NULL:
            return {
                ...state,
                response: action.payload,
                otpverify: false,
                error: false,
                loading: false,
            }
        case RESENDOTP:
            return {
                ...state,
                response: action.payload,
                otpverify: true,
                error: false,
                loading: false,
                resend: true,

            }
        /*  case RESENDOTP_ERROR:
         return {
             ...state,
             response: action.payload,
             otpverify: true,
             error: true,
             loading: false,
         }
         case RESENDOTP_NULL:
         return {
             ...state,
             response: action.payload,
             otpverify: false,
             error: false,
             loading: false,
         } */


        default: return state
    }

}
export function updatepasswordReducer(state = updatepasswordinitialState, action: any) {
    switch (action.type) {

        case UPDATEPASSWORD:
            return {
                ...state,
                response: action.payload,
                updatepassword: true,
                error: false,
                loading: false,

            }
        case UPDATEPASSWORD_ERROR:
            return {
                ...state,
                response: action.payload,
                updatepassword: true,
                error: true,
                loading: false,
            }
        case UPDATEPASSWORD_NULL:
            return {
                ...state,
                response: action.payload,
                updatepassword: false,
                error: false,
                loading: false,
            }


        default: return state
    }

}

export function changePasswordReducer(state = changePasswordinitialState, action: any) {
    switch (action.type) {

        case CHANGEPASSWORD:
            return {
                ...state,
                response: action.payload,
                changepassword: true,
                error: false,
                loading: false,

            }
        case CHANGEPASSWORD_ERROR:
            return {
                ...state,
                response: action.payload,
                changepassword: true,
                error: true,
                loading: false,
            }
        case CHANGEPASSWORD_NULL:
            return {
                ...state,
                response: action.payload,
                changepassword: false,
                error: false,
                loading: false,
            }


        default: return state
    }

}

