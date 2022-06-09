import { getAllUserAccess, getAllUserFail, getAllUserStart, loginFail, loginStart, loginSuccess, logoutAccess, logoutFail, logoutStart, registerAccess, registerFail, registerStart } from "./authSlice"
// import  url  from './url' 
import axios from 'axios'
import { addQuestionAccess, addQuestionFail, addQuestionStart, deleteQuestionAccess, deleteQuestionFail, deleteQuestionStart, getAllFail, getAllStart, getAllSuccess, getAQuesionAccess, getAQuesionStart, getAQuestionFail, getCdAccess, getCdFail, getCdStart, getQuestionByCateAccess, getQuestionByCateFail, getQuestionByCateStart, getQuestionByDepartmentAccess, getQuestionByDepartmentFail, getQuestionByDepartmentStart, updateQuestionFail, updateQuestionStart, updateQuestionSuccess } from "./questionSlice"
import { getDepartmentByCateAccess, getDepartmentByCateFail, getDepartmentByCateStart } from "./departmentSlice"
const url = 'https://serverdhyd.herokuapp.com/api/v1'
// const url = 'http://localhost:2000/api/v1'
// export const loginRequest = async(dispatch, navigate, user) => {
//     dispatch(loginStart())
//     try {
//         const res = await axios.post(`${url}/auth/login`, user)
//         dispatch(loginSuccess(res.data))
//         // history.push('/')
//         navigate('/')
//     } catch (error) {
//         dispatch(loginFail(error.response.data))
//     }
// }
// export const logoutRequest = async(dispatch, token, userId, navigate) => {
//     dispatch(logoutStart())
//     try {
//         await axios.post(`${url}/auth/logout`, userId, {
//             headers: {
//                 token: `Bearer ${token}`
//             }
//         })
//         dispatch(logoutAccess())
//         navigate("/login")
//     } catch (error) {
//         dispatch(logoutFail())
//     }
// }





// export const getAllUser = async(dispatch, token) => {
//     dispatch(getAllUserStart())
//     try {
//         const res = await axios.get(`${url}/auth` , {
//             headers: {
//                 token: `Bearer ${token}`
//             }
//         })
//         dispatch(getAllUserAccess(res.data))
//     } catch (error) {
//         dispatch(getAllUserFail())
//     }
// }

// export const registerRequest = async(dispatch, token, user) => {
//     dispatch(registerStart())
//     try {
//         await axios.post(`${url}/auth/register`, user , {
//             headers: {
//                 token: `Bearer ${token}`
//             }
//         })
//         dispatch(registerAccess())
//     } catch (error) {
//         dispatch(registerFail(error.response.data))
//     }
// }

export const getDepartmentByCateRequest = async(dispatch, categoriesId) => {
    dispatch(getDepartmentByCateStart())
    try {
        const res = await axios.get(`${url}/department/cate/${categoriesId}`)
        dispatch(getDepartmentByCateAccess(res.data))
    } catch (error) {
        dispatch(getDepartmentByCateFail())
    }
}



