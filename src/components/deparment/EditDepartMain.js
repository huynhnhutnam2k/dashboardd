import React, { useEffect, useLayoutEffect, useState } from "react";
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
const EditDepartMain = () => {
    

const dispatch = useDispatch()
const navigate = useNavigate()
const user = useSelector(state => state.auth.login?.user)
const { id } = useParams()
const [formData, setFormData] = useState(null)
const {data: categories, pending: pendingCate} = useSelector(state => state.question.getCd)
const {data, pending, error} = useSelector(state => state.department.department)
// useEffect(() => {
  
//   user.token && getCd(dispatch, user?.token)
// },[])
console.log(user);
const formik = useFormik({
  initialValues: {
    deanName: data?.deanName,
    name: data?.name,
    categoriesId: data?.categoriesId
  },
  validationSchema: yup.object({

  }),
  onSubmit: values => {
    const questionUpdate = {
      name: values?.name,
      deanName: values.deanName,
      categoriesId: values.categoriesId
    }
    // updateQuestionRequest(dispatch, user?.token, questionUpdate, question?._id )
  }
})
  return (
      <>
        <Toast />
        <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={formik.handleSubmit} enableReinitialize={true}  >
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
            {/* {pending && <Loading />} */}
        
            
            <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
                <div className="card mb-4 shadow-sm">
                <div className="card-body">
                {
                    pending ? <Loading /> :
                    <>
                    
                    <div className="mb-4">
                        <label className="form-label">Dean Name</label>
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
                        <label className="form-label">Name</label>
                        <input
                        placeholder="Nhập vào đây..."
                        className="form-control"
                        rows="4"
                        name="answer"
                        value={formik.values.answer}
                        // required
                        onChange={formik.handleChange}
                        ></input>
                    </div>
                    <div className="mb-4">
                        <select className="form-control mt-3" name="categories" value={formik.values.categories} onChange={formik.handleChange}>
                        {/* <option value="">Categories</option> */}
                        {categories?.length === undefined ? <>
                
                            <option value={categories?._id}>{categories?.name}</option>
                            </>: categories?.map(item => (
                            <option value={item?._id} key={item._id}>{item?.name}</option>

                        ))}
                        </select>
                    </div>
                    
                    </>
                }
                </div>
                
                </div>
            </div>
            </div>
            
        </form>
        </section>
    </>
  )
}

export default EditDepartMain


        
        
        

