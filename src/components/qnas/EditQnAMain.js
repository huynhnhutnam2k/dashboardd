import React, { useEffect, useState } from "react";
import Toast from "../LoadingError/Toast";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import * as yup from 'yup'
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getAQuestionRequest, getCd, updateQuestionRequest } from "../../redux/apiRequest";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
};
const EditProductMain = () => {
  
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.login?.user)
  const categories = useSelector(state => state.question.getCd?.data?.categories)
  const department = useSelector(state => state.question.getCd?.data?.department)
  // console.log(user)
  const params = useParams()
  const id = params.id
  useEffect(() => {
    getCd(dispatch, user?.token)
    getAQuestionRequest(dispatch,id)
  },[id])
  const question = useSelector(state => state.question.getAQuestion?.data)
  
  // console.log(init)
  console.log(question)
  const formik = useFormik({
    initialValues: {
      description: question?.description,
      image: question?.image,
      name: question?.name,
      department: question?.department,
      categories:question?.categories,
      answer: question?.answer
    },
    validationSchema: yup.object({
      description : yup.string().required(),
      // image: yup.string(),
      name: yup.string().required("required"),
      answer: yup.string().required("required"),
      department: yup.string(),
      categories: yup.string()
    }),
    onSubmit: values => {
      // console.log(values)
      const questionUpdate = {
        name: values.name,
        description: values.description,
        image: file,
        answer: values.answer,
        department: values.department,
        categories: values.categories
      }
      // console.log(question)
      // addQuestionRequest(dispatch,user?.token,question)
      updateQuestionRequest(dispatch, user?.token, questionUpdate, question?._id )
    }
  })
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
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={formik.handleSubmit}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Update Product</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
          {question && 
          
          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea
                      placeholder="Nhập vào đây..."
                      className="form-control"
                      rows="4"
                      name="description"
                      value={formik.values.description}
                      // required
                      onChange={formik.handleChange}
                    ></textarea>
                  </div>
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
                    <textarea
                      placeholder="Nhập vào đây..."
                      className="form-control"
                      rows="4"
                      name="answer"
                      value={formik.values.answer}
                      // required
                      onChange={formik.handleChange}
                    ></textarea>
                  </div>
                  {/* <div className="mb-4">
                    <input className="form-control mt-3" type="file" name="image"/>
                  </div> */}
                  <div className="mb-4">
                    <select className="form-control mt-3" name="categories" value={formik.values.categories} onChange={formik.handleChange}>
                      {/* <option value="">Categories</option> */}
                      {categories?.length === undefined ? <>
              
                        <option value={categories?._id}>{categories?.name}</option>
                        </>: categories?.map(item => (
                        <option value={item?._id}>{item?.name}</option>

                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <select className="form-control mt-3" name="department" value={formik.values.department} onChange={formik.handleChange}>
                      {/* <option value="">Department</option> */}
                      { department?.map(item => (

                        <option key={item._id} value={item._id}>{item.name}</option>
                       ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <input className="form-control mt-3" type="file" name="image" onChange={handleFileInputChange} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          }
        </form>
      </section>
    </>
  );
};

export default EditProductMain;
