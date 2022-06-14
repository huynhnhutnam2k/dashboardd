import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup  from 'yup'
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
import { useNavigate} from 'react-router-dom'
import { addDepart } from "../../redux/departmentSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { getACd, getAllQuestion } from "../../redux/questionSlice";
import { addDiagnose } from "../../redux/diagnoseSlice";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
};
const AddDiagnoseMain = () => {

    const {userInfo} = useSelector(state => state.auth) 
    const {categoriesCd, listQuestion} = useSelector(state => state.question)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        getACd(dispatch,userInfo?.token)
        dispatch(getAllQuestion())
    },[dispatch])
    const [file, setFile] = useState('')
    const handleFileInputChange = (e) => {
      const file = e.target.files[0];
      previewFile(file);
    };
    const previewFile = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFile(reader.result);
      };
    };
    const formik = useFormik({
        initialValues: {
          name: "",
          description: "",
          image: "",
          questionId: ""
        },
        // validationSchema: yup.object({
        //   deanName : yup.string().required("required"),
        //   name: yup.string().required("required"),
        //   categories: yup.string()
        // }),
        onSubmit: (values) => {
          // console.log(values)
          const body = {
            name: values.name,
            description: values.description,
            questionId: values.questionId,
            image: file
          }
          console.log(body)
          if(userInfo.token){
            //   console.log(user.token)
              const token = userInfo.token
              dispatch(addDiagnose({body, token}))
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
            <h2 className="content-title">Thêm chẩn đoán</h2>
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
                    <label className="form-label">Mô tả</label>
                    <input
                      placeholder="Nhập vào đây..."
                      className="form-control"
                      rows="4"
                      name="description"
                      value={formik.values.description}
                      // required
                      onChange={formik.handleChange}
                    ></input>
                  </div>
                  <div className="mb-4">
                    <input className="form-control mt-3" type="file" name="image" onChange={handleFileInputChange} />
                  </div>
                  <div className="mb-4">
                    <select className="form-control mt-3" name="questionId" value={formik.values.questionId} onChange={formik.handleChange}>
                      <option value="">Categories</option>
                      {listQuestion?.length == undefined ? 
                        <>
                          <option value={listQuestion?._id}>{listQuestion?.name}</option>
                        </>
                        : 
                        listQuestion?.map(item => (
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

export default AddDiagnoseMain