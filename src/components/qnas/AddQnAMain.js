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
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
};
const AddQnAMain = () => {
  const user = useSelector(state => state.auth.login?.user) 
  const categories = useSelector(state => state.question.getCd?.data?.categories)
  const department = useSelector(state => state.question.getCd?.data?.department)
  const pending = useSelector(state => state.question.addQuestion?.pending)
  console.log(pending)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
      getCd(dispatch,user?.token)
  },[])
  const [file, setFile] = useState('')
  // const [reviewSource, setPreviewSource] = useState('')
  // console.log( categories)
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
      description: "",
      image: "",
      name:"",
      department: "",
      categories:"",
      answer: ""
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
      const question = {
        name: values.name,
        description: values.description,
        image: file,
        answer: values.answer,
        department: values.department,
        categories: values.categories
      }
      // console.log(question)
      addQuestionRequest(dispatch,user?.token,question)
    }
  })
  // console.log(file)
  // console.log(department, categories)
  // const handleChangeCate = (e) => {
  //   setCategoriesId(e.target.value)
  // }
  return (
    <>
    {pending ? <p>pending</p> : ""}
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={formik.handleSubmit}  encType="multipart/form-data">
          <div className="content-header">
            <Link to="/qnas" className="btn btn-danger text-white">
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
                      <option value="">Categories</option>
                      {categories?.length == undefined ? 
                        <>
                          <option value={categories?._id}>{categories?.name}</option>
                        </>
                        : 
                        categories?.map(item => (
                        <option value={item?._id}>{item?.name}</option>
                        )
                        )}
                    </select>
                  </div>
                  <div className="mb-4">
                    <select className="form-control mt-3" name="department" value={formik.values.department} onChange={formik.handleChange}>
                      <option value="">Department</option>
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
        </form>
      </section>
    </>
  );
};

export default AddQnAMain;
