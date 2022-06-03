import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import questionReducer from './questionSlice'
import departmentReducer from './departmentSlice'
export const store =  configureStore({
    reducer: {
        auth: authReducer,
        question: questionReducer,
        department: departmentReducer
    }
})