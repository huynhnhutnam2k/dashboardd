import { createSlice  } from "@reduxjs/toolkit";    

export const questionSlice = createSlice({
    name:"question",
    initialState:{
        allQuestion: {
            data: null,
            pending: null,
            error: null
        },
        getCd: {
            data: null,
            pending: false,
            error: false
        },
        addQuestion: {
            pending: null,
            error: null,
            data: null,
            success: null
        },
        getAQuestion : {
            pending: true,
            data: {},
            error: null
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
        },
        questionByCate: {
            pending: null,
            data: null,
            error: false
        },
        questionByDepartment: {
            pending: null,
            data: null,
            error: false
        }
    },
    reducers: {
        //get all
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

        //get cd
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

        //add
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

        //get a question
        getAQuesionStart: (state) =>{
            state.getAQuestion.pending = true
        },
        getAQuesionAccess: (state, action) => {
            state.getAQuestion.data = action.payload
            state.getAQuestion.pending = false
            state.getAQuestion.error = false
        },
        getAQuestionFail : state => {
            state.getAQuestion.error = true
        },

        //update question
        updateQuestionStart: state => {
            state.updateQuestion.pending = true
        },
        updateQuestionSuccess: (state) => {
            state.updateQuestion.pending = false
            state.updateQuestion.success = true
            state.updateQuestion.error = false
        },
        updateQuestionFail: (state) => {
            state.updateQuestion.error = true
        },

        //delete question
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
        },
        //get by cate
        getQuestionByCateStart: state => {
            state.questionByCate.pending = true
        },
        getQuestionByCateAccess: (state, action) => {
            state.questionByCate.data = action.payload
            state.questionByCate.error = false
            state.questionByCate.pending = false
        },
        getQuestionByCateFail: state => {
            state.questionByCate.error = true
        },
        //get question by department
        getQuestionByDepartmentStart: state => {
            state.questionByDepartment.pending = true
        },
        getQuestionByDepartmentAccess: (state, action) => {
            state.questionByDepartment.data = action.payload
            state.questionByDepartment.pending = false
        },
        getQuestionByDepartmentFail: state => {
            state.questionByDepartment.error = true
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
    deleteQuestionStart,
    getQuestionByCateAccess,
    getQuestionByCateFail,
    getQuestionByCateStart,
    getQuestionByDepartmentAccess,
    getQuestionByDepartmentFail,
    getQuestionByDepartmentStart
} = questionSlice.actions

export default questionSlice.reducer