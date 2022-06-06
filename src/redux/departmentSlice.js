import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const departFetch = createAsyncThunk(
    "department/fetchAll",
    async() => {
        try{
            const res = await axios.get("https://serverdhyd.herokuapp.com/api/v1/department")
            return res?.data
        }catch(error){
            console.log(error)
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
        allDepartment: {
            data: null,
            pending: false,
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
    }
})

export const {
    getDepartmentByCateAccess,
    getDepartmentByCateFail,
    getDepartmentByCateStart
} = departmentSlice.actions
export const allDepartment = (state) => state.department.allDepartment.data
export default departmentSlice.reducer