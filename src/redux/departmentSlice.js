import { createSlice } from "@reduxjs/toolkit";

export const departmentSlice = createSlice({
    name: "department",
    initialState: {
        departmentByCate: {
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
    }
})

export const {
    getDepartmentByCateAccess,
    getDepartmentByCateFail,
    getDepartmentByCateStart
} = departmentSlice.actions

export default departmentSlice.reducer