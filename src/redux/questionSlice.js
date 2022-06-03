import { createSlice  } from "@reduxjs/toolkit";    

export const questionSlice = createSlice({
    name:"question",
    initialState:{
        allQuestion: {
            data: null,
            pending: false,
            error: false
        },
        getCd: {
            data: null,
            pending: false,
            error: false
        },
        addQuestion: {
            pending: false,
            error: false,
            data: null,
            success: false
        },
        getAQuestion : {
            pending: false,
            data: null,
            error: false
        },
        updateQuestion: {
            pending: false,
            error: false,
            success: false
        },
        deleteQuestion: {
            pending: false,
            access: false,
            error: false
        }
    },
    reducers: {
        getAllStart: state =>{
            state.allQuestion.pending = true
        },
        getAllSuccess : (state,action) => {
            state.allQuestion.data = action.payload
            state.allQuestion.error = false
            state.allQuestion.pending = false
        },
        getAllFail: (state) => {
            state.allQuestion.error = true
        },
        getCdStart : state => {
            state.getCd.pending = true
        },
        getCdAccess: (state, action) => {
            state.getCd.data = action.payload
            state.getCd.pending = false
            state.getCd.error = false
        },
        getCdFail:  (state) => {
            state.getCd.error = true
        },
        addQuestionStart: state => {
            state.addQuestion.pending = true
        },
        addQuestionAccess: (state, action) => {
            state.addQuestion.data = action.payload
            state.addQuestion.pending = false
            state.addQuestion.error = false
            state.addQuestion.success = true
        },
        addQuestionFail: (state, action) => {
            state.addQuestion.error = true
            state.addQuestion.success = false
        },
        getAQuesionStart: (state) =>{
            state.getAQuestion.pending = true
            state.getAQuestion.data = null
        },
        getAQuesionAccess: (state, action) => {
            state.getAQuestion.data = action.payload
            state.getAQuestion.pending = false
            state.getAQuestion.error = false
        },
        getAQuestionFail : state => {
            state.getAQuestion.error = true
        },
        updateQuestionStart: state => {
            state.updateQuestion.pending = true
        },
        updateQuestionSuccess: (state) => {
            state.updateQuestion.success = true
            state.updateQuestion.error = false
            state.updateQuestion.pending = false
        },
        updateQuestionFail: (state) => {
            state.updateQuestion.error = true
        },
        deleteQuestionStart: state => {
            state.deleteQuestion.pending = true
        },
        deleteQuestionAccess: state =>{
            state.deleteQuestion.error = false
            state.deleteQuestion.pending  = false
            state.deleteQuestion.access = true
        },
        deleteQuestionFail: state => {
            state.deleteQuestion.error = true
        }
    }
})

export const {
    getAllFail,
    getAllStart,
    getAllSuccess,
    getCdAccess,
    getCdFail,getCdStart,
    addQuestionAccess,
    addQuestionFail,
    addQuestionStart,
    getAQuesionAccess,
    getAQuesionStart,
    getAQuestionFail,
    updateQuestionFail,
    updateQuestionStart,
    updateQuestionSuccess,
    deleteQuestionAccess,
    deleteQuestionFail,
    deleteQuestionStart
} = questionSlice.actions

export default questionSlice.reducer