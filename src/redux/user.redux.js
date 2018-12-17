import axios from 'axios'
import {getRedirectPath} from "../util";

const LOGOUT = 'LOGOUT'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const AUTH_SUCCESS = "AUTH_SUCCESS"

const initState ={
    msg: '',
    redirectTo:'',
    user: '',
    type: ''
}

export  function user(state = initState,action) {
    switch (action.type){
        case AUTH_SUCCESS:
            return{...state,msg:'',redirectTo:getRedirectPath(action.payload), ...action.payload}
        case ERROR_MSG:
            return {...state,msg: action.msg}
        case LOAD_DATA:
            return {...state,...action.payload}
        case LOGOUT:
            return {...initState, redirectTo: '/login'}
        default:
            return state
    }
}
function loadData(data) {
    return {type:LOAD_DATA,payload:data}
}

/*function registerSuccess(data) {
    return {type:REGISTER_SUCCESS,payload:data}
}

function loginSuccess(data) {
    return {type:LOGIN_SUCCESS,payload:data}
}*/
function authSuccess(data) {
    //console.log(data)
    return {type:AUTH_SUCCESS,payload:data}
}

function errorMsg(msg) {
    return {msg, type: ERROR_MSG}
}

/*export function userInfo({userid}){
    return dispatch=>{
        axios.post('/user/info',{userid})
            .then(res=>{
                if(res.status==200){
                    if(res.data.code===0){
                        //have login information
                    }else {
                        this.props.loadData(res.data.data)
                        this.props.history.push('/login')
                    }
                }
            })
    }
}*/
export function logoutSubmit() {
    return {type:LOGOUT}
}

export function loadData(data) {
    return {type:LOAD_DATA,payload:data}
}
export function update(data) {
    return dispatch=>{
        axios.post('/user/update',data)
            .then(res=>{
                if (res.status==200 && res.data.code===0){
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg('server error'))
                }
            })
    }
}

export function login({user,pwd}) {
    if(!user||!pwd){
        return errorMsg('incorrect username or password');
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd})
            .then(res=>{
                if(res.status==200&&res.data.code===0){
                    dispatch(authSuccess(res.data.data))
                }else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}



export function register({user,pwd,repeatpwd,type}) {
    if(!user||!pwd||!type){
        return errorMsg('username/password is incorrect')
    }
    if(pwd !== repeatpwd){
        return errorMsg('')
    }
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type})
            .then(res=>{
                if(res.status ==200 && res.data.code ===0){
                    dispatch(authSuccess({user,pwd,type}))
                }else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

