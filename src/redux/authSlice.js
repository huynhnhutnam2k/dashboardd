import {createSlice } from '@reduxjs/toolkit'


export const authSlice = createSlice({
    name: "auth",
    initialState:{
        login:{
            user: null,
            pending: null,
            error: null,
            msg: ""
        },
        register: {
            user: null,
            pending: false,
            error: false,
            msg: ""
        },
        getAllUser: {
            user: null,
            pending: false,
            error: false
        },
        logout: {
            pending: false,
            error: false,
            success: false
        }
    },
    reducers: {
        loginStart: state =>{
            state.login.pending = true
        },
        loginSuccess : (state, action) => {
            state.login.user = action.payload
            state.login.pending = false
            state.login.error = false
        },
        loginFail : (state, action)=> {
            state.login.pending = false
            state.login.error = true
            state.login.msg = action.payload
        },
        getAllUserStart : state=> {
            state.getAllUser.pending = true
        },
        getAllUserAccess: (state, action) => {
            state.getAllUser.user = action.payload
            state.getAllUser.error = false
            state.getAllUser.pending = false
        },
        getAllUserFail: state => {
            state.getAllUser.error = true
        },
        registerStart: state => {
            state.register.pending = true
        },
        registerAccess: (state) => {
            // state.register.user = action.payload
            state.register.pending = false
            state.register.error = false
        },
        registerFail: (state, action) => {
            state.register.error = action.payload
        },
        logoutStart: state => {
            state.logout.pending = true
        },
        logoutAccess: state => {
            state.logout.pending = false
            state.logout.error = false
            state.logout.success = true
        },
        logoutFail: state => {
            state.logout.error =true
        }
    }
})

export const {
    loginFail,
    loginStart,
    loginSuccess,
    getAllUserAccess,
    getAllUserFail,
    getAllUserStart,
    registerAccess,
    registerFail,
    registerStart,
    logoutAccess,
    logoutFail,
    logoutStart
} = authSlice.actions
export default authSlice.reducer