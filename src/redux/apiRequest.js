import { getAllUserAccess, getAllUserFail, getAllUserStart, loginFail, loginStart, loginSuccess, logoutAccess, logoutFail, logoutStart, registerAccess, registerFail, registerStart } from "./authSlice"
// import { url } from './url' 
import axios from 'axios'
import { addQuestionAccess, addQuestionFail, addQuestionStart, deleteQuestionAccess, deleteQuestionFail, deleteQuestionStart, getAllFail, getAllStart, getAllSuccess, getAQuesionAccess, getAQuesionStart, getAQuestionFail, getCdAccess, getCdFail, getCdStart, updateQuestionFail, updateQuestionStart, updateQuestionSuccess } from "./questionSlice"
import { getDepartmentByCateAccess, getDepartmentByCateFail, getDepartmentByCateStart } from "./departmentSlice"
const url = 'https://serverdhyd.herokuapp.com/api/v1'
// const url = 'http://localhost:2000/api/v1'
export const loginRequest = async(dispatch, navigate, user) => {
    // console.log(url)
    dispatch(loginStart())
    try {
        const res = await axios.post(`${url}/auth/login`, user)
        dispatch(loginSuccess(res.data))
        // history.push('/')
        navigate('/')
    } catch (error) {
        dispatch(loginFail())
    }
}
export const logoutRequest = async(dispatch, token, userId, navigate) => {
    dispatch(logoutStart())
    try {
        await axios.post(`${url}/auth/logout`, userId, {
            headers: {
                token: `Bearer ${token}`
            }
        })
        dispatch(logoutAccess())
        navigate("/login")
    } catch (error) {
        dispatch(logoutFail())
    }
}
export const allQuestion = async(dispatch) => {
    dispatch(getAllStart()) 
    try{
        const res = await axios.get(`${url}/question`)
        dispatch(getAllSuccess(res.data))
    }catch(err){
        dispatch(getAllFail())
    }
}

export const getCd = async(dispatch, token) => {
    dispatch(getCdStart())
    try {
        const res = await axios.get(`${url}/question/getCd`, {
            headers: {
                token: `Bearer ${token}`
            }
        })
        dispatch(getCdAccess(res.data))
    } catch (error) {
        dispatch(getCdFail())
    }
}

export const addQuestionRequest = async(dispatch, token, question) => {
    dispatch(addQuestionStart())
    try {
        const res = await axios.post(`${url}/question/add`, question, {
            headers: {
                token: `Bearer ${token}`
            }
        })
        dispatch(addQuestionAccess(res.data))
    } catch (error) {
        dispatch(addQuestionFail())
    }
}

export const getAllUser = async(dispatch, token) => {
    dispatch(getAllUserStart())
    try {
        const res = await axios.get(`${url}/auth` , {
            headers: {
                token: `Bearer ${token}`
            }
        })
        dispatch(getAllUserAccess(res.data))
    } catch (error) {
        dispatch(getAllUserFail())
    }
}

export const registerRequest = async(dispatch, token, user) => {
    dispatch(registerStart())
    try {
        await axios.post(`${url}/auth/register`, user , {
            headers: {
                token: `Bearer ${token}`
            }
        })
        dispatch(registerAccess())
    } catch (error) {
        dispatch(registerFail(error.response.data))
    }
}

export const getDepartmentByCateRequest = async(dispatch, categoriesId) => {
    dispatch(getDepartmentByCateStart())
    try {
        const res = await axios.get(`${url}/department/cate/${categoriesId}`)
        dispatch(getDepartmentByCateAccess(res.data))
    } catch (error) {
        dispatch(getDepartmentByCateFail())
    }
}
export const getAQuestionRequest = async(dispatch, id) => {
    dispatch(getAQuesionStart())
    try{
        const res = await axios.get(`${url}/question/${id}`)
        dispatch(getAQuesionAccess(res.data))
    }catch(error){
        dispatch(getAQuestionFail())
    }
}

export const updateQuestionRequest = async(dispatch, token, questionUpdate, questionId, navigate) => {
    dispatch(updateQuestionStart())
    try {
        await axios.put(`${url}/question/update/${questionId}`, questionUpdate, {
            headers: {
                token: `Bearer ${token}`
            }
        })
        dispatch(updateQuestionSuccess())
        navigate('/qnas')
    } catch (error) {
        dispatch(updateQuestionFail())
    }
}

export const deleteQuestionRequest = async(dispatch, questionId, token) => {
    dispatch(deleteQuestionStart())
    try {
        await axios.delete(`${url}/question/delete/${questionId}`, {
            headers: {
                token: `Bearer ${token}`
            }
        })
        dispatch(deleteQuestionAccess())
    } catch (error) {
        dispatch(deleteQuestionFail())
    }
}