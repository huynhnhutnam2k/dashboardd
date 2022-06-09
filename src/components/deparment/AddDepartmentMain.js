import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup  from 'yup'
import { addQuestionRequest, getCd } from "../../redux/apiRequest";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
import { useNavigate} from 'react-router-dom'
import { addDepart } from "../../redux/departmentSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { getACd } from "../../redux/questionSlice";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
};
const AddDepartmentMain = () => {

    const {userInfo} = useSelector(state => state.auth) 
    const {categoriesCd} = useSelector(state => state.question)
    const pending = useSelector(state => state.department.addDepartment?.pending)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        const token = userInfo?.token
        dispatch(getACd(token))
    },[dispatch])
    const formik = useFormik({
        initialValues: {
          name: "",
          deanName: "",
          categories:""
        },
        validationSchema: yup.object({
          deanName : yup.string().required("required"),
          name: yup.string().required("required"),
          categories: yup.string()
        }),
        onSubmit: (values) => {
          // console.log(values)
          const body = {
            name: values.name,
            deanName: values.deanName,
            categoriesId: values.categories
          }
          if(userInfo.token){
            //   console.log(user.token)
              const token = userInfo.token
              dispatch(addDepart({body, token}))
            //   console.log(originalPromiseResult)
          }
        }
      })
  return (
    <>
        <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={formik.handleSubmit}  encType="multipart/form-data">
          <div className="content-header">
            <Link to="/department" className="btn btn-danger text-white">
              Trở về
            </Link>
            <h2 className="content-title">Thêm câu hỏi</h2>
            <div>
              <button className="btn btn-primary" type="submit">
                Thêm
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-12 col-lg-12">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <div className="mb-4">
                    <label className="form-label">Tên</label>
                    <input
                      placeholder="Nhập vào đây..."
                      className="form-control"
                      // rows="4"
                      name="name"
                      value={formik.values.name}
                      // required
                      onChange={formik.handleChange}
                    ></input>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Câu trả lời</label>
                    <input
                      placeholder="Nhập vào đây..."
                      className="form-control"
                      rows="4"
                      name="deanName"
                      value={formik.values.deanName}
                      // required
                      onChange={formik.handleChange}
                    ></input>
                  </div>
                  <div className="mb-4">
                    <select className="form-control mt-3" name="categories" value={formik.values.categories} onChange={formik.handleChange}>
                      <option value="">Categories</option>
                      {categoriesCd?.length == undefined ? 
                        <>
                          <option value={categoriesCd?._id}>{categoriesCd?.name}</option>
                        </>
                        : 
                        categoriesCd?.map(item => (
                        <option value={item?._id}>{item?.name}</option>
                        )
                        )}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  )
}

export default AddDepartmentMain