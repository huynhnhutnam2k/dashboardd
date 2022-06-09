import { createAsyncThunk, createSlice  } from "@reduxjs/toolkit";    
import axios from "axios";
const url = "https://serverdhyd.herokuapp.com/api/v1/question"
export const questionSlice = createSlice({
    name:"question",
    initialState:{
        listQuestion: [],
        question: {},
        pending: false,
        error: false,
        success: false,
        updateSuccess: false,
        deleteSuccess: false,
        addSuccess: false,
        departmentCd: null,
        categoriesCd: null
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
    },
    // extraReducers: builder => {
    //     builder
    //         .addCase
    // }
    extraReducers: builder => {
        builder
            .addCase(getAllQuestion.pending, state => {
                state.pending = true
            })
            .addCase(getAllQuestion.fulfilled, (state, action) => {
                state.listQuestion = action.payload
                state.pending = false
            })
            .addCase(getAllQuestion.rejected, state => {
                state.error =  true
                state.pending = false
            })
            .addCase(deleteQuestion.pending, state => {
                state.pending = true
            })
            .addCase(deleteQuestion.fulfilled, state => {
                state.deleteSuccess = true
                state.pending = false
            })
            .addCase(deleteQuestion.rejected, state => {
                state.error = true
            })
            .addCase(getACd.pending, state => {
                state.pending = true
            })
            .addCase(getACd.fulfilled, (state, action) => {
                state.pending = false
                state.categoriesCd = action.payload.categories
                state.departmentCd = action.payload.department
            })
            .addCase(getACd.rejected, state => {
                state.error = true
            })
    }
})

export const getAllQuestion = createAsyncThunk(
    "question/getAll",
    async() => {
        try {
            const res = await axios.get(`${url}`)
            return res?.data
        } catch (error) {
            console.log(error.response.data)
        }
    }
)
export const getAQuestion = createAsyncThunk(
    "question/get", 
    async(id) => {
        try {
            const res = await axios.get(`${url}/${id}`)
            return res?.data
        } catch (error) {
            console.log(error.response.data)
        }
    }
)

export const getACd = createAsyncThunk(
    "question/getcd",
    async(token) => {
        try {
            const res = await axios.get(`${url}/getCd`, {
                headers: {
                    token: `Bearer ${token}`
                }
            })
            return res?.data
        } catch (error) {
            console.log(error.response.data)
        }
    }
)

export const updateQuestion = createAsyncThunk(
    "question/update",
    async({body, token, id}) => {
        try {
            const res = await axios.put(`${url}/update/${id}`, body , {
                headers: {
                    token: `Bearer ${token}`
                }
            })
            return res?.data
        } catch (error) {
            console.log(error.response.data)
        }
    }
)
export const addQuestion = createAsyncThunk(
    "question/add",
    async({body, token}) => {
        try {
            const res = await axios.post(`${url}/add`, body , {
                headers: {
                    token: `Bearer ${token}`
                }
            })
            return res?.data
        } catch (error) {
            console.log(error.response.data)
        }
    }
)

export const deleteQuestion = createAsyncThunk(
    "question/delete",
    async({id, token}) => {
        try {
            const res = await axios.delete(`${url}/delete/${id}`, {
                headers:{
                    token: `Bearer ${token}`
                }
            })
            if(res){
                return res?.data
            }
        } catch (error) {
            console.log(error.response.data)
        }
    }
)
export const getQuestionByCate = createAsyncThunk(
    "question/getByCate",
    async(id) => {
        try {
            const res = await axios.get(`${url}/categories/${id}`)
            return res?.data
        } catch (error) {
            console.log(error.response.data)
        }
    }
)
export const getQuestionByDepart = createAsyncThunk(
    "question/getByDepart",
    async(id) => {
        try {
            const res = await axios.get(`${url}/department/${id}`)
            return res?.data
        } catch (error) {
            console.log(error.response.data)
        }
    }
)
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