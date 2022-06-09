import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {URL} from './url'
export const departFetch = createAsyncThunk(
    "department/fetchAll",
    async() => {
        try{
            const res = await axios.get(`https://serverdhyd.herokuapp.com/api/v1/department`)
            return res?.data
        }catch(error){
            console.log(error.response.data)
        }
    }
)
export const addDepart = createAsyncThunk(
    "department/add",
    async({body, token}) => {   
        try{
            const res = await axios.post("https://serverdhyd.herokuapp.com/api/v1/department/add", body, {
                headers: {
                    token: `Bearer ${token}`
                }
            })
            return res.data
        }catch(error){  
            console.log(error.response.data)
        }
    }
)
export const editDepart = createAsyncThunk(
    "department/edit", 
    async({body, token, idDepart}) => {
        try {
            const res = await axios.put(`https://serverdhyd.herokuapp.com/api/v1/department/update/${idDepart}`, body, {
                headers: {
                    token: `Bearer ${token}`
                }
            })
            return res.data
        } catch (error) {
            console.log(error.response.data)
        }
    }
)
export const deleteDepart = createAsyncThunk(
    "deparment/del",
    async({id, token}) => {
        try {
            const res = await axios.delete(`https://serverdhyd.herokuapp.com/api/v1/department/delete/${id}`, {
                headers:{
                    token: `Bearer ${token}`
                }
            })
            return res?.data
        } catch (error) {
            console.log(error.response.data)
        }
    }
)
export const aDepart = createAsyncThunk(
    "depart/aDepart",
    async(id) => {
        try{
            const { data } = await axios.get(`https://serverdhyd.herokuapp.com/api/v1/department/${id}`)
            return data
        }catch(error){
            console.log(error.response.data)
        }
    }
)
export const departmentSlice = createSlice({
    name: "department",
    initialState: {
        departmentByCate: {
            data: null,
            pending: false,
            error: false
        },
        department: {
            data: {},
            pending: false,
            error: false
        },
        allDepartment: {
            data: [],
            pending: false,
            error: false
        },
        addDepartment: {
            success: false,
            pending: false,
            error: false
        },
        updateDepartment: {
            pending: false,
            success: false,
            error: false
        },
        delDepartment: {
            pending: false,
            msg: '',
            error: false
        }
    },
    reducers: {
        getDepartmentByCateStart: state => {
            state.departmentByCate.pending = true
        },
        getDepartmentByCateAccess: (state, action) => {
            state.departmentByCate.data = action.payload
            state.departmentByCate.error = false
            state.departmentByCate.pending = false
        },
        getDepartmentByCateFail: state => {
            state.departmentByCate.error = true
        }
    },
    extraReducers: builder => {
        builder
            .addCase(departFetch.pending, state => {
                state.allDepartment.pending = true
            })
            .addCase(departFetch.fulfilled, (state, action) =>{
                state.allDepartment.data = action.payload
                state.allDepartment.pending = false
            })
            .addCase(departFetch.rejected, state => {
                state.allDepartment.error = true
            })
            .addCase(addDepart.pending, state =>{
                state.addDepartment.pending = true
            })
            .addCase(addDepart.fulfilled, (state) => {
                // state.addDepartment.data = action.payload
                state.addDepartment.pending = false
                state.addDepartment.success= true
            })
            .addCase(addDepart.rejected, state => {
                state.addDepartment.error = true
            })
            .addCase(editDepart.pending , state => {
                state.updateDepartment.pending = true
            })
            .addCase(editDepart.fulfilled, state => {
                state.updateDepartment.success = true
                state.updateDepartment.pending = false
            })
            .addCase(editDepart.rejected, state => {
                state.updateDepartment.error = true
            })
            .addCase(deleteDepart.pending, state => {
                state.delDepartment.pending = true
            })
            .addCase(deleteDepart.fulfilled, (state, action) => {
                state.delDepartment.pending = false
                state.delDepartment.msg = action.payload
            })
            .addCase(deleteDepart.rejected, state => {
                state.delDepartment.error = true
            })
            .addCase(aDepart.pending, state => {
                state.department.pending = true

            })
            .addCase(aDepart.fulfilled, (state, action) => {
                state.department.data = action.payload
                state.department.pending = false
            })
            .addCase(aDepart.rejected, state => {
                state.department.error =true
            })
    }
})

export const {
    getDepartmentByCateAccess,
    getDepartmentByCateFail,
    getDepartmentByCateStart
} = departmentSlice.actions
export const allDepartment = (state) => state.department.allDepartment.data
export default departmentSlice.reducer