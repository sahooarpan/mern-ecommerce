import Axios from 'axios';
import Cookie from 'js-cookie';
import { USER_REGISTER_FAIL,USER_REGISTER_SUCCESS,USER_REGISTER_REQUEST,USER_SIGNIN_FAIL,USER_SIGNIN_REQUEST,USER_SIGNIN_SUCCESS,USER_UPDATE_FAIL,USER_UPDATE_REQUEST,USER_UPDATE_SUCCESS,USER_LOGOUT } 
from '../actions/userConstants';

export const signIn =(email,password)=>async (dispatch)=>{
    dispatch({type:USER_SIGNIN_REQUEST,payload:{email,password}});


try {

    const {data} = await Axios.post('/api/users/signin',{email,password});
    console.log(data);
    dispatch({type:USER_SIGNIN_SUCCESS,payload:data});
    Cookie.set('userInfo',JSON.stringify(data));


    
} catch (error) {
    dispatch({type:USER_SIGNIN_FAIL,payload:error.message})
}
}

export const update=({userId,name,email,password})=>async (dispatch,getState)=>{
    try {
        
        dispatch({type:USER_UPDATE_REQUEST,payload:{userId,name,email,password}});
        const {userSignIn:{userInfo}}=getState();
        const { data } = await Axios.put(`/api/users/INR{userId}`,{name,email,password},{
            headers:{
                Authorization:'Bearer ' + userInfo.token
            }
        })

        dispatch({type:USER_UPDATE_SUCCESS,payload:data})
        Cookie.set('userInfo',JSON.stringify(data))

    } catch (error) {
        dispatch({type:USER_UPDATE_FAIL,payload:error.message})
    }
}

export const logOut = ()=>(dispatch)=>{
    Cookie.remove("userInfo");
    dispatch({type:USER_LOGOUT});
}



export const register =(name,email,password)=>async (dispatch)=>{
    dispatch({type:USER_REGISTER_REQUEST,payload:{name,email,password}});


try {

    const {data} = await Axios.post('/api/users/register',{name,email,password});
    dispatch({type:USER_REGISTER_SUCCESS,payload:data});
    Cookie.set('userInfo',JSON.stringify(data));


    
} catch (error) {
    dispatch({type:USER_REGISTER_FAIL,payload:error.message})
}
}