import Axios from 'axios';
import { RecyclerViewBackedScrollView } from 'react-native';
import * as ActionTypes from '../actions/actionTypes';


export const signUpHandler = (name,email,password) => async dispatch => {
    
    try{
        const response = await Axios.post('http://192.168.0.28:3000/auth/sign-up-with-email',{
            email : email,
            name : name,
            password : password
        }).then(res => res.data).catch(err => {
            console.log('!!!',err)
            if(err.response) return err.response.data
            else return err.message
        })

      if(response.success){
            dispatch(authSuccess({
                token : response.token,
                name : response.name,
                email : response.email,
                profile : response.profile
            }))
       }else{
            throw {
                responseError : response,
                error : Error()
            }
        }

    }catch(err){
        throw err
    }

}


export const continueWithGoogle = (token,user) => async dispatch => {
    
    try{
        const response = await Axios.post('http://192.168.0.28:3000/auth/continue-with-google',{
            token : token,
            user: user
        }).then(res => res.data).catch(err => {
            console.log('!!!',err)
            if(err.response) return err.response.data
            else return err.message
        })

      if(response.success){
            dispatch(authSuccess({
                token : response.token,
                name : response.name,
                email : response.email,
                profile : response.profile
            }))
       }else{
            throw {
                responseError : response,
                error : Error()
            }
        }

    }catch(err){
        throw err
    }

}



export const signInHandler = (email,password) => async dispatch => {
    
    try{
        const response = await Axios.post('http://192.168.0.28:3000/auth/sign-in-with-email',{
                email : email,
                password : password
            }).then(res => res.data).catch(err => {
                if(err.response) return err.response.data
                else return err.message
            })

       if(response.success){
            dispatch(authSuccess({
                token : response.token,
                name : response.name,
                email : response.email,
                profile : response.profile
            }))

        }else{
            throw {
                responseError : response,
                error : Error()
            }
        }

    }catch(err){
        console.log(err)
        throw err
    }

}



export const authSuccess = payload => {
    return {
        type: ActionTypes.AUTH_SUCCESS,
        payload : {...payload}
    }
}

