import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const departFetch = createAsyncThunk(
    "department/fetchAll",
    async() => {
        try{
            const res = await axios.get(`https://sv-dhyd.herokuapp.com/api/department`,{
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })
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
            const res = await axios.post("https://sv-dhyd.herokuapp.com/api/department", body, {
                headers: {
                    token: `Bearer ${token}`,
                    Vary: 'Origin',
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
               
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
    async({body, token, id}) => {
        try {
            const res = await axios.put(`https://sv-dhyd.herokuapp.com/api/department/${id}`, body, {
                headers: {
                    token: `Bearer ${token}`,
                    
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    
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
            const res = await axios.delete(`https://sv-dhyd.herokuapp.com/api/department/${idDepart}`, {
                headers:{
                    token: `Bearer ${token}`,
                    Vary: 'Origin',
                    // Access-Control-Allow-Origin: "*"
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                    
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
            const { data } = await axios.get(`https://sv-dhyd.herokuapp.com/api/department/${id}`,{
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })
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
            const res = await axios.get(`https://serverdhyd.herokuapp.com/api/v1/department/cate/${id}`,{
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })
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
                state.addSuccess= true
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
                state.deleteSuccess = true
                state.pending = false
                // state.msg = action.payload
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

export default departmentSlice.reducer