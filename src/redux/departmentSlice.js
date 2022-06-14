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
    async({idDepart, token}) => {
        try {
            const res = await axios.delete(`https://serverdhyd.herokuapp.com/api/v1/department/delete/${idDepart}`, {
                headers:{
                    token: `Bearer ${token}`,
                    // Access-Control-Allow-Origin: "*"
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
export const departByCate = createAsyncThunk(
    "depart/getByCate",
    async(id) => {
        try {
            const res = await axios.get(`https://serverdhyd.herokuapp.com/api/v1/department/cate/${id}`)
            return res?.data
        } catch (error) {
            console.log(error.response.data)
        }
    }
)
export const departmentSlice = createSlice({
    name: "department",
    initialState: {
        listDepartment: [],
        department: {},
        pending: false,
        success: false,
        error: false,
        addSuccess: false,
        updateSuccess: false,
        deleteSuccess: false,
        msg: ''
    },
    extraReducers: builder => {
        builder
            .addCase(departFetch.pending, state => {
                state.pending = true
            })
            .addCase(departFetch.fulfilled, (state, action) =>{
                state.listDepartment = action.payload
                state.pending = false
            })
            .addCase(departFetch.rejected, state => {
                state.error = true
                state.pending = false
            })
            .addCase(addDepart.pending, state =>{
                state.pending = true
            })
            .addCase(addDepart.fulfilled, (state, action) => {
                // state.addDepartment.data = action.payload
                state.department = action.payload
                state.pending = false
                state.success= true
            })
            .addCase(addDepart.rejected, state => {
                state.error = true
                state.pending = false
            })
            .addCase(editDepart.pending , state => {
                state.pending = true
            })
            .addCase(editDepart.fulfilled, state => {
                state.updateSuccess = true
                state.pending = false
            })
            .addCase(editDepart.rejected, state => {
                state.error = true
                state.pending = false
            })
            .addCase(deleteDepart.pending, state => {
                state.pending = true
            })
            .addCase(deleteDepart.fulfilled, (state, action) => {
                state.pending = false
                // state.msg = action.payload
                state.deleteSuccess = true
            })
            .addCase(deleteDepart.rejected, state => {
                state.error = true
                state.pending = false
            })
            .addCase(aDepart.pending, state => {
                state.pending = true

            })
            .addCase(aDepart.fulfilled, (state, action) => {
                state.department = action.payload
                state.pending = false
            })
            .addCase(aDepart.rejected, state => {
                state.error =true
                state.pending = false
            })
            .addCase(departByCate.pending, state => {
                state.pending = true
            })
            .addCase(departByCate.fulfilled, (state,action) => {
                state.listDepartment = action.payload
                state.pending = false
            })
            .addCase(departByCate.rejected, state => {
                state.pending = false
                state.error = true
            })
    }
})

// export const {
//     getDepartmentByCateAccess,
//     getDepartmentByCateFail,
//     getDepartmentByCateStart
// } = departmentSlice.actions
// export const allDepartment = (state) => state.department.allDepartment.data
export default departmentSlice.reducer