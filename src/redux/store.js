import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import questionReducer from './questionSlice'
import departmentReducer from './departmentSlice'
import diagnoseReducer from './diagnoseSlice'
import treatmentReducer from './treatmentSlice'
import markReducer from './markSlice'


const combinedReducer = combineReducers({
    auth: authReducer,
    question: questionReducer,
    department: departmentReducer,
    diagnose: diagnoseReducer,
    treatment: treatmentReducer,
    mark: markReducer
});
const rootReducer = (state, action) => {
    if (action.type === 'question/reset') {
        state = undefined;
    }
    return combinedReducer(state, action);
};
export default configureStore({
    reducer: rootReducer
})