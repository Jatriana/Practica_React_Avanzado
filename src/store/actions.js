import { AUTH_LOGIN, AUTH_LOGOUT } from './types';

export const authlogin = ()=>{
    return{
        type:AUTH_LOGIN,
    }
}

export const authLogout =()=>{
    return{
        type:AUTH_LOGOUT,
    }
}