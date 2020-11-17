import { AUTH_FAIL, AUTH_LOGOUT, AUTH_SUCCESS ,AUTH_CHECK} from "../actions/actionTypes";



const intialState = {
    token: null,
    email : null,
    name : null,
    profileImage : null, 
    is_auth_checked : false
}

const reducer = (state=intialState,action) => {
    switch(action.type){
        case AUTH_SUCCESS :
            return {
                ...state,
                token: action.payload.token,
                email : action.payload.email,
                name : action.payload.name,
                profileImage : action.payload.profileImage
            }
        case AUTH_LOGOUT : 
            return {
                ...intialState,
                is_auth_checked : true
            }
        case AUTH_CHECK : 
            return {
                is_auth_checked : true
            }
        default : 
            return state
    }
    return state;
}

export default reducer;